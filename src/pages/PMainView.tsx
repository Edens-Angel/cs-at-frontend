import React, { FC, useEffect, useState } from "react";
import CButtonGrid from "../components/CButtonGrid";
import { useFetchData } from "../utils/fetch";
import { DocumentNode } from "graphql";
import { gql } from "@apollo/client";
import CQuestionCard from "../components/CQuestionCard";
import { ApiResponse } from "../interfaces/ApiResponse";
import { createQuestions } from "../utils/question.util";
import { QuizGame } from "../interfaces/Quiz";
import { handleNextQuestion, isCorrect } from "../utils/controls";
import PLeaderboard from "./PLeaderboard";
import CScoreTracker from "../components/CScoreTracker";

const PMainView: FC = () => {
  const query: DocumentNode = gql`
    query {
      continents {
        name
        countries {
          name
          languages {
            name
          }
        }
      }
    }
  `;

  const data = useFetchData<ApiResponse>(query);
  const quizGameStarterValues: QuizGame = {
    started: false,
    currentPoints: 0,
    currentQuestion: null,
    allQuestions: null,
  };

  const [quizGame, setQuizGame] = useState<QuizGame>(quizGameStarterValues);
  const [input, setInput] = useState<string | null>(null);

  const { allQuestions, currentQuestion, currentPoints, started } = quizGame;

  const currentIndex =
    allQuestions
      ?.map((e) => e.question)
      .indexOf(currentQuestion?.question ?? "") ?? -1;

  const lastIndex = (allQuestions?.length ?? -1) - 1;
  const isLastQuestion = currentIndex + 1 === lastIndex;

  const handleClick = (e: any) => {
    if (!currentQuestion || !allQuestions) return;
    const givenAnswer = e.target.dataset.value;
    const isCorrectAnswer = isCorrect(
      givenAnswer,
      currentQuestion?.rightAnswer.toString() ?? ""
    );

    if (!isLastQuestion) {
      handleNextQuestion(isCorrectAnswer, currentIndex, setQuizGame);
    } else {
      localStorage.setItem(input ?? "No-name", currentPoints.toString());
      setQuizGame(quizGameStarterValues);
    }
  };

  useEffect(() => {
    if (!allQuestions || allQuestions.length === 0) {
      const questions = createQuestions(data);
      const startingQuestion = questions[0];

      setQuizGame((curr) => ({
        ...curr,
        currentQuestion: startingQuestion,
        allQuestions: questions,
      }));
    }
  }, [data, started]);

  return (
    <div className="h-100 w-100" style={{ height: "100vh" }}>
      {started ? (
        <>
          <div className="d-flex justify-content-center">
            <CQuestionCard
              question={currentQuestion?.question ?? ""}
              currentQuestionNumber={currentIndex}
              maxQuestions={lastIndex}
            />
          </div>

          <CButtonGrid
            answers={currentQuestion?.answers.map((e) => e.toString()) ?? []}
            onClick={handleClick}
          />

          <CScoreTracker currentPoints={currentPoints} />
        </>
      ) : (
        <PLeaderboard setInput={setInput} setQuizGame={setQuizGame} />
      )}
    </div>
  );
};

export default PMainView;
