import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";

class Blog extends Component {
    constructor() {
        super();

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            blogModalIsOpen: false,
        }

        this.getBlogItems = this.getBlogItems.bind(this);
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener("scroll", this.onScroll, false);
        this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(this);
    }

    handleSuccessfulNewBlogSubmission(blog) {
        this.setState({
            blogModalIsOpen: false,
            blogItems: [blog].concat(this.state.blogItems)
        })
    }

    handleModalClose() {
        this.setState({
            blogModalIsOpen: false
        })
    }

    handleNewBlogClick() {
        this.setState({
            blogModalIsOpen: true
        })
    }

    onScroll() {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && this.state.totalCount > this.state.currentPage && this.state.isLoading === false) {
            this.setState({
                isLoading: true,
            });
            this.getBlogItems();
        };
    }

    getBlogItems() {
        this.setState({
            currentPage: this.state.currentPage + 1,
        })
        axios.get(`https://theronlindsay.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, { withCredentials: true })
            .then(response => {
                this.setState({
                    blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
                    totalCount: response.data.meta.total_pages,
                    isLoading: false
                });
            }).catch(error => {
                console.log("getBlogItems", error);
            })
    }

    componentDidMount() {
        this.getBlogItems();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll, false);
    }

    render() {
        const blogRecords = this.state.blogItems.map(blogItem => {
            return <BlogItem key={blogItem.id} blogItem={blogItem} />
        });

        return (
            <div className="blog-container">
                <BlogModal modalIsOpen={this.state.blogModalIsOpen}
                    handleModalClose={this.handleModalClose}
                    handleSuccessfulNewBlogSubmission={this.handleSuccessfulNewBlogSubmission} />
                {this.props.loggedInStatus === "LOGGED_IN" ? (
                    <div className="new-blog-link">
                        <a className="btn" onClick={this.handleNewBlogClick}><FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon></a>
                    </div>
                ) : null}
                <div className="content-container">
                    {blogRecords}
                </div>
                <div className="content-loader">
                    {this.state.isLoading === true ? (
                        <FontAwesomeIcon icon="spinner" spin />
                    ) : (null)}
                </div>
            </div>
        )
    }
}

export default Blog;