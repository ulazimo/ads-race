export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  points: number;
  timeoutSeconds: number;
}

export interface Ad {
  id: string;
  title: string;
  brand: string;
  videoUri: string;
  watchSeconds: number;
  questions: Question[];
}
