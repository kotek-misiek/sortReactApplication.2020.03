import React from 'react';
import Axios from 'axios';
import Block from "./utils/Block"
import WaitButton from './utils/WaitButton';
import "./GeneralSorting.css";
import { properties } from './../env.properties';

class Generation extends Block {
    constructor(props) {
        super(props);
        this.reference = React.createRef();
        this.state = {
            avoidDuplicates: true,
            n: 10,
            maxValue: 10,
            isButtonClicked: false
        };
    }

    handleAvoidDuplicatesChange(event) {
        this.state.avoidDuplicates = event.target.checked;
    }

    handleNChange(event) {
        this.state.n = event.target.value;
    }
    
    handleMaxValueChange(event) {
        this.state.maxValue = event.target.value;
    }

    checkInputParams() {
        var isOk = true;
        if (isNaN(this.state.n)) {
          isOk = false;
          alert("Number of items is not a number");
        } else if (this.state.n === 0 || this.state.n === "") {
          isOk = false;
          alert("Number of items equals zero or empty");
        } else if (isNaN(this.state.maxValue)) {
          isOk = false;
          alert("Max value is not a number");
        } else if (this.state.maxValue === 0 || this.state.maxValue === "") {
          isOk = false;
          alert("Max value equals zero or empty");
        } else if (this.state.avoidDuplicates && this.state.maxValue < this.state.n) {
          isOk = false;
          alert("Сannot avoid duplicates when max value less than number of items");
        }
        return isOk;
    }

    handleGenerateButton(event) {
        if (this.checkInputParams()) {
            const PARAMS = {
                n: this.state.n,
                maxValue: this.state.maxValue,
                avoidDuplicates: this.state.avoidDuplicates ? undefined : false
            };

            this.props.setStateParam("isButtonClicked", true);
            this.setStateParam("isButtonClicked", true);
            const CONFIG = {
                params: PARAMS, 
                headers: {
                    Authorization: "Bearer " + this.props.getStateParam("token")
                }
            };
            Axios.get(properties.appPath, CONFIG)
                .then(response => {
                    this.props.updateParent("[" + response.data + "]");
                    this.props.setStateParam("isButtonClicked", false);
                    this.setStateParam("isButtonClicked", false);
                })
                .catch(error => {
                    alert(error.message);
                    this.props.setStateParam("isButtonClicked", false);
                    this.setStateParam("isButtonClicked", false);
                });
        }
        this.expandAuthCookies();
    }

    render() {
        return (
            <div ref={this.reference} style={this.border}>
                <div style={this.bold}>{this.props.name}</div>
                <div>
                    <label> 
                        Avoid duplicates:
                        <input type="checkbox" 
                            onClick={this.handleAvoidDuplicatesChange = this.handleAvoidDuplicatesChange.bind(this)} 
                            defaultChecked={this.state.avoidDuplicates} 
                            disabled={this.isDisabled(false)} />
                    </label>
                </div>
                <div style={this.rightAlign}>
                    <label> 
                        Number of items:
                        <input type="text" 
                            onBlur={this.handleNChange = this.handleNChange.bind(this)} 
                            defaultValue={this.state.n} 
                            disabled={this.isDisabled(false)} />
                    </label>
                </div>
                <div style={this.rightAlign} >
                    <label> 
                        Max value:
                        <input type="text" 
                            onBlur={this.handleMaxValueChange = this.handleMaxValueChange.bind(this)} 
                            defaultValue={this.state.maxValue} 
                            disabled={this.isDisabled(false)} />
                    </label>
                </div>
                <WaitButton
                    text="Generate"
                    onClick={this.handleGenerateButton = this.handleGenerateButton.bind(this)} 
                    disabled={this.isDisabled(false)}
                    wait={this.state.isButtonClicked}
                /> 
            </div>
        );
    }
}

export default Generation;