export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest: string;
}

export interface DailyPlan {
  day: string;
  exercises: Exercise[];
}

export interface MealPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string[];
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
}

export interface FitnessPlan {
  exerciseRoutine: DailyPlan[];
  mealPlan: MealPlan;
  nutritionGoals: NutritionGoals;
  recommendations: string[];
}

