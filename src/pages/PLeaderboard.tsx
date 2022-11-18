import { Button, Input } from "antd";
import React, { FC } from "react";
import CTable from "../components/CTable";
import { QuizGame } from "../interfaces/Quiz";

interface LeaderboardProps {
  setQuizGame: React.Dispatch<React.SetStateAction<QuizGame>>;
  setInput: React.Dispatch<React.SetStateAction<string | null>>;
}

const PLeaderboard: FC<LeaderboardProps> = ({ setQuizGame, setInput }) => {
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex align-items-center flex-column justify-content-center"
    >
      <div className="w-25">
        <span className="fw-bold">Choose a name</span>
        <Input className="my-3" onChange={(e) => setInput(e.target.value)} />
        <Button
          onClick={() => setQuizGame((curr) => ({ ...curr, started: true }))}
        >
          Play the quiz
        </Button>
      </div>

      <CTable />
    </div>
  );
};

export default PLeaderboard;
