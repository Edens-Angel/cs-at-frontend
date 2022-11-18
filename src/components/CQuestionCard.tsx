import { Card } from "antd";
import React, { FC } from "react";

interface QuestionCardProps {
  question: string;
  currentQuestionNumber: number;
  maxQuestions: number;
}

const CQuestionCard: FC<QuestionCardProps> = ({
  question,
  currentQuestionNumber,
  maxQuestions,
}) => {
  return (
    <div className="mt-5 border border-2 h-75 w-50">
      <Card
        title={
          <div className="d-flex flex-column" style={{ color: "#FF00FF" }}>
            <span>Question</span>
            <span>
              {currentQuestionNumber + 1}/{maxQuestions + 1}
            </span>
          </div>
        }
        style={{ borderColor: "#FF00FF" }}
      >
        <span className="fw-bold">{question}</span>
      </Card>
    </div>
  );
};

export default CQuestionCard;
