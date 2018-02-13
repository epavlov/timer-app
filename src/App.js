import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      time: {},
      seconds: 0,
      h: 0,
      m: 0,
      s: 0
    };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.performCountdown = this.performCountdown.bind(this);
    this.updateHoursInput = this.updateHoursInput.bind(this);
    this.updateMinutesInput = this.updateMinutesInput.bind(this);
    this.updateSecondsInput = this.updateSecondsInput.bind(this);
  }

  componentDidMount() {
    let time = this.secondsToTime(this.state.seconds);
    this.setState({ time: time });
  }

  // Start timer
  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.performCountdown, 1000);
    }
  }

  // Stop timer, reset the clock
  stopTimer() {
    clearInterval(this.timer);

    // Reset values
    let totalSeconds = parseInt(this.state.h * 3600) + parseInt(this.state.m * 60) + parseInt(this.state.s);
    this.timer = 0;
    this.setState({
      time: this.secondsToTime(totalSeconds),
      seconds: totalSeconds,
    });
  }

  // Perform countdown and update state
  performCountdown() {
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });

      // If no seconds left, stop timer
      if (seconds === 0) {
        clearInterval(this.timer);
      }
    }

  // Convert given seconds to time object
  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divForMin = secs % (60 * 60);
    let minutes = Math.floor(divForMin / 60);

    let divForSec = divForMin % 60;
    let seconds = Math.ceil(divForSec);

    let timeObject = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return timeObject;
  }

  // Handle hour input change
  updateHoursInput(event) {
    // 1 hour is 3600 seconds
    let totalSeconds = parseInt(event.target.value * 3600) + parseInt(this.state.m * 60) + parseInt(this.state.s);

    this.setState({
      time: this.secondsToTime(totalSeconds),
      h: event.target.value,
      seconds: totalSeconds,
    });
  }

  // Handle minute input change
  updateMinutesInput(event) {
    // 1 minute is 60 seconds
    let totalSeconds = parseInt(this.state.h * 3600) + parseInt(event.target.value * 60) + parseInt(this.state.s);

    this.setState({
      time: this.secondsToTime(totalSeconds),
      m: event.target.value,
      seconds: totalSeconds,
    });
  }

  // Handle second input change
  updateSecondsInput(event) {
    let totalSeconds = parseInt(this.state.h * 3600) + parseInt(this.state.m * 60) + parseInt(event.target.value);

    this.setState({
      time: this.secondsToTime(totalSeconds),
      s: event.target.value,
      seconds: totalSeconds,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="timer-wrapper">{this.state.time.h}:{this.state.time.m}:{this.state.time.s}</div>
        </header>
        <fieldset>
          <legend>Countdown</legend>
          <label htmlFor="hoursInput">Hour</label>
          <input id="hoursInput" type="number" min="0" max="24" onChange={this.updateHoursInput}/>

          <label htmlFor="minutesInput">Minute</label>
          <input id="minutesInput" type="number" min="0" max="60" onChange={this.updateMinutesInput} />

          <label htmlFor="secondsInput">Second</label>
          <input id="secondsInput" type="number" min="0" max="60" onChange={this.updateSecondsInput} />

          <input type="button" value="Start" onClick={this.startTimer} />
          <input type="button" value="Clear" onClick={this.stopTimer} />
        </fieldset>
      </div>
    );
  }


}

export default App;
