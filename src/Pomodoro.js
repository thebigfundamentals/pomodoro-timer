import React, { Component } from 'react'
import PomodoroTimer from './PomodoroTimer';
import './Pomodoro.css';

class Pomodoro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cycle: 1,
            round: 1,
            remainingTime: 25 * 60,
            interval: null,
            isBreak: false,
            isBigBreak: false,
            isPaused: true
        }
    };
    bgColor = () => {
        if (this.state.isBreak) { return 'break' };
        if (this.state.isBigBreak) { return 'big-break' };
    };
    buttonColor = () => {
        if (this.state.isBreak) { return 'btn-outline-info' };
        if (this.state.isBigBreak) { return 'btn-outline-success' };
        return 'btn-outline-danger'
    };
    buttonState = () => (this.state.isPaused ? `Start` : `Pause`);
    renderTitle = () => {
        if (this.state.cycle === 1 && this.state.round === 1 && !this.state.isBreak && !this.state.isBigBreak) {
            return `Pomodoro 🍅`
        }
        if (!this.state.isBreak && !this.state.isBigBreak && (this.state.round !== 1 || this.state.cycle !== 1)) {
            return `Time to work 💪`
        }
        if (this.state.isBreak) {
            return `Take five 💆‍♀️💆‍♂️`
        }
        if (this.state.isBigBreak) {
            return `Good work! Cycle ${this.state.cycle} is done, have some coffee ☕`
        }
    }
    timerDisplay = () => {
        const minutes = Math.floor(this.state.remainingTime / 60);
        const seconds = this.state.remainingTime % 60;

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    };
    startTimer = () => {
        if (this.state.remainingTime === 0) return;
        this.setState(
            {
                isPaused: false,
                interval:
                    setInterval(() => {
                        this.setState((st) => {
                            st.remainingTime--;
                            return { remainingTime: st.remainingTime }
                        });

                        if (this.state.remainingTime === 0) {
                            this.stopTimer();
                        }
                    }, 1000)
            })
    };
    stopTimer = () => {
        clearInterval(this.state.interval);
        this.setState({ interval: null, isPaused: true });

        if (this.state.remainingTime === 0) {
            this.handleTransition()
        }

    };
    handleStartPause = () => (this.state.isPaused ? this.startTimer() : this.stopTimer());
    handleForward = () => {
        this.stopTimer();
        this.handleTransition();
    }
    handleTransition = () => {
        if (this.state.isBreak) {
            return this.setState(st => (
                {
                    round: ++st.round,
                    isBreak: false,
                    remainingTime: 25 * 60
                }))
        };
        if (this.state.isBigBreak) {
            return this.setState(st => (
                {
                    round: 1,
                    cycle: ++st.cycle,
                    isBigBreak: false,
                    remainingTime: 25 * 60
                }))
        };
        if (this.state.round !== 4) {
            this.setState(st => (
                {
                    isBreak: true,
                    remainingTime: 5 * 60
                }
            ))
        } else {
            this.setState(st => (
                {
                    isBigBreak: true,
                    remainingTime: 15 * 60
                }
            ))
        }
    }
    render() {
        return (
            <div className={`Pomodoro ${this.bgColor()}`}>
                <div className="Pomodoro-Title">
                    <h1>{this.renderTitle()}</h1>
                </div>
                <div className="Pomodoro-Container">
                    <div className="Pomodoro-Counters d-flex justify-content-around mb-2">
                        <span>Cycle: {this.state.cycle}</span>
                        <span>Round: {this.state.round}</span>
                    </div>
                    <div className="Pomodoro-TimerBox">
                        <PomodoroTimer remainingTime={this.timerDisplay()} />
                    </div>
                    <div className="Pomodoro-Credit">
                        <p>by thebigfundamentals</p>
                    </div>
                    <div className="Pomodoro-Handlers mt-2">
                        <button type="button"
                            className={`btn btn-lg me-3 ${this.buttonColor()}`}
                            onClick={this.handleStartPause}
                        >{this.buttonState()}</button>
                        <i
                            className="fas fa-step-forward"
                            onClick={this.handleForward}
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default Pomodoro;