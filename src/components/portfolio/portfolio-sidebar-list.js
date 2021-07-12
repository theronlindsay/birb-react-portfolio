import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {Component} from 'react';

    const PortfolioSidebarList = (props) => {

        const portfolioList = props.data.map(portfolioItem => {
            return(
                <div key={portfolioItem.id} className="portfolio-item-thumb">
                    <div className = "portfolio-item-img">
                        <img src={portfolioItem.thumb_image_url} />
                    </div>
                    <div className="three-column side-context">
                        <h1 className = "title">{portfolioItem.name}</h1>
                        <a className="btn edit" onClick= {() => props.handleEditClick(portfolioItem)}><FontAwesomeIcon icon="edit"/></a>
                        <a className="btn delete" onClick= {() => props.handleDeleteClick(portfolioItem)}><FontAwesomeIcon icon="trash"/></a>
                    </div>
                    <h2>ID: {portfolioItem.id}</h2>
                    
                </div>
            )
        })

        return <div className="list-wrapper">{portfolioList}</div>
    }

    export default PortfolioSidebarList;