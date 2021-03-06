import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import io from 'socket.io-client'
import Cookies from 'universal-cookie';

//components
import GetReadBtn from './Components/GetReadyBtn/GetReadyBtn'
import SendButton from './Components/SendButton/SendButton'
import Input from './Components/Input/index'
import Send from '@material-ui/icons/Send';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
//const axios = require('axios');
const socket = io("http://localhost:5000/");
const cookies = new Cookies();


//VALIABLES

const palette = {
    types: {
        backgroundCOLOR: {
            background: {
                default: "#503041"
            }
        },
    },

};
const theme = createMuiTheme({ palette });

const Styles = {
    '@global': {
        body: {
            background: theme.palette.types.backgroundCOLOR.background.default,
        }
    },
    activeUsers: {
        margin: '20px',
        width: '100%',
        backgroundColor: '#8f5675',
        borderRadius: '10px',
        float: 'left',
    },
    UsersTypog: {
        color: '#fff',
        marginLeft: '50px',
        marginTop: '20px',
    },
    headerActive: {
        color: '#fff',
        float: 'left',
        letterSpacing: '2px',
    },
    Activeusers: {
        color: '#fff',
        letterSpacing: '2px',
        textAlign: 'left',
        margin: '5px',
    },
    KaanHoot: {
        textAlgin: 'center',
        color: '#fff',
        letterSpacing: '10px',
    },
    CenteredDiv: {
        marginTop: '10%',
        textAlign: 'center',
    },
    root: {
        maxWidth: '500px',
        textAlign: 'center',
        padding: "40px",
        margin: "auto",
    }
}
let thisUser = ''
class Questions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ready: 'Are you ready ??',
            readystatus: 0,
            players: '',
            sendedChatMessage: '',
            recivedChatMessage: [],
            redirect: false,
            users: {}
        }
    }

    componentDidMount() {
        this.socketIdSet()
        this.getActive();
        this.getChatMessage();
        this.redirect()
    }


    socketIdSet() {
        thisUser = cookies.get('username')
        socket.on('users', (data) => {
            this.setState({
                users: data
            })
        })



    }

    readyBtn = (event) => {

        if (this.state.readystatus === 0) {
            this.setState({
                ready: 'READY !!',
                readystatus: 1,
            })

            const status = true
            socket.emit('ready', status)
            socket.on('ready', (data) => {
                console.log(data)
            })
            event.target.style.backgroundColor = '#33cc33';
        } else {
            this.setState({
                ready: 'Are you ready ??',
                readystatus: 0,
            })

            const status = false
            socket.emit('ready', status)

            event.target.style.backgroundColor = '#0066ff';
        }
    }

    redirect = () => {
        socket.on('ready', (data) => {
            if (data) {
                this.props.history.push('/questions')
            } else { }
        })
    }

    getActive = () => {
        socket.on('username', (data) => {
            this.setState({
                players: data,
            })
        })

    }

    listActiveUser = () => {
        if (this.state.players) {
            return this.state.players.map((player) =>
                <p>{player.username}</p>
            )

        } else {
            return <p>No users</p>
        }
    }

    handleChatMessage = (e) => {
        this.setState({
            sendedChatMessage: e.target.value
        })
    }

    chat = () => {
        this.setState({
            sendedChatMessage: '',
        })
        const msg = {
            message: this.state.sendedChatMessage,
            thisuserinfo: this.state.users[thisUser]
        }
        socket.emit('chat', msg)
    }

    getChatMessage = () => {
        socket.on('chat', (messages) => {
            this.setState({
                recivedChatMessage: messages,
            })
        })
    }

    displayChatMessage = () => {
        if (this.state.recivedChatMessage.length > 0) {
            return this.state.recivedChatMessage.map((chat, index) =>
                <div key={index}>
                    <p>
                        {chat.thisuserinfo.username}: {chat.message}
                    </p>
                </div>
            );
        } else {
            return <div>Enter Chat</div>
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid container className={classes.root2} spacing={8}>
                    <Grid item xs={12}>
                        <Typography variant="h3" className={classes.KaanHoot} gutterBottom>
                            KaaNHooT
                            </Typography>
                    </Grid>
                    <Grid item className={classes.activeUsers} xs={12}>
                        <Typography variant="h6" className={classes.headerActive}>
                            Active Users :
                                {this.listActiveUser()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <GetReadBtn onClick={this.readyBtn}>
                            {this.state.ready}
                        </GetReadBtn>
                    </Grid>
                </Grid>
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Typography variant="h3" className={classes.KaanHoot} gutterBottom>
                            Chat
                            </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.headerActive}>
                            {this.displayChatMessage()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container className={classes.root2} spacing={8}>
                            <Grid item xs={8}>
                                <Input
                                    onChange={this.handleChatMessage}
                                    value={this.state.sendedChatMessage}>
                                </Input>
                            </Grid>
                            <Grid item xs={4}>
                                <SendButton onClick={this.chat}><Send /></SendButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(Styles)(Questions);