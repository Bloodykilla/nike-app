import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
  label: string;
  onPress: () => void;
  floated?: boolean;
}

export const Button = ({ label, onPress, floated = true }: ButtonProps) => {
  return (
    <Pressable
      style={[styles.button, floated && styles.float]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    backgroundColor: "#000",
    width: "90%",
    alignSelf: "center",
    padding: 20,
  },

  float: {
    position: "absolute",
    bottom: 45,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",

    fontSize: 16,
    fontWeight: "500",
  },
});
