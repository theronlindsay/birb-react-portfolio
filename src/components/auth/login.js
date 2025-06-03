import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
            axios.post("https://api.devcamp.space/sessions",
            {
                client: {
                    email: this.state.email,
                    password: this.state.password
                }
            },
            {withCredentials: true}
        ).then(response => {
            if(response.data.status === 'created'){
                this.props.handleSuccessfulAuth();
            }else{
                this.setState({
                    errorText: "Invalid E-Mail or Password 😬"
                })
                this.props.handleUnSuccessfulAuth();
            }
        }).catch(error =>{
            this.setState({
                errorText: "An error occured ):"
            })
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        })
    }

    render() {
        return(
            <div>

                <h1>Login to access the Dashboard</h1>

                <div>{this.state.errorText}</div>            <form onSubmit={this.handleSubmit} className="auth-form">
                <input type = "email" name = "email" placeholder = "E-Mail" value={this.state.email} onChange={this.handleChange}/>
                <input type = "password" name = "password" placeholder = "Password" value={this.state.password} onChange={this.handleChange}/>
                
                <div className="btn-group">
                    <button type="submit" className="btn submit">Login</button>
                </div>
            </form>
            </div>
        );
    }
}