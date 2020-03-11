import React from "react";
import { Text, StyleSheet } from "react-native";
import format from "format-duration";

function Timer({ remainingTime }) {
  const remainingTimeText = format(remainingTime);
  return <Text style={styles.timer}>{remainingTimeText}</Text>;
}

const styles = StyleSheet.create({
  timer: { alignSelf: "center", fontSize: 30, padding: 20 }
});

export default Timer;
