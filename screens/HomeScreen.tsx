import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Figure } from "../components/Figure";
import { StaggeredTitleAnimation } from "../components/StaggeredTitle";
import { NavigationTypes } from "../types/Navigation";

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<NavigationTypes>;
}

const DEFAULT_DELAY = 200;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
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

        <Button
          iconName={"arrow-right"}
          onPress={() => navigation.navigate("Products")}
          label="Go to store"
        />
        <View
          style={{
            marginTop: "auto",
            width: "100%",
          }}
        >
          <Text style={{ textAlign: "center" }}>Created by dma</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
