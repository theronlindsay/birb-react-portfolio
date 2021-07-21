import React, { Component } from 'react';
import axios from 'axios';
import RichTextEditor from "../forms/rich-text-editor";
import DropzoneComponent from "react-dropzone-component";


export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            blog_status: "",
            content: "",
            featured_image: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);

        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);

        this.featuredImageRef = React.createRef();
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
                featured_image: file,
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
        formData.append("portfolio_blog[featured_image]", this.state.featured_image);

        return formData;
    }

    handleSubmit(event) {
        axios.post("https://theronlindsay.devcamp.space/portfolio/portfolio_blogs", this.buildForm(), { withCredentials: true }
        ).then(response => {

            if (this.state.featured_image) {
                this.featuredImageRef.current.dropzone.removeAllFiles();
            }

            this.setState({
                title: "",
                blog_status: "",
                content: "",
                featured_image: ""
            });

            this.props.handleSuccessfullFormSubmission(response.data.portfolio_blog)

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
                            <input onChange={this.handleChange} type="text" name="blog_status" placeholder="Blog Status" value={this.state.blog_status} />

                        </div>
                    </div>

                    <div className="one-column">
                        <RichTextEditor handleRichTextEditorChange={this.handleRichTextEditorChange} />
                    </div>

                    <div className="img-uploaders" id="upload">
                        {this.state.featured_image && this.state.editMode ? (
                            <div className="portfolio-manager-image-wrapper">
                                <div><img src={this.state.thumb_image_url} /></div>

                                <div className="image-removal-link">
                                    <a className="btn" onClick={() => this.deleteImage("thumb_image")}><FontAwesomeIcon icon="trash" /></a>
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
                        )}
                    </div>

                    <button className="btn">Save</button>
                </form>
            </div>
        );
    }
}