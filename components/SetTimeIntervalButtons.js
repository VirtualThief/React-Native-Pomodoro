import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import CustomTimeIntervalInput from "./CustomTimeIntervalInput";

export default function SetTimeIntervalButtons({ setTimeInterval }) {
  const [modalVisible, setModalVisible] = useState(false);

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
      <View style={styles.buttonWrapper}>
        <Button title="Custom" onPress={() => setModalVisible(true)} />
      </View>
      <Modal
        isVisible={modalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={{ backgroundColor: "white" }}>
          <CustomTimeIntervalInput
            onCancelPress={() => setModalVisible(false)}
            onTimeSubmit={newTime => {
              setTimeInterval(newTime);
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
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
