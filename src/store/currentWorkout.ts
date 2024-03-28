import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentWorkoutType } from "../types";

const initialState: { currentWorkout: CurrentWorkoutType } = {
  currentWorkout: {
    name: "",
    timestamp: "",
    exercises: []
  }
};

export const currentWorkoutReducer = createSlice({
  name: "currentWorkout",
  initialState: initialState,
  reducers: {
    setName: (state: { currentWorkout: CurrentWorkoutType }, actions: PayloadAction<string>) => {
      state.currentWorkout.name = actions.payload;
    }
  }
});

export const { setName } = currentWorkoutReducer.actions;
export default currentWorkoutReducer.reducer;
