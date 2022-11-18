import React, { FC } from "react";
import "./App.css";
import PMainView from "./pages/PMainView";

const App: FC = () => {
  return (
    <div style={{ height: "100vh" }} className="App">
      <PMainView />
    </div>
  );
};

export default App;
