import React, { FC } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";

interface LeaderBoardProps {
  name: string;
  score: string;
}

const columns: ColumnsType<LeaderBoardProps> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
  },
];

const fetchLeaderboardData = (): LeaderBoardProps[] => {
  const names = Object.keys(localStorage);

  // always gets added in localstorage 'randid'
  return names
    .filter((name) => name !== "randid")
    .map((key) => ({
      name: key,
      score: localStorage.getItem(key) ?? "0",
    }))
    .sort((a, b) => parseInt(b.score) - parseInt(a.score));
};

const CTable: FC = () => {
  return (
    <div className="mt-4 w-100">
      <Table
        rowKey={(e) => e.name}
        columns={columns}
        dataSource={fetchLeaderboardData()}
      />
    </div>
  );
};

export default CTable;
