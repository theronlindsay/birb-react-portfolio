import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser'

import BlogForm from "../blog/blog-form";

export default function BlogDetail({ loggedInStatus }) {
    const { slug } = useParams();
    const [blogItem, setBlogItem] = useState({});
    const [editMode, setEditMode] = useState(false);

    const handleUpdateFormSubmission = (blog) => {
        setBlogItem(blog);
        setEditMode(false);
    }

    const handleFeaturedImageDelete = () => {
        setBlogItem({
            ...blogItem,
            featured_image_url: "",
        });
    }

    const handleEditClick = () => {
        if (loggedInStatus === "LOGGED_IN") {
            console.log("handle edit click");
            setEditMode(true);
        }
    }

    const getBlogItem = () => {
        axios.get(`https://theronlindsay.devcamp.space/portfolio/portfolio_blogs/${slug}`)
            .then(response => {
                setBlogItem(response.data.portfolio_blog);
            }).catch(error => {
                console.log("getBlogItem error", error)
            });
    }

    useEffect(() => {
        getBlogItem();
    }, [slug]);    const {
        title,
        content,
        featured_image_url,
        blog_status
    } = blogItem;

    const contentManager = () => {
        if (editMode) {
            return <BlogForm handleFeaturedImageDelete={handleFeaturedImageDelete} handleUpdateFormSubmission={handleUpdateFormSubmission} editMode={editMode} blog={blogItem} />;
        } else {
            return (
                <div className="content-container">
                    <h1 onClick={handleEditClick}>{title}</h1>

                    {featured_image_url ? (
                        <div className="featured-image-wrapper">
                            <img src={featured_image_url} />
                        </div>) : (null)}

                    <div className="content">{parse(content || '')}</div>
                </div>
            );
        }
    };

    return (
        <div className="blog-container">
            {contentManager()}
        </div>
    );
}