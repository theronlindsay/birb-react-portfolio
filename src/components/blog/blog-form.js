import React, { Component } from 'react';
import axios from 'axios';
import RichTextEditor from "../forms/rich-text-editor";
import DropzoneComponent from 'react-dropzone-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';

const style = {
    Select: {
        border: 0,
        color: 'white',
        borderBottom: '1px solid white',
        selectRoot: { color: "white" },
        fontFamily: '"Fira Sans", sans-serif',
    },
    FormControl: {
        color: 'white',
        width: '100%',
        fontFamily: '"Fira Sans", sans-serif',
    },
    InputLabel: {
        color: '#A0A1A8',
        fontFamily: '"Fira Sans", sans-serif',
    },
    active: {
        backgroundColor: 'rgb(49, 52, 66)',
        color: 'white',
        fontFamily: '"Fira Sans", sans-serif',
    }
}

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            title: "",
            blog_status: "",
            content: "",
            featured_image: "",
            apiUrl: "https://theronlindsay.devcamp.space/portfolio/portfolio_blogs",
            apiAction: "post"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);

        this.featuredImageRef = React.createRef();
    }

    deleteImage(imageType) {
        axios.delete(`https://theronlindsay.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}?image_type=${imageType}`, { withCredentials: true })
            .then(response => {
                this.props.handleFeaturedImageDelete();
            })
            .catch(error => {
                console.log("deleteImage error", error);
            });
    }

    componentWillMount() {
        if (this.props.editMode) {
            this.setState({
                id: this.props.blog.id,
                title: this.props.blog.title,
                blog_status: this.props.blog.blog_status,
                content: this.props.blog.content,
                apiUrl: `https://theronlindsay.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
                apiAction: "patch"
            });
        }
    }

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    handleFeaturedImageDrop() {
        return {
            addedfile: file => this.setState({
                featured_image: file
            })
        }
    }

    handleRichTextEditorChange(content) {
        this.setState({ content });
    }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);
        formData.append("portfolio_blog[content]", this.state.content);
        if (this.state.featured_image) {
            formData.append("portfolio_blog[featured_image]", this.state.featured_image);
        }


        return formData;
    }

    handleSubmit(event) {
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true,
        })
            .then(response => {

                if (this.state.featured_image) {
                    this.featuredImageRef.current.dropzone.removeAllFiles();
                }

                this.setState({
                    title: "",
                    blog_status: "",
                    content: "",
                    featured_image: ""
                });

                if (this.props.editMode) {
                    // Update blog detail
                    this.props.handleUpdateFormSubmission(
                        response.data.portfolio_blog
                    )
                } else {
                    this.props.handleBlogSubmission(response.data.portfolio_blog);
                }
            }).catch(error => {
                console.log("submit for blog error", error);
            })
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
                    <div className="two-column">
                        <div className="input-element">
                            <input onChange={this.handleChange} type="text" name="title" placeholder="Blog Title" value={this.state.title} />

                        </div>

                        <div className="input-element">
                            <FormControl style={style.FormControl}>
                                <InputLabel id="Status" style={style.InputLabel}>Status</InputLabel>
                                <Select
                                    disableUnderline
                                    style={style.Select}
                                    labelId="Status"
                                    id="Status"
                                    name="blog_status"
                                    value={this.state.blog_status}
                                    onChange={this.handleChange}
                                >
                                    <MenuItem value="published" style={style.active}>Published</MenuItem>
                                    <MenuItem value="draft" style={style.active}>Draft</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className="one-column">
                        <RichTextEditor handleRichTextEditorChange={this.handleRichTextEditorChange} editMode={this.props.editMode} contentToEdit={this.props.editMode && this.props.blog.content ? this.props.blog.content : null} />
                    </div>

                    <div className="img-uploaders" id="upload">
                        {this.props.editMode && this.props.blog.featured_image_url ? (
                            <div className="portfolio-manager-image-wrapper">
                                <div><img src={this.props.blog.featured_image_url} /></div>

                                <div className="image-removal-link">
                                    <a className="btn" onClick={() => this.deleteImage("featured_image")}><FontAwesomeIcon icon="trash" /></a>
                                </div>
                            </div>
                        ) : (

                            <DropzoneComponent
                                ref={this.featuredImageRef}
                                config={this.componentConfig()}
                                djsConfig={this.djsConfig()}
                                eventHandlers={this.handleFeaturedImageDrop()}
                            >
                                <div className="dz-message">Featured Image</div>
                            </DropzoneComponent>
                        )}                    </div>

                    <div className="submit-wrapper">
                        <button className="btn submit">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}