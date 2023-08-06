import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

interface BackProps {}

type BackScreenNavigationProp = NativeStackNavigationProp<any, "Back">;

export const Back = ({}: BackProps) => {
  const navigation = useNavigation<BackScreenNavigationProp>();
  return (
    <Pressable style={styles.container} onPress={() => navigation.goBack()}>
      <FontAwesome5 name={"arrow-left"} color={"white"} size={16} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    backgroundColor: "#000",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
