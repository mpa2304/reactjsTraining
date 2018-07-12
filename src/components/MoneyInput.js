import React, { Component } from 'react';
import Data from '../localData/Data';

const data = new Data();
const currencies = data.getCurrencies();

class MoneyInput extends Component {

    handleChange(currency, e) {
        this.props.onAmountChange(e.target.value, currency);
    }

    render() {
        const amount = this.props.amount,
            currency = this.props.currency;

        return (
            <fieldset>
                <legend>Enter amount in {currencies[currency].name}:</legend>
                <input type="number" value={amount} onChange={this.handleChange.bind(this, currency)} />
            </fieldset>
        );
    }
}

export default MoneyInput;