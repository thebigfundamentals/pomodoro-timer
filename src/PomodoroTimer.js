import React, { Component } from 'react'
import './PomodoroTimer.css'

class PomodoroTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="PomodoroTimer">
                {this.props.remainingTime}
            </div>
        );
    }
}

export default PomodoroTimer;