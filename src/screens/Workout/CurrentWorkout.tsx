import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { TextBox, TextHeader } from "../../component/Textbox";
import { RootStack } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Button from "../../component/Button";
import ExerciseCard from "./ExerciseCard";

type Prop = NativeStackScreenProps<RootStack, "currentWorkout">;

const CurrentWorkout: React.FC<Prop> = ({ route }) => {
  const { exercises, name } = route.params.workout;

  return (
    <View style={{ flex: 1, marginHorizontal: 10, paddingTop: 10 }}>
      <ScrollView>
        <TextHeader textBody={name} />
        {exercises.map((element, index) => {
          return <ExerciseCard name={element.name} type={element.type} key={index} target={element.target} />;
        })}
      </ScrollView>
      <Button
        buttonText="Save Workout"
        onPress={() => {}}
        paddingHorizontal={10}
        paddingVertical={10}
        marginVertical={15}
      />
    </View>
  );
};

export default CurrentWorkout;
