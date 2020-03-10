import React from "react";
import { Text, StyleSheet } from "react-native";

function Timer({ remainingTime }) {
  const remainingTimeAsDate = new Date(remainingTime);
  const remainingTimeText = `${remainingTimeAsDate.getMinutes()}:${remainingTimeAsDate.getSeconds() +
    (remainingTimeAsDate.getMilliseconds() > 0 ? 1 : 0)}`;
  return <Text style={styles.timer}>{remainingTimeText}</Text>;
}

const styles = StyleSheet.create({
  timer: { alignSelf: "center", fontSize: 30, padding: 20 }
});

export default Timer;
