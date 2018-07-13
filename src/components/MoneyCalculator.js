import React, { Component } from 'react';
import MoneyInput from './MoneyInput';
import Data from '../localData/Data';
import Loading from './Loading';

const data = new Data();
const currencies = data.getCurrencies();
const MX_PESO = 'p';
const DOLLAR = 'd';
const EURO = 'e';
const currenciesArray = ['MXN', 'EUR'];

class MoneyCalculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: '',
            currency: MX_PESO,
            currenciesValues: currencies,
            ready: false, 
            apiFailed: false
        }
        this.tryConvert = this.tryConvert.bind(this);
        this.convert = this.convert.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
    }

    componentDidMount() {
        this.updateCurrencies();
        this.curTimerId = setInterval(() => this.updateCurrencies(), 600000);
    }
    
    componentWillUnmount() {
        clearInterval(this.curTimerId);
    }

    handleAmountChange(amount, currency) {
        this.setState({
            currency: currency,
            amount: amount
        });
    }

    tryConvert(amount, from, to) {
        const input = parseFloat(amount);
        if (Number.isNaN(input)) {
            return '';
        }
        const output = this.convert(input, from, to);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    }

    convert(amount, from, to) {
        const unit = this.state.currenciesValues[from][to];
        return amount * unit;
    }

    updateCurrencies() {
        data.getCurrenciesFromApi(currenciesArray)
            .then((response) => {
                this.setState({
                    currenciesValues: response,
                    ready: true
                });
            })
            .catch((reason) => {
                this.setState({
                    isReady: false,
                    apiFailed: {
                        failed: true,
                        info: reason
                    }
                });
            });
    }

    render() {
        const currency = this.state.currency,
            amount = this.state.amount,
            peso = currency === MX_PESO ? amount : this.tryConvert(amount, currency, MX_PESO),
            dollar = currency === DOLLAR ? amount : this.tryConvert(amount, currency, DOLLAR),
            euro = currency === EURO ? amount : this.tryConvert(amount, currency, EURO),
            isReady = this.state.ready;

        if  (!isReady) {
            if (this.state.apiFailed.failed) {
                return this.state.apiFailed.info.toString();
            }

            return <Loading />;
        }

        return (
            <div>
                <h1>Lifting state up</h1>
                <h2>Money converter</h2>
                <MoneyInput currency={MX_PESO} amount={peso} onAmountChange={this.handleAmountChange} />
                <MoneyInput currency={DOLLAR} amount={dollar} onAmountChange={this.handleAmountChange} />
                <MoneyInput currency={EURO} amount={euro} onAmountChange={this.handleAmountChange} />
            </div>
        );
    }

}

export default MoneyCalculator;