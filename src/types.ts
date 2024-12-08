export interface OnboardingData {
  gender: 'woman' | 'man' | 'neutral'
  goal: 'lose-weight' | 'keep-fit' | 'get-stronger' | 'gain-muscle'
  birthDate: string
  height: number
  heightUnit: 'cm' | 'ft'
  trainingLevel: 'beginner' | 'irregular' | 'medium' | 'advanced'
  activities: "Hiking"|"Zumba"|"Cycling"|"Yoga"|"Swimming"
}
