import React, { FC } from "react";
import { Button } from "antd";

interface ButtonProps {
  title: string;
  color?: string;
  onClick: (e: any) => void;
}

const CButton: FC<ButtonProps> = ({ title, color, onClick }) => {
  return (
    <div
      data-value={title}
      style={{ height: "6rem" }}
      onClick={(e) => onClick(e)}
    >
      <Button
        data-value={title}
        className={`${color ? "bg-" + color : ""} h-100 w-100 border border-1`}
      >
        <span data-value={title} className="fw-bold">
          {title}
        </span>
      </Button>
    </div>
  );
};

export default CButton;
