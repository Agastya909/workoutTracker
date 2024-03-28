import React from "react";
import { RootStack } from "../types";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import { StatusBar } from "react-native";
import { CreateExercise, CreateWorkout, SelectWorkout, WorkoutDetails } from "../screens";
import CurrentWorkout from "../screens/Workout/CurrentWorkout";

const Stack = createNativeStackNavigator<RootStack>();

const RootStackNavigator: React.FC = () => {
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
            options={{ headerShown: true, animation: "slide_from_right", headerTitle: "History" }}
          />
          <Stack.Screen
            name="selectWorkout"
            component={SelectWorkout}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="currentWorkout"
            component={CurrentWorkout}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootStackNavigator;
