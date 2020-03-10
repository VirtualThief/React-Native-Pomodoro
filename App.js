import React, { Component } from "react";
import { StyleSheet, View, Button, Vibration } from "react-native";
import Constants from "expo-constants";

import Timer from "./components/Timer";

function ControlButtons({ startButtonDisabled, onStartButtonPress }) {
  return (
    <View>
      <View>
        <Button
          title="Start"
          disabled={startButtonDisabled}
          onPress={onStartButtonPress}
        />
      </View>
      <View>
        <Button title="Stop" />
      </View>
      <View>
        <Button title="Reset" />
      </View>
    </View>
  );
}

function SetTimeIntervalButtons() {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1 / 2 }}>
        <Button title="5 min" />
      </View>
      <View style={{ flex: 1 / 2 }}>
        <Button title="25 min" />
      </View>
      {/* <Button title="Custom" /> */}
    </View>
  );
}

export default class App extends Component {
  state = {
    endTime: null
  };

  timeInterval = 0.25;
  shouldVibrate = false;

  componentDidMount() {
    this.interval = setInterval(() => this.tickTimer(), 500);
  }

  componentDidUpdate() {
    if (this.shouldVibrate === true) {
      Vibration.vibrate(300);
      this.shouldVibrate = false;
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { endTime } = this.state;
    let remainingTime = this.timeInterval * 60 * 1000;
    if (endTime !== null) {
      remainingTime = endTime - new Date().getTime();
    }

    return (
      <View style={styles.container}>
        <SetTimeIntervalButtons />
        <Timer remainingTime={remainingTime} />
        <ControlButtons
          startButtonDisabled={this.state.endTime !== null}
          onStartButtonPress={() =>
            this.setState({
              endTime: new Date().getTime() + this.timeInterval * 60 * 1000
            })
          }
        />
      </View>
    );
  }

  tickTimer() {
    const { endTime } = this.state;
    if (endTime !== null) {
      if (endTime - new Date().getTime() < 0) {
        this.setState({ endTime: null });
        this.shouldVibrate = true;
      }

      this.forceUpdate();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1
  }
});
