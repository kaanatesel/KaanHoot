import React, { Component } from 'react';
import './style.css'

class Users extends Component {
    render() {
        return (
            <>
                <div className="user"><h3>{this.props.user}</h3></div>
                <div className="user"><h3>{this.props.user}</h3></div>
                <div className="user"><h3>{this.props.user}</h3></div>
            </>
        );
    }
}

export default Users;