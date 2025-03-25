import React from "react";
import { createRoot } from "react-dom/client";
import Words from "./Words";

const App = () => {
  return (
    <div className="">
      <h1 className="mt-5 mb-10 ml-5">Typing Game</h1>
      <Words
        size="50"
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
