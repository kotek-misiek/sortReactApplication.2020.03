import React from 'react';
import Block from './utils/Block';
import Autorization from './Autorization';
import Generation from './Generation';
import Sorting from './Sorting';
import "./GeneralSorting.css";

class GeneralSorting extends Block {
    constructor(props) {
        super(props);
        this.state = {
            textareaValue: "",
            token: this.token
        };
        this.updateValue = this.updateValue.bind(this);
        this.updateParent = this.updateParent.bind(this);
        this.getStateParam = this.getStateParam.bind(this);
        this.setStateParam = this.setStateParam.bind(this);
        
        this.reference = React.createRef();
    }

    updateValue(event) {
        this.setStateParam("textareaValue", event.target.value);
    }

    updateParent(value) {
        this.setStateParam("textareaValue", value);
    }

    render() {
        return (
                <div ref={this.reference} style={this.fitContent}>
                    <h1>{this.props.name}</h1>
                    <div style={this.border}>
                        <table>
                            <tbody>
                            <tr>
                                <th>Array preparation:</th>
                                <th>Array to sort</th>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <Autorization 
                                            getStateParam={this.getStateParam} 
                                            setStateParam={this.setStateParam}/>
                                    </div>
                                    <div>
                                        <Generation 
                                            name="Array to sort generation" 
                                            updateParent={this.updateParent} 
                                            getStateParam={this.getStateParam} 
                                            setStateParam={this.setStateParam}/>
                                    </div>
                                    <div>
                                        <Sorting 
                                            updateParent={this.updateParent} 
                                            textareaValue={this.state.textareaValue} 
                                            sort={this.props.sort} 
                                            getStateParam={this.getStateParam} 
                                            setStateParam={this.setStateParam}/>
                                    </div>
                                </td>
                                <td><textarea value={this.state.textareaValue} onChange={this.updateValue} disabled={this.isDisabled(true)}/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        );
    }
}

export default GeneralSorting;