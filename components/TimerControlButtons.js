import React from "react";
import { View, Button } from "react-native";

function TimerControlButtons({
  startButtonVisible = true,
  startButtonDisabled,
  onStartButtonPress,
  stopButtonVisible = true,
  stopButtonDisabled,
  onStopButtonPress,
  resetButtonDisabled,
  onResetButtonPress
}) {
  return (
    <View>
      {startButtonVisible && (
        <View>
          <Button
            title="Start"
            disabled={startButtonDisabled}
            onPress={onStartButtonPress}
          />
        </View>
      )}
      {stopButtonVisible && (
        <View>
          <Button
            title="Stop"
            disabled={stopButtonDisabled}
            onPress={onStopButtonPress}
          />
        </View>
      )}
      <View>
        <Button
          title="Reset"
          disabled={resetButtonDisabled}
          onPress={onResetButtonPress}
        />
      </View>
    </View>
  );
}

export default TimerControlButtons;
