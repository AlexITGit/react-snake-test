import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../index";
import "./ScoreList.css";

const ScoreList = observer(() => {
  const { scores } = useContext(Context);
  return (
    <div className="mt-3">
      <div className="scorelist-layout">
        <h1>Hi scores</h1>
        <table className="scorelist-history">
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.scores.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default ScoreList;
