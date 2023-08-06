import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  label: string;
  onPress: () => void;
  floated?: boolean;
  iconName?: string;
  isOutline?: boolean;
  style?: {};
}

export const Button = ({
  label,
  onPress,
  floated = true,
  iconName,
  isOutline,
  style,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        floated && styles.float,
        isOutline && styles.outline,
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: isOutline ? "#000" : "#fff",
          },
        ]}
      >
        {label}
      </Text>
      {iconName && (
        <FontAwesome5
          style={{ marginLeft: 8 }}
          name={iconName}
          size={16}
          color={isOutline ? "black" : "white"}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    backgroundColor: "#000",
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  outline: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },

  float: {
    position: "absolute",
    bottom: 45,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});
