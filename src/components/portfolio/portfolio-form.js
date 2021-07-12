import axios from 'axios';
import React, { Component } from 'react';
import { DropzoneComponent } from 'react-dropzone-component';
import { InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

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
export default class PortfolioForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            category: "",
            position: "",
            url: "",
            thumb_image: "",
            banner_image: "",
            logo: "",
            editMode: false,
            apiUrl: "https://theronlindsay.devcamp.space/portfolio/portfolio_items",
            apiAction: 'post',

        };



        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleThumbDrop = this.handleThumbDrop.bind(this);
        this.handleBannerDrop = this.handleBannerDrop.bind(this);
        this.handleLogoDrop = this.handleLogoDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        this.thumbRef = React.createRef();
        this.bannerRef = React.createRef();
        this.logoRef = React.createRef();
    }

    deleteImage(imageType) {
        console.log("deleteImage", imageType)
    }

    componentDidUpdate() {
        if (Object.keys(this.props.portfolioToEdit).length > 0) {
            const {
                id,
                name,
                description,
                category,
                position,
                url,
                thumb_image_url,
                banner_image_url,
                logo_url
            } = this.props.portfolioToEdit;

            this.props.clearPortfolioToEdit();

            this.setState({
                id: id,
                name: name || "",
                description: description || "",
                category: category || "",
                position: position || "",
                url: url || "",
                editMode: true,
                apiUrl: `https://theronlindsay.devcamp.space/portfolio/portfolio_items/${id}`,
                apiAction: 'patch',
                thumb_image: thumb_image_url || "",
                banner_image: banner_image_url || "",
                logo: logo_url || "",
            })
        }
    }

    handleThumbDrop() {
        return {
            addedfile: file => this.setState({ thumb_image: file })
        }
    }

    handleBannerDrop() {
        return {
            addedfile: file => this.setState({ banner_image: file })
        }
    }

    handleLogoDrop() {
        return {
            addedfile: file => this.setState({ logo: file })
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

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_item[name]", this.state.name);
        formData.append("portfolio_item[description]", this.state.description);
        formData.append("portfolio_item[url]", this.state.url);
        formData.append("portfolio_item[category]", this.state.category);
        formData.append("portfolio_item[position]", this.state.position);

        if (this.state.thumb_image) {
            formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
        }

        if (this.state.banner_image) {
            formData.append("portfolio_item[banner_image]", this.state.banner_image);
        }

        if (this.state.logo) {
            formData.append("portfolio_item[logo]", this.state.logo);
        }

        return formData;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log("setState");
    }

    handleSubmit(event) {
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true,
        })
            .then(response => {
                if (this.state.editMode) {
                    this.props.handleEditFormSubmission();
                } else {
                    this.props.handleNewFormSubmission(response.data.portfolio_item);
                }
                this.setState({
                    name: "",
                    description: "",
                    category: "",
                    position: "",
                    url: "",
                    thumb_image: "",
                    banner_image: "",
                    logo: "",
                    editMode: false,
                    apiUrl: "https://theronlindsay.devcamp.space/portfolio/portfolio_items",
                    apiAction: 'post',
                });

                [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
                    ref.current.dropzone.removeAllFiles();
                });
            }).catch(error => {
                console.log("form submit error", error);
            })
        event.preventDefault();
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
                <div className="two-column">
                    <input type="text" name="name" placeholder="Portfolio Item Name" value={this.state.name} onChange={this.handleChange} />
                    <input type="text" name="url" placeholder="URL" value={this.state.url} onChange={this.handleChange} />
                </div>
                <div className="two-column">
                    <div className="pos">
                        <input type="text" name="position" placeholder="Position" value={this.state.position} onChange={this.handleChange} />
                    </div>


                    <FormControl style={style.FormControl}>
                        <InputLabel id="Category" style={style.InputLabel}>Category</InputLabel>
                        <Select
                            disableUnderline
                            style={style.Select}
                            labelId="Category"
                            id="Category"
                            name="category"
                            value={this.state.category}
                            onChange={this.handleChange}
                        >
                            <MenuItem value="eCommerce" style={style.active}>eCommerce</MenuItem>
                            <MenuItem value="Social" style={style.active}>Social</MenuItem>
                            <MenuItem value="Other" style={style.active}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="text-area-wrapper">
                    <textarea type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
                </div>


                <div className="img-uploaders" id="upload">
                    {this.state.thumb_image && this.state.editMode ? (
                        <div className="portfolio-manager-image-wrapper">
                            <img src={this.state.thumb_image} />

                            <div className="btn image-removal-link">
                                <a onClick={() => this.deleteImage("thumb_image")}><FontAwesomeIcon icon="trash" /></a>
                            </div>
                        </div>
                    ) : (

                        <DropzoneComponent
                            ref={this.thumbRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleThumbDrop()}
                        >
                            <div className="dz-message">Thumbnail</div>
                        </DropzoneComponent>
                    )}

                    {this.state.banner_image && this.state.editMode ? (
                        <div className="portfolio-manager-image-wrapper">
                            <img src={this.state.banner_image} />
                        </div>
                    ) : (

                        <DropzoneComponent
                            ref={this.bannerRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleBannerDrop()}
                        >
                            <div className="dz-message">Banner Image</div>
                        </DropzoneComponent>

                    )}


                    {this.state.logo && this.state.editMode ? (
                        <div className="portfolio-manager-image-wrapper">
                            <img src={this.state.logo} />
                        </div>
                    ) : (

                        <DropzoneComponent
                            ref={this.logoRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleLogoDrop()}
                        >
                            <div className="dz-message">Logo image</div>
                        </DropzoneComponent>
                    )}

                </div>

                <div >
                    <button className="btn submit" type="submit">Save</button>
                </div>
            </form>
        );
    }
}