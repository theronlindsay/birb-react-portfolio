import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

export default class NavigationContainer extends Component{
    constructor(){
        super();
        
        
    }

    render(){
        return (
            
            <div className="nav-wrapper">
                <div className="Links">
                    <NavLink exact to="/">
                        Home
                    </NavLink>

                    <NavLink to="/about-me">
                        About
                    </NavLink>

                    <NavLink to="/contact">
                        Contact
                    </NavLink>

                    <NavLink to="/blog">
                        Blog
                    </NavLink>

                    <button>Add Blog</button>
                </div>

                <div className="Rightside">
                    THERON LINDSAY
                </div>
            </div>

        )
    }
}