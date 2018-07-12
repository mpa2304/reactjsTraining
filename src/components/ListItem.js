import React, { Component } from 'react';

class ListItem extends Component {
    render() {
        return (
            <li>
                {this.props.data.title}: <em> {this.props.data.comment} </em>
            </li>
        );
    }
}

export default ListItem;


