//import { $host } from ".";
// import axios from "axios";

// export const createScore = async (name, score) => {
//   const { data } = await axios.post("/score", name, score);
//   return data;
// };

// export const fetchScores = async () => {
//   const { data } = await axios.get("/scores");
//   return data;
// };

export const createScore = async (name, score) => {
  const res = await fetch("/score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      score,
    }),
  });
  return res;
};

export const fetchScores = async () => {
  const res = await fetch("/scores");
  return res.json();
};
