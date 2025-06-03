import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PortfolioItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PortfolioItemClass: ""
        }
    }

    // Function to strip HTML tags from text
    stripHtml(html) {
        if (!html) return '';
        // Create a temporary div element to parse HTML and extract text content
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    handleMouseEnter() {
        this.setState({ PortfolioItemClass: "image-blur" });
    }

    handleMouseLeave() {
        this.setState({ PortfolioItemClass: "" });
    }

    render() {
        const { id, description, thumb_image_url, logo_url } = this.props.item;
        return (
            <Link to={`/portfolio/${id}`}>
                <div className="portfolioItem" onMouseEnter={() => this.handleMouseEnter()} onMouseLeave={() => this.handleMouseLeave()}>


                    <div className={"portfolioImgBackground " + this.state.PortfolioItemClass} style={{
                        backgroundImage: "url(" + thumb_image_url + ")"
                    }} />

                    <div className="imgText">
                        <div className="logoWrapper">
                            <img src={logo_url} />
                        </div>                        <div className="subtitle">
                            {this.stripHtml(description)}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}