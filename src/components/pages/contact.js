import React, { Component } from 'react';
import loginImage from "../../../static/assets/images/auth/login.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function () {
    return (
        <div className="contact-page-wrapper" >
            <div className="contact-image" style={{ backgroundImage: `url(${loginImage})` }} />

            <div className="contact-content-wrapper">
                <div className="contact-content">
                    <div className="row">
                        <FontAwesomeIcon icon="phone" /><p>555-555-5555</p>
                    </div>

                    <div className="row">
                        <FontAwesomeIcon icon="envelope" /><p><a href="mailto: email@email.com">email@email.com</a> </p>
                    </div>

                    <div className="row">
                        <FontAwesomeIcon icon="map-marker-alt" /><p>The Basement</p>
                    </div>

                </div>
            </div>
        </div>
    );
}