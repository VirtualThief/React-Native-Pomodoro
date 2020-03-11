import React, { Component } from "react";
import { StyleSheet, View, Vibration } from "react-native";
import Constants from "expo-constants";

import Timer from "./Timer";
import TimerControlButtons from "./TimerControlButtons";
import SetTimeIntervalButtons from "./SetTimeIntervalButtons";

export default class PomodoroApp extends Component {
  state = {
    selectedInterval: 25 * 60 * 1000,
    currentRemainingTime: 0,
    endTime: null
  };

  shouldVibrate = false;

  componentDidMount() {
    this.resetTimer();

    // Set interval to check the timer state.
    this.intervalId = setInterval(() => this.tickTimer(), 500);
  }

  componentDidUpdate() {
    this.vibrateIfNeeded();
  }

  componentWillUnmount() {
    // Clear timer check interval.
    clearInterval(this.intervalId);
  }

  render() {
    const { currentRemainingTime } = this.state;
    const timerStopped = this.state.endTime === null;

    return (
      <View style={styles.container}>
        <SetTimeIntervalButtons
          setTimeInterval={interval => this.setTimeInterval(interval)}
        />
        <Timer remainingTime={currentRemainingTime} />
        <TimerControlButtons
          startButtonVisible={timerStopped}
          startButtonDisabled={!timerStopped}
          onStartButtonPress={() => this.startTimer()}
          stopButtonVisible={!timerStopped}
          stopButtonDisabled={timerStopped}
          onStopButtonPress={() => this.stopTimer()}
          onResetButtonPress={() => this.resetTimer()}
        />
      </View>
    );
  }

  tickTimer() {
    const { endTime } = this.state;
    if (endTime !== null) {
      // If timer elapsed, then stop the countdown and vibrate.
      if (this.getRemainingTime(endTime) <= 0) {
        this.stopTimer();
        this.shouldVibrate = true;
      }

      // Update the remaining time.
      this.setState(_ => ({
        currentRemainingTime: this.getRemainingTime(endTime)
      }));
    }
  }

  getRemainingTime(endTime) {
    return Math.max(endTime - new Date().getTime(), 0);
  }

  startTimer() {
    const { currentRemainingTime } = this.state;

    // If timer is on zero, then reset duration.
    if (currentRemainingTime <= 0) {
      this.resetTimer();
    }

    this.setState(prevState => ({
      endTime: new Date().getTime() + prevState.currentRemainingTime
    }));
  }

  stopTimer() {
    this.setState(prevState => ({
      endTime: null,
      currentRemainingTime: this.getRemainingTime(prevState.endTime)
    }));
  }

  resetTimer() {
    this.stopTimer();
    this.setState(prevState => ({
      currentRemainingTime: prevState.selectedInterval
    }));
  }

  setTimeInterval(interval) {
    this.setState(prevState => ({
      selectedInterval: interval,
      currentRemainingTime:
        prevState.endTime === null ? interval : prevState.currentRemainingTime
    }));
  }

  vibrateIfNeeded() {
    if (this.shouldVibrate === true) {
      Vibration.vibrate(300);
      this.shouldVibrate = false;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1
  }
});
