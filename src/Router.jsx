import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Match from "./Match";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="practice" element={<Match />} />
      <Route path="match">
        <Route path=":matchId" element={<Match />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
