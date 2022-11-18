import React, { FC } from "react";
import CButton from "./CButton";

interface ButtonGridProps {
  answers: string[];
  onClick: (e?: any) => void;
}

const CButtonGrid: FC<ButtonGridProps> = ({ answers, onClick }) => {
  const [first, second, thirth, fourth] = answers;
  return (
    <div style={{ paddingTop: "9rem" }}>
      <div className="button-group">
        <CButton onClick={(e) => onClick(e)} title={first} color="primary" />
        <CButton onClick={(e) => onClick(e)} title={second} color="warning" />
        <CButton onClick={(e) => onClick(e)} title={thirth} color="danger" />
        <CButton onClick={(e) => onClick(e)} title={fourth} color="success" />
      </div>
    </div>
  );
};

export default CButtonGrid;
