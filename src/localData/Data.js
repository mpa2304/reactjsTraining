import shortid from 'shortid';

let data = [{
    title: 'Do laundry',
    comment: 'need to do laundry'
}, {
    title: 'Go to mall',
    comment: 'Need to go to do shopping'
}, {
    title: 'Learn React JS',
    comment: 'Must learn React JS'
}, {
    title: 'Learn Vue.js',
    comment: 'need to learn vue JS'
}, {
    title: 'Learn React Native',
    comment: 'need to learn React native'
}, {
    title: 'Learn NativeScript',
    comment: 'need to learn Native Script'
}, {
    title: 'Practice algotithms and data structures',
    comment: 'need to practice on codefights'
}];

let progLanguages = ['PHP', 'JavaScript', 'Python', 'Java', 'Ruby', 'Swift', 'Go', 'C++', 'C#', 'Perl'];
let contactMethods = {
    mobile: "Mobile",
    phone: "Phone",
    twitter: "Twitter"
}

const API_KEYS = {
    currencies: "27d3facdb4879e1ecdd78cc0cb0b8ead"
}

const ENDPOINTS = {
    currencies: "http://apilayer.net/api/live"
}

const currencies = {
    d: {
        p: 1,
        e: 1,
        name: "US Dollar"
    },
    p: {
        d: 1,
        e: 1,
        name: "Mexican Peso"
    },
    e: {
        p: 1,
        d: 1,
        name: "Euro"
    }
}

const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];

class Data {
    dataWithKey() {
        let objCopy;
        return data.map((item) => {
            objCopy = Object.assign({}, item);
            objCopy.id = shortid.generate();
            objCopy.title = objCopy.title + " key generated";
            return objCopy;
        });
    }

    dataWithOutKey() {
        return data;
    }

    getProgLangs() {
        let obj;
        return progLanguages.map((item) => {
            obj = {};
            obj.id = shortid.generate();
            obj.name = item;
            return obj;
        });
    }

    getContactMethods() {
        return contactMethods;
    }

    getCurrencies() {
        return currencies;
    }

    /**
     * Get the value of currencies from remote api
     * @param {array} currenciesList - An array with the desired currencies keys
     * @return {object} The currencies values
     */
    getCurrenciesFromApi (currenciesList) {
        const url = ENDPOINTS.currencies + '?access_key=' + API_KEYS.currencies + '&currencies=' + currenciesList.join();
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', url);
            request.responseType = 'json';
            request.onload = () => {
                if (request.status === 200) {
                    let res = request.response;
                    if (!res.success) {
                        reject(Error('Something went wrong requesting API: ' + res.error.code + ' | ' + res.error.info));
                    }

                    const MXN = this.roundNumber(res.quotes.USDMXN);
                    const EUR = this.roundNumber(res.quotes.USDEUR);

                    currencies.d.p = this.roundNumber(MXN);
                    currencies.d.e = this.roundNumber(EUR);

                    currencies.p.d = this.roundNumber(1 / MXN);
                    currencies.p.e = this.roundNumber(EUR / MXN);

                    currencies.e.d = this.roundNumber(1 / EUR);
                    currencies.e.p = this.roundNumber(MXN / EUR);

                    resolve(currencies);
                } else {
                    reject(Error('It was not possible to get currencies values; error code:' + request.statusText));
                }
            };
            request.onerror = function() {
                reject(Error('There was a network error.'));
            };
            request.send();
        });

    }

    roundNumber(num) {
        return Math.round(num * 1000) / 1000;
    }

    getProducts() {
        return PRODUCTS;
    }
}

export default Data;