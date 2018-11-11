import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//import { connect } from './api';
//import openSocket from 'socket-io';
import io from 'socket.io-client'

//components
import GetReadBtn from './Components/GetReadyBtn/GetReadyBtn'

//const axios = require('axios');

//const socket = openSocket('http://localhost:5000/');


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
        }
        // socket.on('chat', (message) => {
        //     console.log(message)
        // })
    }

    readyBtn = (event) => {
        if (this.state.readystatus === 0) {
            this.setState({
                ready: 'READY !!',
                readystatus: 1
            })
            event.target.style.backgroundColor = '#33cc33';
            // if(this.state.readystatus=== 0){
            console.log('redirect')
            // }else{
            //     console.log('aaaa')
            // }
        } else {
            this.setState({
                ready: 'Are you ready ??',
                readystatus: 0,
            })
            event.target.style.backgroundColor = '#0066ff';
        }
    }


    getActive = () => {
        const socket = io("http://localhost:5000/");

        let data = ' kaan'

        socket.emit('dd', data);
        
        socket.on('dd', (msg) => {
            console.log('bağlanı')
            console.log(msg)
        })

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
                            <Typography variant="subtitle1" className={classes.Activeusers}>
                                Kaan
                            </Typography>
                            <Typography variant="subtitle1" className={classes.Activeusers}>
                                Mert
                            </Typography>
                            <Typography variant="subtitle1" className={classes.Activeusers}>
                                Rıza
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