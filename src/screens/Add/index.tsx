import React from "react";
import { View } from "react-native";
import { TextBox, TextHeader } from "../../component/Textbox";
import Button from "../../component/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../types";

const Create: React.FC = () => {
  const Navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  return (
    <View style={{ flex: 1, marginHorizontal: 10, paddingTop: 20 }}>
      <TextHeader textBody="Create" textAlign="center" />
      <View style={{ flex: 0.4 }} />
      <TextBox
        textBody="You can create new workout splits or add a single exercise and use it in some other workout."
        textAlign="center"
      />
      <View style={{ flex: 1 }} />
      <Button
        buttonText="New Exercise"
        paddingVertical={10}
        onPress={() => Navigation.navigate("createExercise")}
        marginVertical={20}
      />
      <Button buttonText="New Workout" paddingVertical={10} onPress={() => Navigation.navigate("createWorkout")} />
    </View>
  );
};

export default Create;
