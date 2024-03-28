import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, ToastAndroid, View } from "react-native";
import { TextBox, TextHeader } from "../../component/Textbox";
import { RootStack, Exercise } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Button from "../../component/Button";
import ExerciseCard from "./ExerciseCardNew";
import { fetchWorkOutHistory, saveWorkoutHistory } from "../../firestore/firestore";
import { useTheme } from "@react-navigation/native";

type Prop = NativeStackScreenProps<RootStack, "currentWorkout">;
type WeightData = {
  reps: string | "0";
  weight: string | "0";
};

type CardioData = {
  hours: string | "0";
  minutes: string | "0";
};

type WeightExercise = {
  exerciseName: string;
  type: "Weight";
  data: WeightData[];
};

type CardioExercise = {
  exerciseName: string;
  type: "Cardio";
  data: CardioData[];
};

type ExerciseData = WeightExercise | CardioExercise;

type WorkoutData = {
  name: string;
  date: string;
  exercises: ExerciseData[];
};

const CurrentWorkout: React.FC<Prop> = ({ route, navigation }) => {
  const { exercises, name } = route.params.workout;
  const { colors } = useTheme();
  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const [savingData, setSaving] = useState<boolean>(false);
  const [currentWorkoutData, setCurrentWorkoutData] = useState<WorkoutData>({
    name: name,
    date: currentDate,
    exercises: []
  });

  const saveData = (data: ExerciseData) => {
    const exerciseIndex = currentWorkoutData.exercises.findIndex(
      exercise => exercise.exerciseName === data.exerciseName && exercise.type === data.type
    );

    if (exerciseIndex !== -1) {
      setCurrentWorkoutData({
        ...currentWorkoutData,
        exercises: currentWorkoutData.exercises.map((exercise, index) => (index === exerciseIndex ? data : exercise))
      });
    } else {
      setCurrentWorkoutData({
        ...currentWorkoutData,
        exercises: [...currentWorkoutData.exercises, data]
      });
    }
  };

  const submitWorkout = async () => {
    try {
      setSaving(true);
      await saveWorkoutHistory({
        name: currentWorkoutData.name,
        date: currentWorkoutData.date,
        exercises: currentWorkoutData.exercises
      });
      ToastAndroid.show("Saved successfully", ToastAndroid.SHORT);
    } catch (error) {
      console.log("error saving :", error);
      ToastAndroid.show("Could not save", ToastAndroid.SHORT);
    } finally {
      setSaving(false);
      navigation.navigate("tab");
    }
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 10, paddingTop: 10 }}>
      <ScrollView>
        <TextHeader textBody={name} />
        {exercises.map((element, index) => {
          return (
            <ExerciseCard
              name={element.name}
              type={element.type}
              key={index}
              target={element.target}
              saveData={saveData}
            />
          );
        })}
      </ScrollView>
      {savingData ? <ActivityIndicator size={"large"} /> : null}
      <Button
        disabled={savingData ? true : false}
        buttonText="Save Workout"
        onPress={submitWorkout}
        backgroundColor={savingData ? `${colors.primary}70` : colors.primary}
        paddingHorizontal={10}
        paddingVertical={10}
        marginVertical={15}
      />
    </View>
  );
};

export default CurrentWorkout;
