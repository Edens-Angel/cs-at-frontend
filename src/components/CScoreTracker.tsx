import React, { FC } from "react";

interface ScoreTrackerProps {
  currentPoints: number;
}
const CScoreTracker: FC<ScoreTrackerProps> = ({ currentPoints }) => {
  return (
    <div className="d-flex justify-content-center">
      <span className="fw-bold h2" style={{ color: "#FF00FF" }}>
        {currentPoints} correct answers
      </span>
    </div>
  );
};

export default CScoreTracker;
