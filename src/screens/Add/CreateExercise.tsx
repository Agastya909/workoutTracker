import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextBox, TextHeader } from "../../component/Textbox";
import InputBox from "../../component/TextInput";
import Button from "../../component/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../types";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { saveExercise } from "../../firestore/firestore";

const CreateExercise: React.FC = () => {
  const Navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const { colors } = useTheme();
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseType, setExerciseType] = useState<"Cardio" | "Weight">("Cardio");
  const [targetArea, setTargetArea] = useState<string[]>([]);
  const handleNameChange = (text: string) => {
    setExerciseName(text);
    console.log("name", text);
  };
  const handleSubmit = async () => {
    const data = await saveExercise({
      name: exerciseName,
      type: exerciseType
    });
  };
  return (
    <View style={{ flex: 1, marginHorizontal: 10, paddingTop: 40 }}>
      <TextHeader textBody="New Exercise" textAlign="center" />
      <InputBox
        placeholder="Enter name"
        paddingVertical={15}
        paddingHorizontal={20}
        value={exerciseName}
        handleChange={handleNameChange}
        handleSubmit={handleSubmit}
        marginVertical={20}
      />
      <TextBox textBody="Type" />
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            marginTop: 10,
            marginRight: 5
          }}>
          <Button
            buttonText="Cardio"
            paddingVertical={10}
            onPress={() => setExerciseType("Cardio")}
            backgroundColor={exerciseType === "Cardio" ? colors.notification : colors.card}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 10,
            marginLeft: 5
          }}>
          <Button
            buttonText="Weights"
            paddingVertical={10}
            onPress={() => setExerciseType("Weight")}
            backgroundColor={exerciseType === "Weight" ? colors.notification : colors.card}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
      <Button
        buttonText="Save Exercise"
        paddingVertical={10}
        onPress={() => {
          console.log(exerciseName);
          console.log(exerciseType);
        }}
        marginVertical={20}
      />
    </View>
  );
};

export default CreateExercise;
