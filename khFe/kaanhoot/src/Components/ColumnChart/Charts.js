import React, { Component } from 'react';
import './style.css'
import io from 'socket.io-client'
import Cookies from 'universal-cookie';
import { setTimeout } from 'timers';


const socket = io("http://localhost:5000/");
const cookies = new Cookies();
const axios = require('axios');

class Charts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            k: '',
            resultsUsernames: '',
        }
    }

    requestactiveUsers = () => {
        const resultsUsername = cookies.get('username')

        socket.emit('resultsRequest', resultsUsername)
        socket.on('resultsRequest2', (data) => {
            axios.post('http://localhost:8080/users/findMany2', { usernames: data }).then((data2) => {
                console.log(data2.data)
                console.log('data2')
                this.setState({
                    k: data2.data
                })
            })
            console.log(data)
            console.log('data')
        })
    }

    componentDidMount = () => {
        this.printOutColumns()
        this.requestactiveUsers()
        setTimeout(() => {
            socket.emit('cleanFornew', true)
            console.log('clean')
        }, 3000);
    }

    printOutColumns(event) {
        if (this.state.k.length > 0) {
            return this.state.k.map((data, index) =>
                <React.Fragment>
                    <div key={index} className="column">
                        <div key={index} style={{ height: data.point + '%' }} className="paint" >
                            {data.point}
                        </div>
                        <div className="users">
                            {data.username}
                        </div>
                    </div>
                </React.Fragment>
            )
        } else {
            return <div>Loading</div>
        }

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