import axios from 'axios';
import React, { Component } from 'react';

export default class PortfolioDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolioItem: {},
        }
    }

    componentDidMount() {
        this.getPortfolioItem();
    }

    getPortfolioItem() {
        axios.get(`https://theronlindsay.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`, { withCredentials: true })
            .then(response => {
                this.setState({
                    portfolioItem: response.data.portfolio_item
                })
            }).catch(error => {
                console.log("getportfolioitems error", error);
            })
    }

    render() {

        const {
            banner_image_url, category, description, logo_url, name, url
        } = this.state.portfolioItem;

        return (
            <div className="detail-wrapper">
                <div className="infobar">
                    <div className="left">
                        <a href={url}><img src={logo_url} /></a>
                    </div>
                    <div className="right">
                        <div className="toprow">
                            <h1><a href={url}>{name}</a></h1>
                        </div>
                        <div className="bottomrow">
                            <p>{category}</p>
                        </div>
                    </div>
                </div>

                <div className="back-window" style={{ backgroundImage: `url(${banner_image_url})` }}></div>

                <div className="description">
                    <p>{description}</p>
                    <a classname="base-btn" href={url}>Visit {name}</a>
                </div>
            </div>
        );
    }
}