import React, {Component, Fragment} from 'react';
import Greeting from './Greeting';
import Button from './Button';

class LoginControl extends Component {
    constructor(props) {
        super(props);
        this.handleLogClick = this.handleLogClick.bind(this);
        this.state = {isLoggedIn: false}
    }

    handleLogClick() {
        this.setState({
            isLoggedIn: !this.state.isLoggedIn
        });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;

        button = <Button onClick={this.handleLogClick}>{isLoggedIn ? 'Click me to logout' : 'Click me to login'}</Button>;

        return (
            <Fragment>
                This is about conditional rendering and Composition vs Inheritance
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </Fragment>    
        );
    }
}

export default LoginControl;