import React, { Component } from 'react';
import './style.css'


class AnswerButton extends Component {
    render() {
        return (
            <button {...this.props} className='AnswerBtnB'></button>
        );
    }
}

export default AnswerButton;