import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

//components
import Paper from './Components/Paper'
import MainChartDiv from './Components/ColumnChart/MainChartDiv'
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
}

class MidResults extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item xs></Grid>
                    <Grid item className={classes.mainMiddle} xs={6}>
                        <Paper className={classes.paper}>
                            <MainChartDiv chart={<Chart />} users={<Users user="kana" />} />
                        </Paper>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>

            </div>
        );
    }
}

export default withStyles(Styles)(MidResults);