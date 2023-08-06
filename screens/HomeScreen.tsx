import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Button } from "../components/Button";
import { Figure } from "../components/Figure";
import { StaggeredTitleAnimation } from "../components/StaggeredTitle";
import { NavigationTypes } from "../types/Navigation";

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<NavigationTypes>;
}

const DEFAULT_DELAY = 200;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(100);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
      transform: [{ translateY: buttonTranslateY.value }],
    };
  });

  useEffect(() => {
    setTimeout(() => {
      buttonOpacity.value = withTiming(1, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      });
      buttonTranslateY.value = withTiming(0, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      });
    }, 1800);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <View style={{ marginTop: 60, paddingHorizontal: 16 }}>
          <StaggeredTitleAnimation delay={DEFAULT_DELAY} title={"Find your"} />
          <StaggeredTitleAnimation delay={DEFAULT_DELAY * 2} title={"ovvn"} />
          <StaggeredTitleAnimation
            delay={DEFAULT_DELAY * 3}
            title={"xpression"}
          />
        </View>

        <Figure />

        <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
          <Button
            floated={false}
            iconName={"arrow-right"}
            onPress={() => navigation.navigate("Products")}
            label="Go to store"
          />
        </Animated.View>

        <View style={styles.textContainer}>
          <Text style={{ textAlign: "center" }}>Created by dma</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: "auto",
  },

  textContainer: {
    marginTop: "auto",
    width: "100%",
  },
});

export default HomeScreen;
