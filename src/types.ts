export type Exercise = {
  name: string;
  type: string;
  target?: string[];
};

export type Workout = {
  name: string;
  exercises: Exercise[];
};

export type WorkoutHistory = {
  name: string;
  timestamp: Date;
  exercises: Exercise[];
};

export type RootStack = {
  tab: undefined;
  createExercise: undefined;
  createWorkout: undefined;
  workoutHistory: WorkoutHistory;
};
