import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


//Components
import Btn from './Components/Btn/Btn'
import Input from './Components/Input'
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
    }
}


class MainPage extends Component {

    constructor(props) {
        super()
        this.state = {
            UserName: '',
        }
    }


    handleChangeUserName = (e) => {
        this.setState({
            UserName: e.target.value
        })
    }

    getUserName = () => {
        const UserName = this.state.UserName
        console.log(UserName)
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
                                KaanHoot
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
                    </Grid>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        );
    }
}

export default withStyles(Styles)(MainPage);