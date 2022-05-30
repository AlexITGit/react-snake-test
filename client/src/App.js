import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Context } from ".";
// import CreateScore from "./components/modals/CreateScore";
import ScoreList from "./components/ScoreList/ScoreList";
import { fetchScores } from "./http/scoreAPI";
import Snakee from "./components/Game";

const App = observer(() => {
  // const [scoreVisible, setScoreVisible] = useState(false);
  const { scores } = useContext(Context);
  useEffect(() => {
    //fetchScores().then((data) => console.log(data));
    fetchScores().then((data) => scores.setScores(data));
  }, []);
  return (
    <Container>
      {/* <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setScoreVisible(true)}
      >
        Добавить рекорд
      </Button>

      <CreateScore show={scoreVisible} onHide={() => setScoreVisible(false)} /> */}

      <Container className="d-flex justify-content-between m-4">
        <Snakee></Snakee>
        <ScoreList></ScoreList>
      </Container>
    </Container>
  );
});

export default App;
