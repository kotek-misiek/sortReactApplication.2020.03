import React from 'react';
import Axios from 'axios';
import Block from "./utils/Block"
import WaitButton from './utils/WaitButton';
import "./GeneralSorting.css";
import { properties } from './../env.properties';

class Sorting extends Block {
    constructor(props) {
        super(props);
        this.reference = React.createRef();
        this.buttonClicked = false;
        this.state = {
            options: [],
            sort: this.props.sort === "" || this.props.sort === undefined ? "QUICK" : this.props.sort.toUpperCase(),
            asc: true,
            isButtonClicked: false
        };
    }

    handleSortChange(event) {
        this.setStateParam("sort", event.target.value);
    }
    
    handleAscChange(event) {
        this.setStateParam("asc", event.target.checked);
    }
    
    handleSortButton(event) {
        var items = this.props.textareaValue.replace("[", "").replace("]", "").split(",");

        this.props.setStateParam("isButtonClicked", true);
        this.setStateParam("isButtonClicked", true);
        var params = {
            sort: this.state.sort
        };
        if (!this.state.asc) {
            params["asc"] = false;
        }
        const CONFIG = {
            params: params, 
            headers: {
                Authorization: "Bearer " + this.props.getStateParam("token")
            }
        };
        Axios.post(properties.appPath, items, CONFIG)
            .then(response => {
                this.props.updateParent("[" + response.data.sortedItems + "]");
                this.props.setStateParam("isButtonClicked", false);
                this.setStateParam("isButtonClicked", false);
            })
            .catch(error => {
                alert(error.message);
                this.props.setStateParam("isButtonClicked", false);
                this.setStateParam("isButtonClicked", false);
            });
        this.expandAuthCookies();
    }
    
    componentDidMount() {
        Axios.get(properties.sortEnumPath)
            .then(response => {
                this.setStateParam("options", response.data);
            })
            .catch(error => {
                this.setStateParam("options", ["-- ERROR --"]);
            });
    }

    render() {
        let optionsList = this.state.options.map((item, i) => {
          return (
            <option key={i} value={item} >{item}</option>
          )
        }, this);
        return (
            <div ref={this.reference} style={this.border}>
                <div>
                    <label>
                        Sort type:&nbsp;
                        <select name="sortEnum" 
                            value={this.state.sort} 
                            onChange={this.handleSortChange = this.handleSortChange.bind(this)}
                            disabled={this.isDisabled(false)}>
                            {optionsList}
                        </select>
                    </label>
                </div>
                <div>
                    <label> 
                        Ascending:&nbsp;
                        <input type="checkbox" 
                            onChange={this.handleAscChange = this.handleAscChange.bind(this)} 
                            defaultChecked={this.state.asc}
                            disabled={this.isDisabled(false)} />
                    </label>
                </div>
                <WaitButton
                    text="Sort"
                    onClick={this.handleSortButton = this.handleSortButton.bind(this)} 
                    disabled={this.isDisabled(false)}
                    wait={this.state.isButtonClicked} />
            </div>
        );
    }
}

export default Sorting;