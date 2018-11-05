import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


//Components
import AnswerButtonA from './Components/AnswerBtn/AnswerBtnA'
import AnswerButtonB from './Components/AnswerBtn/AnswerBtnB'
import AnswerButtonC from './Components/AnswerBtn/AnswerBtnC'
import AnswerButtonD from './Components/AnswerBtn/AnswerBtnD'


const axios = require('axios');

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
    root: {
        textAlign: 'center;'
    }
}



class Questions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            UserName: '',
            Error: '',
            question: '',
            answerA: '',
            answerB: '',
            answerC: '',
            answerD: '',
        }
    }

    getQuestions() {
        axios.get('http://localhost:8080/questions/questions').then((data) => {
            this.setState({
                question: data.data[0].question,
                answerA: data.data[0].answers[0].A,
                answerB: data.data[0].answers[1].B,
                answerC: data.data[0].answers[2].C,
                answerD: data.data[0].answers[3].D,
            })
          //  console.log(data.data[0].answers[3].D)
        })
    }


    render() {
        const { classes } = this.props;
  //     {this.getQuestions()}
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
                                        {this.state.question}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item></Grid>
                        </Grid>
                        <Grid item xs={12} >
                            <AnswerButtonA>
                                {this.state.answerA}
                            </AnswerButtonA>
                            <AnswerButtonC>
                                {this.state.answerC}
                            </AnswerButtonC>
                        </Grid>
                        <Grid item xs={12} >
                            <AnswerButtonB>
                                {this.state.answerB}
                            </AnswerButtonB>
                            <AnswerButtonD>
                                {this.state.answerD}
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