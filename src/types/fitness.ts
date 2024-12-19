export interface UserStats {
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
}

export interface FitnessGoal {
  type: 'weight-loss' | 'muscle-gain' | 'maintenance';
  weeklyGoal: number;
}

export interface WeeklyPlan {
  week: number;
  mealPlan: DailyMeal[];
  exercises: DailyExercise[];
  waterIntake: number;
}

export interface DailyMeal {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string[];
}

export interface DailyExercise {
  day: string;
  routines: ExerciseRoutine[];
}

export interface ExerciseRoutine {
  name: string;
  sets: number;
  reps: number;
  duration?: number;
}

