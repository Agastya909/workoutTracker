import { configureStore } from "@reduxjs/toolkit";
import currentWorkoutReducer from "./currentWorkout";

export const store = configureStore({
  reducer: {
    currentWorkout: currentWorkoutReducer
  }
});

export type StoreState = ReturnType<typeof store.getState>;