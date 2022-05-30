const express = require("express");
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.post("/score", async (req, res) => {
  try {
    const { name, score } = req.body;
    const newScore = await pool.query(
      `INSERT INTO score (name, score) values ($1, $2) RETURNING *`,
      [name, score]
    );
    return res.json(newScore);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/scores", async (req, res) => {
  try {
    const scores = await pool.query(
      "SELECT * FROM score ORDER BY score DESC limit 10"
    );
    return res.json(scores.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

