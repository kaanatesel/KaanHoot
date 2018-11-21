import React, { Component } from 'react';
import './style.css'

class MainChartDiv extends Component {
    render() {
        return (
            <div className="mainDiv">
                <div className="charts">
                    {this.props.chart}
                </div>
                <div className="users">
                    {this.props.users}
                </div>
            </div>
        );
    }
}

export default MainChartDiv;