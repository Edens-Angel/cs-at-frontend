export type QuestionType = "CONTINENT" | "LANGUAGE";

export interface QuestionDataType {
  questionType: QuestionType;
  question: string;
  rightAnswer: string | number;
  answers: Answers;
}

export interface QuizGame {
  started: boolean;
  currentQuestion: QuestionDataType | null;
  currentPoints: number;
  allQuestions: QuestionDataType[] | null;
}

export type Answers = [
  string | number,
  string | number,
  string | number,
  string | number
];

export interface ContinentItem {
  name: string;
  countryAmount: number;
}

export interface CountryItem {
  name: string;
  language: string;
}
