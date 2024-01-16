import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TextBox, TextHeader } from "../../component/Textbox";
import Button from "../../component/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Exercise, RootStack } from "../../types";
import { fetchExercises } from "../../firestore/firestore";

const Create: React.FC = () => {
  const Navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const [exercise, setExercise] = useState<Exercise[]>([]);
  useEffect(() => {
    async function Exercise() {
      const res = await fetchExercises();
      const data = JSON.parse(JSON.stringify(res));
      setExercise(data);
    }
    Exercise();
  }, []);
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
      <Button
        buttonText="New Workout"
        paddingVertical={10}
        onPress={() =>
          Navigation.navigate("createWorkout", {
            exercise: exercise
          })
        }
      />
    </View>
  );
};

export default Create;
