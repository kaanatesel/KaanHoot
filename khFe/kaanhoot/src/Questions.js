import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Cookies from 'universal-cookie';

//Components
import AnswerButtonA from './Components/AnswerBtn/AnswerBtnA'
import AnswerButtonB from './Components/AnswerBtn/AnswerBtnB'
import AnswerButtonC from './Components/AnswerBtn/AnswerBtnC'
import AnswerButtonD from './Components/AnswerBtn/AnswerBtnD'

const axios = require('axios');
const cookies = new Cookies();

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
        margin: "auto",
        textAlign: 'center',
        padding: '40px',
        maxWidth: '500px',
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
            correctAnswer: '',
            theUsers: {},
            currentCount: 5,
            redirectQuestion: 2,
            trueAnswers: 0,
            wrongAnswers: 0,
            disabled: false,
        }
        this.checkAnswer = this.checkAnswer.bind(this);
    }
    componentDidMount() {
        this.getQuestions();
        this.getTheUser();
        this.timerID = setInterval(() => this.timer(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    getTheUser() {
        axios.post('http://localhost:8080/users/findByUserName/', {
            username: cookies.get('username')
        }).then((response) => {
            console.log(response)
            console.log('ajax reponse')
        })
    }


    getQuestionPagaData() {
        console.log(this.state.theUsers)
    }

    getQuestions() {

        axios.get('http://localhost:8080/questions/getOneQuestion/' + 1).then((data) => {
            console.log(data.data.answers[0])
            this.setState({
                question: data.data.question,
                answerA: data.data.answers[0].A,
                answerB: data.data.answers[0].B,
                answerC: data.data.answers[0].C,
                answerD: data.data.answers[0].D,
                correctAnswer: data.data.correctAnswer,
            })
        })
        console.log('done')
    }

    checkAnswer(e) {
        this.setState({
            disabled: true,
        })
        console.log('click')
        if (e.target.id === this.state.correctAnswer) {
            this.setState({
                trueAnswers: this.state.trueAnswers + 1
            })
        } else {
            this.setState({
                wrongAnswers: this.state.wrongAnswers + 1
            })
        }
    }

    timer() {
        if (this.state.currentCount === 0) {
            if (this.state.redirectQuestion <= 5) {
                axios.get('http://localhost:8080/questions/getOneQuestion/' + this.state.redirectQuestion).then((data) => {
                    this.setState({
                        question: data.data.question,
                        answerA: data.data.answers[0].A,
                        answerB: data.data.answers[0].B,
                        answerC: data.data.answers[0].C,
                        answerD: data.data.answers[0].D,
                        correctAnswer: data.data.correctAnswer,
                    })
                })
                console.log('new question')
                this.setState({
                    redirectQuestion: this.state.redirectQuestion + 1,
                    currentCount: 5,
                    disabled: false,
                })
            } else {
                console.log(this.state.trueAnswers)
                console.log(this.state.wrongAnswers)
                const correctAnswers = this.state.trueAnswers * 10
                const wrongAnswers = this.state.wrongAnswers * 5
                const totalPoint = correctAnswers - wrongAnswers

                console.log(totalPoint)

                axios.put('http://localhost:8080/users/resultUpdata', {
                    username: cookies.get('username'),
                    point: totalPoint
                })

                this.props.history.push('/results');

            }
        } else {
            const newCount = this.state.currentCount - 1
            this.setState({
                currentCount: newCount
            })
        }
    }




    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.root} spacing={16}>
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
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={10}>
                        <Typography variant="h5" component="h3">
                            {this.state.currentCount}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <AnswerButtonA id="A"
                        disabled={this.state.disabled}
                        onClick={this.checkAnswer}>
                        {this.state.answerA}
                    </AnswerButtonA>
                    <AnswerButtonC id="C"
                        disabled={this.state.disabled}
                        onClick={this.checkAnswer}>
                        {this.state.answerC}
                    </AnswerButtonC>
                </Grid>
                <Grid item xs={12} >
                    <AnswerButtonB id="B"
                        disabled={this.state.disabled}
                        onClick={this.checkAnswer}>
                        {this.state.answerB}
                    </AnswerButtonB>
                    <AnswerButtonD id="D"
                        disabled={this.state.disabled}
                        onClick={this.checkAnswer}>
                        {this.state.answerD}
                    </AnswerButtonD>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(Styles)(Questions);