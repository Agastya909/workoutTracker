import React, { useEffect } from "react";
import { Exercise, RootStack, Workout, WorkoutHistory } from "../types";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import { fetchExercises, fetchWorkOutHistory, fetchWorkouts } from "../firestore/firestore";
import { StatusBar } from "react-native";
import { CreateExercise, CreateWorkout, CurrenWorkout, WorkoutDetails } from "../screens";

const Stack = createNativeStackNavigator<RootStack>();

const RootStackNavigator: React.FC = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let exercises = await fetchExercises();
  //     let workouts = await fetchWorkouts();
  //     let workoutsHistory = await fetchWorkOutHistory();
  //     const exercisesData: Exercise[] = JSON.parse(JSON.stringify(exercises));
  //     const workoutsData: Workout[] = JSON.parse(JSON.stringify(workouts));
  //     const workoutsHistoryData: WorkoutHistory[] = JSON.parse(JSON.stringify(workoutsHistory));
  //     console.log("exercisesData", exercisesData);
  //     console.log("workoutsData", workoutsData);
  //     console.log("workoutsHistoryData", workoutsHistoryData);
  //   };

  //   fetchData();
  // }, []);

  const Colors = {
    dark: true,
    colors: {
      background: "#121212",
      card: "#212121",
      border: "#FF1F00",
      text: "#FFFFFF",
      primary: "#23CE6B",
      notification: "#1A73E9"
    }
  };
  return (
    <>
      <StatusBar backgroundColor={Colors.colors.background} />
      <NavigationContainer theme={Colors}>
        <Stack.Navigator>
          <Stack.Screen
            name="tab"
            component={BottomTabs}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="createExercise"
            component={CreateExercise}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="createWorkout"
            component={CreateWorkout}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="workoutHistory"
            component={WorkoutDetails}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="currentWorkout"
            component={CurrenWorkout}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootStackNavigator;
