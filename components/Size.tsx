import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface SizeProps {
  value: number;
  isActive: boolean;
  onPress: () => void;
}

export const Size = ({ value, isActive, onPress }: SizeProps) => {
  return (
    <Pressable
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>{value}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: "gray",
  },
  activeContainer: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  activeText: {
    color: "white",
  },
});
