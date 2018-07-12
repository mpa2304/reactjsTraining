import React, {Component} from 'react';

class Greeting extends Component {
    render() {
    const isLoggedIn = !!this.props.isLoggedIn;
        return (
            <h1>Hello, {isLoggedIn ? 'you are logged in!': 'you are not logged in'}</h1>
        );
    }
}

export default Greeting;


