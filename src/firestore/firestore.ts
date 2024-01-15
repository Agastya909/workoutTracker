import firestore from "@react-native-firebase/firestore";
import { Exercise, Workout, WorkoutHistory } from "../types";

const fetchExercises = async () => {
  try {
    const snapshot = await firestore().collection("exercises").get();
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchWorkouts = async () => {
  try {
    const snapshot = await firestore().collection("workouts").get();
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchWorkOutHistory = async () => {
  try {
    const snapshot = await firestore().collection("history").get();
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const saveExercise = async (exerciseData: Exercise) => {
  try {
    return await firestore().collection("exercises").add(exerciseData);
  } catch (error) {
    console.log("Error", error);
  }
};

const saveWorkout = async (workoutData: Workout) => {
  try {
    return await firestore().collection("workouts").add(workoutData);
  } catch (error) {
    console.log(error);
  }
};

const saveWorkoutHistory = async (workoutData: WorkoutHistory) => {
  try {
    return await firestore().collection("history").add(workoutData);
  } catch (error) {
    console.log(error);
  }
};

export { fetchExercises, fetchWorkouts, fetchWorkOutHistory, saveExercise, saveWorkout, saveWorkoutHistory };
