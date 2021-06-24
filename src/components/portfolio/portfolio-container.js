import React, { Component } from "react";
import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component{
    constructor(){
        super()

        this.state = {
            pageTitle: "Welcome to my Portfolio",
            isLoading: true,
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
                return item.Category === filter;
            })
        })
    }

    portfolioItems(){

        return this.state.data.map(item => {
            return <PortfolioItem title = {item.title} url={"google.com"}/>;
        })
    }

    render(){

        if(this.state.isLoading){
            return <div>Loading...</div>
        }

        return(
            <div>
                <h2>{this.state.pageTitle}</h2>

                <button onClick ={() => this.handleFilter('eCommerce')}>eCommerce</button>
                <button onClick ={() => this.handleFilter('Other')}>Other</button>

                {this.portfolioItems()}

            </div>
        )
    }
}