import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Cookies from 'universal-cookie';

//Components
import Btn from './Components/Btn/Btn'
import Input from './Components/Input'

const axios = require('axios');

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
    }
}


class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserName: '',
            Error: "",
        }
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
                console.log(response.data)
                if (!response.data.status) {
                    this.setState({
                        Error: 'This username is taken .'
                    })
                } else {
                    this.setState({
                        Error: '',
                    }, () => {
                        this.props.history.push('/questions');
                    })
                    const cookies = new Cookies();
                    cookies.remove('auth')
                    cookies.set('auth', 'true', { path: '/' });
                    console.log(cookies.get('auth'));
                }
            }).catch((err) => {
                console.log(err)
            })
        }
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
                        <Grid item xs={12}>
                            <Input
                                onChange={this.handleChangeUserName}
                                placeholder="...UserName"
                                value={this.state.UserName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Btn onClick={this.getUserName}>
                                Join The Game
                            </Btn>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" className={classes.Error} gutterBottom>
                                {this.state.Error}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        );
    }
}

export default withStyles(Styles)(MainPage);