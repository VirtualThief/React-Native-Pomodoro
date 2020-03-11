import React from "react";
import { View, Button, StyleSheet } from "react-native";

export default function SetTimeIntervalButtons({ setTimeInterval }) {
  return (
    <View style={styles.buttonRow}>
      <View style={styles.buttonWrapper}>
        <Button
          title="5 min"
          onPress={() => setTimeInterval?.(5 * 60 * 1000)}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="25 min"
          onPress={() => setTimeInterval?.(25 * 60 * 1000)}
        />
      </View>
      {/* <Button title="Custom" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row"
  },
  buttonWrapper: {
    flex: 1
  }
});
