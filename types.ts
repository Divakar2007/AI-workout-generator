
export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  detailedDescription: string;
}

export interface WorkoutPlan {
  workoutName: string;
  description: string;
  exercises: Exercise[];
}

export interface FormData {
  workoutType: string;
  muscleGroup: string;
  fitnessLevel: string;
  duration: number;
  equipment: string[];
}