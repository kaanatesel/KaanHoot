import React from 'react';
import './style.css'


const Input = React.forwardRef((props, ref) => (
    <textarea {...props} className='Input'></textarea>
));

// class Input extends Component {
//     render() {
//         return (
//             <textarea {...this.props} className='Input'></textarea>
//         );
//     }
// }

export default Input;