import React, { Component } from 'react';
import './style.css'

class Charts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            k: [
                {
                    'username': 'kaan',
                    'puan': 20,
                    'socketid': 12431624314,
                },
                {
                    'username': 'Helin',
                    'puan': 0,
                    'socketid': 12431624314,
                },
                {
                    'username': 'mert',
                    'puan': 40,
                    'socketid': 12431624314,
                },
                {
                    'username': 'hakan',
                    'puan': 100,
                    'socketid': 12431624314,
                },
            ]
        }
    }
    componentDidMount = () => {
        this.printOutColumns()
    }

    printOutColumns(event) {
        console.log(this.state.k)
        return this.state.k.map((data, index) =>
            <div key={index} className="column">
                <div key={index} style={{ height: data.puan + '%' }} className="paint" >
                    {data.puan}
                </div>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.printOutColumns()}
            </React.Fragment>
        );
    }
}

export default Charts;