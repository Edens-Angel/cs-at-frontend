import { QuizGame } from "../interfaces/Quiz";

export const isCorrect = (givenAnswer: string, actualAnswer: string): boolean =>
  givenAnswer === actualAnswer;

export const handleNextQuestion = (
  isCorrectAnswer: boolean,
  currentIndex: number,
  setState: React.Dispatch<React.SetStateAction<QuizGame>>
) => {
  setState((cur) => ({
    ...cur,
    currentPoints: isCorrectAnswer ? cur.currentPoints + 1 : cur.currentPoints,
    currentQuestion: cur.allQuestions
      ? cur.allQuestions[currentIndex + 1]
      : cur.allQuestions,
  }));
};
