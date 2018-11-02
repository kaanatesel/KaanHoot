import React, { Component } from 'react';
import './style.css'


class AnswerButton extends Component {
    render() {
        return (
            <button {...this.props} className='AnswerBtnA'>AnswerBtn</button>
        );
    }
}

export default AnswerButton;