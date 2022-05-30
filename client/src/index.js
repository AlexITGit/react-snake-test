import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ScoreStore from "./store/ScoreStore";
import "./index.css";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      scores: new ScoreStore(),
    }}
  >
    <App />
  </Context.Provider>
);
