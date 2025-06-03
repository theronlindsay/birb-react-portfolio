import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavigationComponent = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const navRef = useRef(null);
    const [pillStyle, setPillStyle] = useState({});    const navigationItems = [
        { path: '/', label: 'Home' },
        { path: '/about-me', label: 'About' },
        { path: '/blog', label: 'Blog' },
        ...(props.loggedInStatus === "LOGGED_IN" ? [{ path: '/portfolio-manager', label: 'Portfolio Manager' }] : [])
    ];useEffect(() => {
        updatePillPosition();
        
        // Add resize observer to handle window resizing
        const resizeObserver = new ResizeObserver(() => {
            updatePillPosition();
        });
        
        if (navRef.current) {
            resizeObserver.observe(navRef.current);
        }
        
        return () => {
            resizeObserver.disconnect();
        };
    }, [location.pathname]);

    const updatePillPosition = () => {
        if (!navRef.current) return;
        
        const activeLink = navRef.current.querySelector('.nav-link-active');
        if (activeLink) {
            const linkWrapper = activeLink.closest('.nav-link-wrapper');
            if (linkWrapper) {
                const { offsetLeft, offsetWidth } = linkWrapper;
                setPillStyle({
                    left: offsetLeft,
                    width: offsetWidth,
                    opacity: 1
                });
            }
        } else {
            // Hide pill if no active link
            setPillStyle(prev => ({ ...prev, opacity: 0 }));
        }
    };

    const dynamicLink = (route, linkText) => {
        return (
            <div className="nav-link-wrapper">
                <NavLink to={route} className={({ isActive }) => isActive ? "nav-link-active" : ""}>
                    {linkText}
                </NavLink>
            </div>
        )
    }

    const handleSignOut = () => {
        axios.delete("https://api.devcamp.space/logout", { withCredentials: true }).then(response => {            if (response.status === 200) {
                navigate("/");
                props.handleLogout();
            }
            return response.data;
        }).catch(error => {
            console.log("Error signing out", error)
        })
    }

    return (
        <div className="nav-wrapper">
            <div className="Links" ref={navRef}>
                <div className="nav-pill-selector" style={pillStyle}></div>
                
                {navigationItems.map((item) => (
                    <div key={item.path} className="nav-link-wrapper">
                        <NavLink to={item.path} className={({ isActive }) => isActive ? "nav-link-active" : ""}>
                            {item.label}
                        </NavLink>
                    </div>
                ))}
            </div>

            <div className="Rightside">
                THERON LINDSAY

                {props.loggedInStatus === "LOGGED_IN" ? <a className="btn signout" onClick={handleSignOut}><FontAwesomeIcon icon="sign-out-alt" /></a> : null}
            </div>
        </div>
    )
}

export default NavigationComponent;