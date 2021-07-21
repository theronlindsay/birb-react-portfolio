import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PortfolioItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PortfolioItemClass: ""
        }
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
                        </div>

                        <div className="subtitle">
                            {description}
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}