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

let i = 0;


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
            correctAnswer: ''
        }
        this.checkAnswer = this.checkAnswer.bind(this);
    }


    getQuestions() {
        axios.get('http://localhost:8080/questions/questions').then((data) => {
            this.setState({
                question: data.data[i].question,
                answerA: data.data[i].answers[0].A,
                answerB: data.data[i].answers[1].B,
                answerC: data.data[i].answers[2].C,
                answerD: data.data[i].answers[3].D,
                correctAnswer: data.data[i].correctAnswer,
            })
            // console.log(this.state.correctAnswer)
        })
    }

    checkAnswer(e) {

        axios.get('http://localhost:8080/questions/questions').then((data) => {
            i++
                this.setState({
                    question: data.data[i].question,
                    answerA: data.data[i].answers[0].A,
                    answerB: data.data[i].answers[1].B,
                    answerC: data.data[i].answers[2].C,
                    answerD: data.data[i].answers[3].D,
                    correctAnswer: data.data[i].correctAnswer,
                })
            console.log(this.state.correctAnswer)
        })
    }

    componentDidMount() {
        this.getQuestions();
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
                                        {this.state.question}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item></Grid>
                        </Grid>
                        <Grid item xs={12} >
                            <AnswerButtonA id="A"
                                onClick={this.checkAnswer}>
                                {this.state.answerA}
                            </AnswerButtonA>
                            <AnswerButtonC id="C"
                                onClick={this.checkAnswer}>
                                {this.state.answerC}
                            </AnswerButtonC>
                        </Grid>
                        <Grid item xs={12} >
                            <AnswerButtonB id="B"
                                onClick={this.checkAnswer}>
                                {this.state.answerB}
                            </AnswerButtonB>
                            <AnswerButtonD id="D"
                                onClick={this.checkAnswer}>
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