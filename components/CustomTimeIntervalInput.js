import React, { useState } from "react";
import { Text, TextInput, Button } from "react-native";

export default function CustomTimeIntervalInput({
  onCancelPress,
  onTimeSubmit
}) {
  const [textValue, setTextValue] = useState("00:00");

  const submitTimeInterval = () => {
    const parts = textValue.split(":");

    // Verify that time interval consists of two numbers divided with colon.
    if (parts.length !== 2) return;

    const [m, s] = parts;
    const mn = Number(m);
    const sn = Number(s);

    if (isNaN(mn) || mn < 0) return;
    if (isNaN(sn) || sn < 0 || sn > 59) return;

    const newTime = mn * 60 * 1000 + sn * 1000;

    onTimeSubmit?.(newTime);
  };

  return (
    <>
      <Text>Input time interval</Text>
      <TextInput
        value={textValue}
        onChangeText={newText => setTextValue(newText)}
      />
      <Button title="Cancel" onPress={onCancelPress} />
      <Button title="OK" onPress={submitTimeInterval} />
    </>
  );
}
