import React, { Component } from 'react';
import './style.css'


class AnswerButtonC extends Component {
    render() {
        return (
            <button {...this.props} className='AnswerBtnC'>AnswerBtn</button>
        );
    }
}

export default AnswerButtonC;