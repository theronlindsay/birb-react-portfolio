import React, { Component } from 'react';
import ReactModal from 'react-modal';

import BlogForm from "../blog/blog-form";

ReactModal.setAppElement(".app-wrapper");

export default class BlogModal extends Component {
    constructor(props) {
        super(props);

        this.customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                width: '70%',
                height: '70%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgb(35, 37, 47)',
                border: 'none',
                borderRadius: '30px',
            },
            overlay: {
                backgroundColor: "rgba(1,1,1, 0.75)",
            }
        };

        this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(this);
    }

    handleSuccessfulNewBlogSubmission(blog) {
        this.props.handleSuccessfulBlogSubmission(blog);
    }

    render() {
        return (
            <ReactModal onRequestClose={() => {
                this.props.handleModalClose();
            }} isOpen={this.props.modalIsOpen}
                style={this.customStyles}>
                <BlogForm handleBlogSubmission={this.handleSuccessfulNewBlogSubmission} />
            </ReactModal>
        )
    }
}