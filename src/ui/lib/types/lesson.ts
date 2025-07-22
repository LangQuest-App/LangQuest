// Define the type for a question object
export type LessonQuestion = {
  question: string;
  phonetic: string;
  tts_url: string;
  answer_type: string;
  correct_answer: string;
  options:any
};

// Use it for the questions array
export type Lesson = {
  id: string;
  userId: string;
  title: string;
  questions: LessonQuestion[];
  createdAt: Date;
  updatedAt: Date;
};