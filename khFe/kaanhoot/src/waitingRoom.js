import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import io from 'socket.io-client'

//components
import GetReadBtn from './Components/GetReadyBtn/GetReadyBtn'
import SendButton from './Components/SendButton/SendButton'
import Input from './Components/Input/index'

//const axios = require('axios');
const socket = io("http://localhost:5000/");

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
}

class Questions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ready: 'Are you ready ??',
            readystatus: 0,
            players: {},
            sendedChatMessage: '',
            recivedChatMessage: [],
        }
    }

    readyBtn = (event) => {
        if (this.state.readystatus === 0) {
            this.setState({
                ready: 'READY !!',
                readystatus: 1
            })
            event.target.style.backgroundColor = '#33cc33';
        } else {
            this.setState({
                ready: 'Are you ready ??',
                readystatus: 0,
            })
            event.target.style.backgroundColor = '#0066ff';
        }
        console.log(this.state.players.activeUsers.length)
    }


    getActive = () => {
        socket.on('username', (data) => {
            this.setState({
                players: data,
            })
        })
        // setTimeout(function () {
        //     console.log(this.state.players.activeUsers)
        // }.bind(this), 500)
    }

    listActiveUser = () => {
        if (this.state.players.activeUsers) {
            return this.state.players.activeUsers.map((player) =>
                <li key={player.id}>
                    {player.username}
                </li>
            );
        } else {
            return <div>Yükleniyor...</div>
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
            message: this.state.sendedChatMessage
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
            debugger;
            return this.state.recivedChatMessage.map((chat,index) =>
                <li key={index}>
                    {chat.message}
                </li>
            );
        } else {
            return <div>Nobody types...</div>
        }
    }

    componentDidMount() {
        this.getActive();
        this.getChatMessage();
    }


    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item className={classes.CenteredDiv} xs={6}>
                    <Grid container className={classes.root} spacing={8}>
                        <Grid item xs={12}>
                            <Typography variant="h3" className={classes.KaanHoot} gutterBottom>
                                KaaNHooT
                            </Typography>
                        </Grid>
                        <Grid item className={classes.activeUsers} xs={12}>
                            <Typography variant="h6" className={classes.headerActive}>
                                Active Users :
                            </Typography>
                        </Grid>
                        <Grid item className={classes.activeUsers} xs={12}>
                            <Typography variant="h6" className={classes.headerActive}>
                                {this.listActiveUser()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <GetReadBtn onClick={this.readyBtn}>
                                {this.state.ready}
                            </GetReadBtn>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.CenteredDiv} xs={6}>
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
                            <Grid container className={classes.root} spacing={8}>
                                <Grid item xs={10}>
                                    <Input
                                        onChange={this.handleChatMessage}
                                        value={this.state.sendedChatMessage}>
                                    </Input>
                                </Grid>
                                <Grid item xs={2}>
                                    <SendButton onClick={this.chat}></SendButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(Styles)(Questions);