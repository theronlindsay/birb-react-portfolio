import React, { Component } from "react";
import PortfolioItem from "./portfolio-item";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class PortfolioContainer extends Component {
    constructor() {
        super()

        this.state = {
            pageTitle: "Welcome to my Portfolio",
            isLoading: false,
            data: [],
            filtersVisible: false // Track filter visibility on mobile
        };
        console.log("Portfolio Cointainer has rendered!");

        this.handleFilter = this.handleFilter.bind(this);
        this.getPortfolioItems = this.getPortfolioItems.bind(this);
        this.toggleFilters = this.toggleFilters.bind(this);
    }

    getPortfolioItems(filter = null) {
        axios
            .get("https://theronlindsay.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc")
            .then(response => {
                // handle success
                if (filter) {
                    this.setState({
                        data: response.data.portfolio_items.filter(item => {
                            return item.category === filter;
                        })
                    })
                } else {
                    this.setState({
                        data: response.data.portfolio_items
                    })
                }

            })
            .catch(error => {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }    handleFilter(filter) {
        if (filter === "CLEAR_FILTERS") {
            this.getPortfolioItems();
        } else {
            this.getPortfolioItems(filter);
        }
        // Close filters on mobile after selection
        this.setState({ filtersVisible: false });
    }

    toggleFilters() {
        this.setState(prevState => ({
            filtersVisible: !prevState.filtersVisible
        }));
    }

    portfolioItems() {
        // Background image = thumb_image_url
        // Logo = logo_url
        // Description
        // id for slug = id
        return this.state.data.map(item => {
            return <PortfolioItem
                key={item.id}
                item={item}
            />;
        })
    }

    componentDidMount() {
        this.getPortfolioItems();
    }    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }

        return (
            <div className="portfolio-wrapper">
                {/* Mobile filter toggle button */}                <div className="mobile-filter-toggle">
                    <button 
                        className="btn filter-toggle-btn" 
                        onClick={this.toggleFilters}
                        aria-label="Toggle filters"
                        aria-expanded={this.state.filtersVisible}
                    >
                        <FontAwesomeIcon icon="filter" />
                        <span>Filters</span>
                        <FontAwesomeIcon 
                            icon={this.state.filtersVisible ? "chevron-up" : "chevron-down"} 
                            className="chevron"
                        />
                    </button>
                </div>

                {/* Filter buttons */}
                <div className={`filters btn-group centered ${this.state.filtersVisible ? 'visible' : ''}`}>
                    <button className="btn" onClick={() => this.handleFilter('CLEAR_FILTERS')}>All</button>
                    <button className="btn" onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
                    <button className="btn" onClick={() => this.handleFilter('Social')}>Social</button>
                    <button className="btn" onClick={() => this.handleFilter('Other')}>Other</button>
                </div>
                
                <div className="portfolioItemsContainer">
                    {this.portfolioItems()}
                </div>
            </div>
        )
    }
}