import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";

interface FilterProps {
  onPress: () => void;
}

export const Filter = ({ onPress }: FilterProps) => {
  return (
    <Pressable style={{ flexDirection: "row" }} onPress={onPress}>
      <FontAwesome5 name={"filter"} size={18} color={"gray"} />
    </Pressable>
  );
};
