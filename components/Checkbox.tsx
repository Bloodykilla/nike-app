import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CheckboxProps {
  label: string;

  isActive: boolean;
  style?: {};
  onPress: () => void;
}

export const Checkbox = ({
  label,
  isActive,
  style,
  onPress,
}: CheckboxProps) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.box, isActive ? styles.activeBox : null]}>
        <View style={isActive ? styles.active : null} />
      </View>
      {label && <Text style={styles.text}>{label}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#000",
    textAlign: "left",
  },
  box: {
    borderWidth: 1,
    borderRadius: 4,
    width: 18,
    height: 18,
    padding: 2,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  activeBox: {
    borderColor: "#000",
  },
  active: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
});
