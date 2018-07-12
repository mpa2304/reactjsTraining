import React, { Component } from 'react';
import ListItem from './ListItem';

class TodoList extends Component {
    render() {
        const list = this.props.data;
        const listItems = list.map((item, index) => {
            if (item.id) {
                return <ListItem key={item.id} data={item} />
            } else {
                return <ListItem key={index} data={item} />
            }
        });

        return (
            <div>
                <h2>{this.props.title}</h2>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default TodoList;
