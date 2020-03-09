import { Component } from 'react';
import { properties } from './../../env.properties';
import cookie from "react-cookies";

class Block extends Component {
    token = undefined;

    rightAlign = {textAlign: "right"};
    fitContent = {width: "fit-content"};
    border = {border: "1px solid black"};
    bold = {fontWeight: "bold"};

    constructor(props) {
        super(props);
        this.state = {};
        this.token = cookie.load("token");
    }

    setStateParam(param, value) {
        this[param] = value;
        var state = this.state;
        state[param] = value;
        this.setState(state);
    }

    getStateParam(param) {
        return this.state[param];
    }

    isDisabled(isThis) {
        if (isThis) {
            return this.getStateParam("token") === undefined || this.getStateParam("isButtonClicked");
        } else {
            return this.props.getStateParam("token") === undefined || this.props.getStateParam("isButtonClicked");
        }        
    }

    expandAuthCookies() {
        cookie.save("userName", cookie.load("userName"), {maxAge: properties.cookiesSec});
        cookie.save("token", cookie.load("token"), {maxAge: properties.cookiesSec});
    }
}

export default Block;