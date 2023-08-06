import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface FigureProps {}

export const Figure = ({}: FigureProps) => {
  const scaleTo = useSharedValue(0);

  const figureAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleTo.value }],
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scaleTo.value = withTiming(1, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      });
    }, 1000);
  }, []);

  return (
    <Animated.View style={[styles.figure, figureAnimatedStyle]}>
      <Image
        style={{
          width: "100%",
          height: "100%",
          marginBottom: 30,
        }}
        source={require("../assets/shoes.png")}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  figure: {
    position: "relative",
    marginTop: 60,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width - 100,
    height: Dimensions.get("window").width - 100,
    backgroundColor: "#fa3c3c",
    borderRadius: Dimensions.get("window").width - 100,
  },
});
