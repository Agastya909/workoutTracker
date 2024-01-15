import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise } from "../types";

const initialState: { exercise: Exercise } = {
  exercise: {
    name: "",
    type: "",
    target: [""]
  }
};

export const exerciseReducer = createSlice({
  name: "exercise",
  initialState: initialState,
  reducers: {}
});

export const {} = exerciseReducer.actions;
export default exerciseReducer.reducer;
