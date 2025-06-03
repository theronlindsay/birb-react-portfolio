import axios from 'axios';
import React, { Component } from 'react';
import { DropzoneComponent } from 'react-dropzone-component';
import { InputLabel, Select, MenuItem, FormControl, Chip, Box } from '@mui/material';
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
        super(props);        this.state = {
            name: "",
            description: "",
            category: [], // Changed to array for multiple categories
            position: "",
            url: "",
            thumb_image: "",
            banner_image: "",
            logo: "",
            editMode: false,
            apiUrl: "https://theronlindsay.devcamp.space/portfolio/portfolio_items",
            apiAction: 'post',
            availableCategories: ['AI', 'Gaming', 'Software', 'Web', 'Design', 'UX', 'Mobile', 'Media', 'Animation', 'Multiplayer', 'VR']
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
        axios.delete(`https://theronlindsay.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`, { withCredentials: true })
            .then(response => {
                this.setState({
                    [`${imageType}_url`]: ""
                });
            })
            .catch(error => {
                console.log("deleteImage error", error);
            });
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

            this.props.clearPortfolioToEdit();            this.setState({
                id: id,
                name: name || "",
                description: description || "",
                category: category ? (Array.isArray(category) ? category : category.split(',').map(c => c.trim())) : [], // Handle both array and string formats
                position: position || "",
                url: url || "",
                editMode: true,
                apiUrl: `https://theronlindsay.devcamp.space/portfolio/portfolio_items/${id}`,
                apiAction: "patch",
                thumb_image_url: thumb_image_url || "",
                banner_image_url: banner_image_url || "",
                logo_url: logo_url || "",
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
        formData.append("portfolio_item[category]", Array.isArray(this.state.category) ? this.state.category.join(', ') : this.state.category);
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
    }    handleChange(event) {
        const { name, value } = event.target;
        
        if (name === 'category') {
            // Handle multiple category selection
            this.setState({
                [name]: typeof value === 'string' ? value.split(',') : value
            });
        } else {
            this.setState({
                [name]: value
            });
        }
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
                }                this.setState({
                    name: "",
                    description: "",
                    category: [],
                    position: "",
                    url: "",
                    thumb_image: "",
                    banner_image: "",
                    logo: "",
                    editMode: false,
                    apiUrl: "https://theronlindsay.devcamp.space/portfolio/portfolio_items",
                    apiAction: "post",
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
                    </div>                    <FormControl style={style.FormControl}>
                        <InputLabel id="Category" style={style.InputLabel}>Categories</InputLabel>
                        <Select
                            disableUnderline
                            style={style.Select}
                            labelId="Category"
                            id="Category"
                            name="category"
                            multiple
                            value={this.state.category}
                            onChange={this.handleChange}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip 
                                            key={value} 
                                            label={value} 
                                            size="small"
                                            style={{ 
                                                backgroundColor: '#4a90e2', 
                                                color: 'white',
                                                margin: '2px'
                                            }}
                                        />
                                    ))}
                                </Box>
                            )}
                        >
                            {this.state.availableCategories.map((category) => (
                                <MenuItem key={category} value={category} style={style.active}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="text-area-wrapper">
                    <textarea type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
                </div>


                <div className="img-uploaders three-column" id="upload">
                    {this.state.thumb_image_url && this.state.editMode ? (
                        <div className="portfolio-manager-image-wrapper">
                            <div><img src={this.state.thumb_image_url} /></div>

                            <div className="image-removal-link">
                                <a className="btn" onClick={() => this.deleteImage("thumb_image")}><FontAwesomeIcon icon="trash" /></a>
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

                    {this.state.banner_image_url && this.state.editMode ? (
                        <div className="portfolio-manager-image-wrapper">
                            <div><img src={this.state.banner_image_url} /></div>

                            <div className="image-removal-link">
                                <a className="btn" onClick={() => this.deleteImage("banner_image")}><FontAwesomeIcon icon="trash" /></a>
                            </div>
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


                    {this.state.logo_url && this.state.editMode ? (
                        <div className="portfolio-manager-image-wrapper">
                            <div><img src={this.state.logo_url} /></div>

                            <div className="image-removal-link">
                                <a className="btn" onClick={() => this.deleteImage("logo")}><FontAwesomeIcon icon="trash" /></a>
                            </div>
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
                    )}                </div>

                <div className="submit-wrapper">
                    <button className="btn submit" type="submit">Save</button>
                </div>
            </form>
        );
    }
}