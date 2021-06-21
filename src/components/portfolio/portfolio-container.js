import React, { Component } from "react";
import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component{
    constructor(){
        super()

        this.state = {
            pageTitle: "Welcome to my Portfolio",
            data: [
            {title: "Eventbrite", Category: "eCommerce"},
            {title: "Quip", Category: "eCommerce"},
            {title: "Ministry Safe", Category: "Other"}]
        };
        console.log("Portfolio Cointainer has rendered!");

        this.handleFilter = this.handleFilter.bind(this);
        }

    handleFilter(filter){
        this.setState({
            data: this.state.data.filter(item => {
                return item.Category
            })
        })
    }

    portfolioItems(){

        return this.state.data.map(item => {
            return <PortfolioItem title = {item.title} url={"google.com"}/>;
        })
    }

    render(){
        return(
            <div>
                <h2>{this.state.pageTitle}</h2>

                <button onClick ={() => this.handleFilter('eCommerce')}>eCommerce</button>
                <button onClick ={() => this.handleFilter('eCommerce')}>Other</button>

                {this.portfolioItems()}

            </div>
        )
    }
}