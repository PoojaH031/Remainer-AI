
export interface UserInputs {
  wakeUpTime: string;
  workStudyHours: string;
  mealTimes: string;
  exerciseTime: string;
  relaxTime: string;
  sleepTime: string;
}

export interface RoutineItem {
  time: string;
  activity: string;
  reminder: string;
  type: 'wake' | 'work' | 'meal' | 'exercise' | 'relax' | 'sleep' | 'other';
}

export interface AIResponse {
  schedule: RoutineItem[];
  motivation: string;
}
