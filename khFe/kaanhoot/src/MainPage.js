import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Cookies from 'universal-cookie';
import io from 'socket.io-client'

//Components
import Btn from './Components/Btn/Btn'
import Input from './Components/Input'

const axios = require('axios');

const socket = io("http://localhost:5000/");
const cookies = new Cookies();

cookies.set('auth', false, { path: '/' });
cookies.set('username', '', { path: '/' });

const palette = {
    types: {
        backgroundCOLOR: {
            background: {
                default: "#503041"
            }
        },
    }
};
const theme = createMuiTheme({ palette });

const Styles = {
    '@global': {
        body: {
            background: theme.palette.types.backgroundCOLOR.background.default,
        }
    },
    CenteredDiv: {
        marginTop: '15%',
        textAlign: 'center',
    },
    KaanHoot: {
        color: '#fff',
        letterSpacing: '10px',
    },
    Error: {
        color: 'red',
        fontWeight: 'bold',
    },
    root: {
        textAlign: "center",
        margin: "auto,",
        padding:'35px',
        paddingTop:'70px',
    }
}


class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserName: '',
            Error: "",
            a: '',
        }
        //  this.disable = this.disable.bind(this);
    }



    handleChangeUserName = (e) => {
        this.setState({
            UserName: e.target.value
        })
    }

    getUserName = () => {
        const { UserName } = this.state;
        if (!UserName || UserName === '' || UserName === null) {
            this.setState({ Error: 'NO name NO game' })
        } else {

            axios.post('http://localhost:8080/users/newUser', {
                UserName: this.state.UserName
            }).then((response) => {
                if (!response.data.status) {
                    this.setState({
                        Error: 'This username is taken .'
                    })
                } else {
                    cookies.set('auth', true, { path: '/' });
                    cookies.set('username', this.state.UserName, { path: '/' });
                    let data = {
                        username: this.state.UserName,
                        id: socket.id
                    }
                    let data2 = {
                        username: this.state.UserName,
                    }
                    socket.emit('newEntry', data2)
                    socket.emit('username', data)

                    this.setState({
                        Error: '',
                    }, () => {
                        this.props.history.push('/waitingRoom');
                    })



                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    // disable(){
    //     console.log('click!')
    //    this.setState({
    //        a:true
    //    })

    // }

    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Typography variant="h3" className={classes.KaanHoot} gutterBottom>
                        KaaNHooT
                            </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Input
                        onChange={this.handleChangeUserName}
                        placeholder="...UserName"
                        value={this.state.UserName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Btn onClick={this.getUserName}>
                        Join The Room
                            </Btn>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" className={classes.Error} gutterBottom>
                        {this.state.Error}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(Styles)(MainPage);