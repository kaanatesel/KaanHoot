import React, { Component } from 'react';
import './style.css'


class AnswerButton extends Component {
    render() {
        return (
            <button {...this.props} className='AnswerBtnA'></button>
        );
    }
}

export default AnswerButton;