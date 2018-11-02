import React from 'react';

import './style.css'

const Btn = React.forwardRef((props, ref) => (
    <button {...props} className='btn'>
    </button>
));
 
// class Btn extends Component {
//     render() {
//         return (
//             <button {...this.props} className='btn'>
//             </button>
//         );
//     }
// }

export default Btn;