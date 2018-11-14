import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import io from 'socket.io-client'

//components
import GetReadBtn from './Components/GetReadyBtn/GetReadyBtn'

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
        marginTop: '15%',
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
    }


    getActive = () => {
        socket.on('username', (data) => {
            console.log(data)
            this.setState({
                players: data,
            })
        })
        setTimeout(function () {
            console.log(this.state.players.activeUsers)
        }.bind(this), 500)
    }

    listActiveUser = () => {
        if (this.state.players.activeUsers) {
            return this.state.players.activeUsers.map((players) =>
                <li key={players.id}>
                    {players.username}
                </li>
            );
        } else {
           return  <div>Yükleniyor...</div>
        }


    }

    componentDidMount() {
        this.getActive();
    }


    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={3}></Grid>
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
                <Grid item xs={3}></Grid>
            </Grid>
        );
    }
}

export default withStyles(Styles)(Questions);