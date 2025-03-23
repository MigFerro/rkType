import React from "react";
import { createRoot } from "react-dom/client";
import Words from "./Words";

const App = () => {
  return (
    <div>
      <h1>Typing Game</h1>
      <Words
        size="100"
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
