import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface StaggeredTitleProps {
  title: string;
  delay: number;
}

export const StaggeredTitleAnimation = ({
  title,
  delay,
}: StaggeredTitleProps) => {
  const titleChars = title.split("");

  const charOpacities = titleChars.map(() => useSharedValue(0));
  const charTranslationsY = titleChars.map(() => useSharedValue(15));

  useEffect(() => {
    setTimeout(() => {
      titleChars.forEach((char, index) => {
        charOpacities[index].value = withTiming(1, {
          duration: 1000,
          easing: Easing.out(Easing.exp),
        });
        charTranslationsY[index].value = withTiming(0, {
          duration: 1000,
          easing: Easing.out(Easing.exp),
        });
      });
    }, 500);
  }, []);

  const charStyles = titleChars.map((char, index) => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: charOpacities[index].value,
        transform: [{ translateY: charTranslationsY[index].value }],
      };
    });

    return (
      <Animated.Text key={index} style={[styles.title, animatedStyle]}>
        {char}
      </Animated.Text>
    );
  });

  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      {charStyles}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 52,
    textAlign: "left",
    fontWeight: "700",
    textTransform: "uppercase",
    opacity: 0,
  },
});
