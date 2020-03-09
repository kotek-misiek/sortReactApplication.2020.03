import Axios from 'axios';
import Block from './utils/Block';
import React from 'react';
import "./GeneralSorting.css";
import cookie from "react-cookies";
import { properties } from './../env.properties';


class Autorization extends Block {
    constructor(props) {
        super(props);
        this.reference = React.createRef();
        this.state.userName = cookie.load("userName");
    }

    userNameChange(event) {
        this.state.userName = event.target.value;
    }

    passwordChange(event) {
        this.state.password = event.target.value;
    }

    handleUnauthButton(event) {
        Axios.head(properties.logoutPath, {headers: {"Authorization": "Bearer " + cookie.load("token")}});

        cookie.remove("token");
        cookie.remove("userName");

        this.props.setStateParam("token", undefined);
        this.props.setStateParam("userName", undefined);
        this.props.setStateParam("password", undefined);
        this.setStateParam("userName", undefined);
        this.setStateParam("password", undefined);
    }

    handleAuthButton(event) {
        var postBody = "username=" + this.state.userName + "&password=" + this.state.password;
        Axios.post(properties.tokenPath, postBody)
            .then(response => {
                this.props.setStateParam("token", response.data);
                cookie.save("userName", this.state.userName, {maxAge: properties.cookiesSec});
                cookie.save("token", response.data, {maxAge: properties.cookiesSec});
            })
            .catch(error => {
                alert("error: " + error.response.data === undefined ? error.message : error.response.data);
                this.props.setStateParam("token", undefined);
                cookie.remove("token");
            });
    }

    renderAutorized() {
        return (
            <div ref={this.reference} style={this.border}>
                <div>Hello, <b>{this.state.userName}</b>!</div>
                <button onClick={this.handleUnauthButton=this.handleUnauthButton.bind(this)}>Logout</button>
            </div>
        );
    }

    renderUnautorized() {
        return (
            <div ref={this.reference} style={this.border}>
                <div style={this.bold}>Autorization block</div>
                <div style={this.rightAlign}>
                    <label> 
                        User name:&nbsp;
                        <input type="text" defaultValue={this.state.userName} onBlur={this.userNameChange=this.userNameChange.bind(this)} />
                    </label>
                </div>
                <div style={this.rightAlign}>
                    <label> 
                        Password:&nbsp;
                        <input type="password" defaultValue={this.state.password} onBlur={this.passwordChange=this.passwordChange.bind(this)} />
                    </label>
                </div>
                <button onClick={this.handleAuthButton=this.handleAuthButton.bind(this)}>Log in</button>
            </div>
        );
    }

    render() {
        return (this.props.getStateParam("token") === undefined || this.state.userName === undefined) 
            ? this.renderUnautorized() 
            : this.renderAutorized();
    }
}

export default Autorization;