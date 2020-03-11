import React from "react";
import { Text, StyleSheet } from "react-native";

function Timer({ remainingTime }) {
  const remainingTimeAsDate = new Date(remainingTime);
  // TODO Format using https://www.npmjs.com/package/format-duration
  const remainingTimeText = `${remainingTimeAsDate.getMinutes()}:${remainingTimeAsDate.getSeconds()}`;
  return <Text style={styles.timer}>{remainingTimeText}</Text>;
}

const styles = StyleSheet.create({
  timer: { alignSelf: "center", fontSize: 30, padding: 20 }
});

export default Timer;
