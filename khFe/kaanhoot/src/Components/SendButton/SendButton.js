import React , { Component } from 'react';

import './style.css'

// const SendButton = React.forwardRef((props, ref) => (
//     <button {...props} className='btn'>
//     </button>
// ));

class SendButton extends Component {
    render() {
        return (
            <button {...this.props} className='SendButton'>
                
            </button>
        );
    }
}

export default SendButton;