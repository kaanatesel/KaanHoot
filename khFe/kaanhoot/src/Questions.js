import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


//Components
import Input from './Components/Input'
import AnswerButtonA from './Components/AnswerBtn/AnswerBtnA'
import AnswerButtonB from './Components/AnswerBtn/AnswerBtnB'
import AnswerButtonC from './Components/AnswerBtn/AnswerBtnC'
import AnswerButtonD from './Components/AnswerBtn/AnswerBtnD'



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
    CenteredDiv: {
        marginTop: '10%',
        textAlign: 'center',
    },
    KaanHoot: {
        color: '#fff',
        letterSpacing: '10px',
    },
    AnswerButtons: {
        margin: '10px',
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
      },
    root:{
        textAlign:'center;'
    }
}


class Questions extends Component {

    constructor(props) {
        super()
        this.state = {
            UserName: '',
            Error: '',
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
                            <Typography variant="h4" className={classes.KaanHoot}>
                                Questions
                           </Typography>
                        </Grid>
                        <Grid container className={classes.root} spacing={16}>
                        <Grid item></Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper} elevation={10}>
                                <Typography variant="h5" component="h3">
                                    This is a sheet of paper.
                                </Typography>
                                <Typography component="p">
                                    Paper can be used to build surface or other elements for your application.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item></Grid>
                        </Grid>
                        <Grid item xs={12} >
                            <AnswerButtonA></AnswerButtonA>
                            <AnswerButtonC></AnswerButtonC>
                        </Grid>
                        <Grid item xs={12} >
                            <AnswerButtonB>
                            <Typography component="p">
                                    Paper can be used to build surface or other elements for your application.
                                </Typography>
                            </AnswerButtonB>
                            <AnswerButtonD>
                            <Typography component="p">
                                    Paper can be used to build surface or other elements for your application.
                                </Typography>
                            </AnswerButtonD>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        );
    }
}

export default withStyles(Styles)(Questions);