import React from "react";
import { Text, View } from "react-native";
import { TextHeader } from "../../component/Textbox";
import Button from "../../component/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../types";
import LottieView from "lottie-react-native";

const Home: React.FC = () => {
  const Navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  return (
    <View style={{ flex: 1, marginHorizontal: 10, marginTop: 40 }}>
      <TextHeader textBody="Start your workout, Hit the start button." />
      <LottieView autoPlay loop source={require("../../assets/animations/main-anim.json")} style={{ flex: 1 }} />
      <Button buttonText="Start" paddingVertical={10} onPress={() => Navigation.navigate("currentWorkout")} />
    </View>
  );
};

export default Home;
