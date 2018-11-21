import React from 'react';
import './style.css'

const index = React.forwardRef((props, ref) => (
    <div {...props} className="paper"></div>
));

// class index extends Component {
//     render() {
//         return (
//             <div  {...this.props} className="paper">

//             </div>
//         );
//     }
// }

export default index; 