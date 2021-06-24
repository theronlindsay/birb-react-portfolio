import React, { Component } from "react";
import PortfolioItem from "./portfolio-item";
import axios from 'axios';

export default class PortfolioContainer extends Component{
    constructor(){
        super()

        this.state = {
            pageTitle: "Welcome to my Portfolio",
            isLoading: false,
            data: []
        };
        console.log("Portfolio Cointainer has rendered!");

        this.handleFilter = this.handleFilter.bind(this);
        this.getPortfolioItems= this.getPortfolioItems.bind(this);
    }

    getPortfolioItems(){
        axios
      .get("https://theronlindsay.devcamp.space/portfolio/portfolio_items")
      .then(response => {
        // handle success
        console.log("response data", response);
        this.setState({
            data: response.data.portfolio_items
        })
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }

    handleFilter(filter){
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        })
    }

    portfolioItems(){
        // Background image = thumb_image_url
        // Logo = logo_url
        // Description
        // id for slug = id
        return this.state.data.map(item => {
            return <PortfolioItem 
            key={item.id} 
            item = {item}
            />;
        })
    }

    componentDidMount(){
        this.getPortfolioItems();
    }

    render(){

        

        if(this.state.isLoading){
            return <div>Loading...</div>
        }

        // this.getPortfolioItems();

        return(
            <div>
                <button onClick ={() => this.handleFilter('eCommerce')}>eCommerce</button>
                <button onClick ={() => this.handleFilter('Other')}>Other</button>

                {this.portfolioItems()}

            </div>
        )
    }
}