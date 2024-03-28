export type Exercise = {
  name: string;
  type: string;
  target?: string[];
};

export type Workout = {
  name: string;
  exercises: Exercise[];
};

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

export type WorkoutHistory = {
  name: string;
  date: string;
  exercises: ExerciseData[];
};

export type CurrentWorkoutType = {
  name: string;
  timestamp: string;
  exercises: Exercise[];
};

export type RootStack = {
  tab: undefined;
  selectWorkout: undefined;
  currentWorkout: {
    workout: Workout;
  };
  createExercise: undefined;
  createWorkout: {
    exercise: Exercise[];
  };
  workoutHistory: WorkoutHistory;
};

export type TextBoxProp = {
  textBody: string | number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingTop?: number;
  alignSelf?: "center" | "auto" | "baseline" | "flex-end" | "flex-start" | "stretch";
  fontStyle?: "italic";
};
