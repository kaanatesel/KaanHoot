import React , {Component}from 'react';

import './style.css'

// const Btn = React.forwardRef((props, ref) => (
//     <button {...props} className='btn'>
//     </button>
// ));
 
class GetReadBtn extends Component {
    render() {
        return (
            <button {...this.props} className='GetReadBtn'>
            </button>
        );
    }
}

export default GetReadBtn;