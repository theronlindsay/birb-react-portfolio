import React, { Component } from 'react';
import aboutImage from "../../../static/assets/images/about/birb.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function () {
    return (
        <div className="about-wrapper">
            <div className="about-image" style={{ backgroundImage: `url(${aboutImage})` }} />
            
            <div className="about-content">
                <div className="about-text">
                    <h2>About Me</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, veniam illum eius dignissimos quia explicabo illo id vitae in rerum minus delectus reprehenderit, error non qui ipsam laudantium blanditiis totam.

                        Officia voluptate neque vitae incidunt laboriosam delectus ut quas corporis voluptatibus temporibus explicabo dignissimos debitis tempora eum expedita eius, sapiente molestias illum deserunt aut repudiandae. Distinctio sequi reprehenderit perferendis ullam.

                        Officiis neque officia quos ut, rerum eaque, non corporis ipsam repellendus vero labore doloribus dolor odit unde, itaque pariatur quidem quis. Nam magni assumenda porro facere fuga incidunt ipsum consequatur!

                        Eligendi assumenda tempore deserunt commodi repudiandae iste, tempora ratione, minus qui debitis illo ducimus recusandae aperiam placeat enim, aliquam quod officia amet voluptatem vitae ab laborum quibusdam sunt sequi. Expedita.</p>
                </div>

                <div className="contact-section">
                    <h2>Get In Touch</h2>
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
        </div>
    );
}