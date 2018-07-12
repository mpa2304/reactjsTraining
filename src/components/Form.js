import React, { Component } from 'react';
import Data from '../localData/Data';

const DESCRIPTION_DEFAULT = 'Please write a description';
const UNSELECTED = 'unselected';
const data = new Data(); 
const progLangs = data.getProgLangs();
let selectedLanguages = progLangs.filter((lang, index) => index < 2 ).map(lang => lang.name);
let contactMethods = data.getContactMethods();
let radioArray = Object.keys(contactMethods).map((key) => {
    return {[key]: contactMethods[key]}
});

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            description: DESCRIPTION_DEFAULT,
            selectLang: '',
            selectLangs: selectedLanguages,
            wantsNewsletter: false,
            contactMethod: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.minInputValue = this.props.inputMin < 3 ? 3 : this.props.inputMin;
        this.minTextareaValue = this.props.textareaMin < 10 ? 10 : this.props.textareaMin;
    }

    handleChange(e) {
        const target = e.target,
            name = target.name,
            type = target.type;
        let value = target.value;

        switch (type) {
            case 'select-multiple':
                value = Array.from(target.selectedOptions).map((option) => option.value);
                break;
            case 'checkbox':
                value = target.checked;
                break;
            default:
                break;
        }

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        // validate name
        if (this.state.nombre.length < this.minInputValue) {
            alert("At least " + this.minInputValue + " characters in input");
            this.setState({
                nombre: ''
            });
            return;
        }

        // validate description
        if (this.state.description === DESCRIPTION_DEFAULT) {
            alert('Please write a description!');
            this.setState({
                description: ''
            });
            return;
        }
        if (this.state.description.length < this.minTextareaValue) {
            alert("At least " + this.minTextareaValue + " characters in textarea");
            this.setState({
                description: ''
            });
            return;
        }

        // validate select
        if (this.state.selectLang === UNSELECTED) {
            alert('Select one prog lang')
            return;
        }

        // validate multiple select
        if (this.state.selectLangs.length < 2) {
            alert('Select at least 2 prog langs');
            return;
        }

        alert('A name was submitted: ' + this.state.nombre + 
            ' with description: ' + this.state.description + 
            ' the prog lang selected is: ' + this.state.selectLang + 
            ' the next prog langs selected are: ' + this.state.selectLangs.join(", ") + 
            ' Wants newsletter: ' + this.state.wantsNewsletter.toString() +
            ' Contact method: ' + this.state.contactMethod
        );
    }

    render() {
        return (
            <div>
                <h2>Controlled components</h2>
                <form onSubmit={this.handleSubmit}>
                    {/*--- INPUTS ---*/}
                    <label>
                        Name:
                        <input type="text" name="nombre" value={this.state.nombre} onChange={this.handleChange} />
                    </label>
                    <hr />
                    {/*--- TEXTAREA ---*/}
                    <label>
                        <textarea name="description" value={this.state.description} onChange={this.handleChange} />
                    </label>
                    <hr />
                    {/*--- SELECT ---*/}
                    <label>
                        Pick a programming language to learn:
                        <select name="selectLang" value={this.state.selectLang} onChange={this.handleChange}>
                            <option value={UNSELECTED}>Select one</option>
                            {progLangs.map((item) => {
                                return <option key={item.id} value={item.name}>{item.name}</option>
                            })}
                        </select>
                    </label>

                    {/*--- SELECT MULTIPLE ---*/}
                    <label>
                        Pick the programming languages to learn:
                        <select name="selectLangs" multiple={true} value={this.state.selectLangs} onChange={this.handleChange}>
                            {progLangs.map((item) => {
                                return <option key={item.id} value={item.name}>{item.name}</option>
                            })}
                        </select>
                    </label>

                    {/*--- CHECKBOX ---*/}
                    <label>
                        Check if you want newsletter
                        <input name="wantsNewsletter" type="checkbox" checked={this.state.wantsNewsletter} onChange={this.handleChange} />
                    </label>

                    {/*--- RADIO ---*/}

                    <legend>Select the contact method:</legend>
                    
                    {radioArray.map((item) => {
                        let key,
                            value;
                        key = Object.keys(item).toString();
                        value = item[key];

                        return  <div key={key}>
                                    <input type="radio" name="contactMethod" value={key} id={key} onChange={this.handleChange} checked={this.state.contactMethod === key} />
                                    <label htmlFor={key}>{value}</label>
                                </div>
                    })}

                    <hr />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Form;