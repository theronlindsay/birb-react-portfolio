import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

export default function PortfolioDetail() {
    const [portfolioItem, setPortfolioItem] = useState({});
    const { slug } = useParams();

    const getPortfolioItem = () => {
        axios.get(`https://theronlindsay.devcamp.space/portfolio/portfolio_items/${slug}`, { withCredentials: true })
            .then(response => {
                setPortfolioItem(response.data.portfolio_item);
            }).catch(error => {
                console.log("getportfolioitems error", error);
            })
    }

    useEffect(() => {
        getPortfolioItem();
    }, [slug]);    const {
        banner_image_url, category, description, logo_url, name, url
    } = portfolioItem;

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

            <div className="back-window" style={{ backgroundImage: `url(${banner_image_url})` }}></div>            <div className="description">
                <div>{parse(description || '')}</div>
                <a className="base-btn" href={url}>Visit {name}</a>
            </div>
        </div>
    );
}