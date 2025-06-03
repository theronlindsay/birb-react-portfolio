import React from 'react';
import { Link } from 'react-router-dom';
import striptags from "striptags";

const BlogItem = props => {
    const {
        id,
        blog_status,
        content,
        title,
        featured_image_url
    } = props.blogItem;

    const truncateText = (text, maxLength = 300) => {
        if (!text) return '';
        const stripped = striptags(text);
        if (stripped.length <= maxLength) return stripped;
        return stripped.substring(0, maxLength) + '...';
    };    return (
        <Link to={`/b/${id}`} className="blog-card-link">
            <div className="blog-card">
                {featured_image_url && (
                    <div className="blog-card-image">
                        <img src={featured_image_url} alt={title} />
                    </div>
                )}
                <div className="blog-card-content">
                    <div className="blog-card-header">
                        <h2 className="blog-card-title">{title}</h2>
                    </div>
                    <div className="blog-card-text">
                        {truncateText(content)}
                        {content && striptags(content).length > 300 && (
                            <span className="read-more-text"> Read More</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogItem;