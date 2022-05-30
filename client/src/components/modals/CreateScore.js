import React, { useState, useContext } from "react";
import { Context } from "../..";
import { Modal, Button, Form } from "react-bootstrap";
import { createScore, fetchScores } from "../../http/scoreAPI";

const CreateScore = ({ show, onHide, score }) => {
  const { scores } = useContext(Context);
  const [name, setName] = useState("");
  //const [score, setScore] = useState("");
  const addScore = () => {
    createScore(name, score).then((data) => {
      fetchScores().then((data) => scores.setScores(data));
      setName("");
      //setScore("");
      onHide();
    });
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Your result: {score} points
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            className="mt-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          {/* <Form.Control
            className="mt-3"
            placeholder="Введите счет"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            type="number"
          /> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addScore}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateScore;
