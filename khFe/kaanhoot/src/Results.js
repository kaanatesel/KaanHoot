import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

//components
import Paper from './Components/Paper'
import MainChartDiv from './Components/ColumnChart/MainChartDiv'
import SendButton from './Components/SendButton/SendButton'
import Chart from './Components/ColumnChart/Charts'
import Users from './Components/ColumnChart/Users'

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
    mainMiddle: {
        marginTop: '15%',
    },
    paper: {
        backgroundColor: 'red',
    },
    root: {
        padding: "40px",
        maxWidth: "500px",
        margin: "auto",
        textAlign: "center",
    },
    newgameBtn:{
        marginTop:'50px',
    }
}

class MidResults extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    newgame = () => {
        this.props.history.push('/');
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container className={classes.root} spacing={8}>
                    <Grid item className={classes.mainMiddle} xs={12}>
                        <Paper className={classes.paper}>
                            <MainChartDiv chart={<Chart />} users={<Users user="kana" />} />
                            <div className={classes.newgameBtn}>
                                <SendButton onClick={this.newgame}>New Game</SendButton>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default withStyles(Styles)(MidResults);