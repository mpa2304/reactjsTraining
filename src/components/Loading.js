import React, {Component} from 'react';
import loader from '../img/loader.svg';

class Loading extends Component {
    render() {
        return (
            <div>
                <img src={loader} alt="Loading" />
            </div>
        );
    }
}

export default Loading;