import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";
import "./Game.css";
import { Button } from "react-bootstrap";
import CreateScore from "./modals/CreateScore";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 96;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  return [x, y];
};

const getRandomType = () => {
  let min = 1;
  let max = 3;
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

let interval = null;
let points = 1;
let speedRate = 50;

const buttons = {
  start: false,
  stop: true,
  pause: true,
};

const initialState = {
  scoreVisible: false,
  score: 0,
  food: getRandomCoordinates(),
  foodType: getRandomType(),
  speed: 400,
  direction: "RIGHT",
  i: "",
  isRuning: true,
  snakeDots: [
    [0, 0],
    [4, 0],
  ],
};

class Snakee extends Component {
  state = initialState;

  // componentDidMount() {}

  componentDidUpdate() {
    this.checkIfEat();
  }

  componentWillUnmount() {
    window.clearInterval(this.state.i);
    document.removeEventListener("keydown", this.onKeyDown);
  }

  color() {
    let { foodType } = this.state;
    if (foodType === 1) {
      points = 1;
      return "red";
    }
    if (foodType === 2) {
      points = 5;
      return "green";
    }
    if (foodType === 3) {
      points = 10;
      return "blue";
    }
  }

  start = () => {
    buttons.start = !buttons.start;
    buttons.stop = !buttons.stop;
    buttons.pause = !buttons.pause;
    this.setState(initialState);
    interval = setInterval(this.moveSnake, this.state.speed);
    this.setState({ isRuning: true, i: interval });
    document.addEventListener("keydown", this.onKeyDown);
  };

  pause = () => {
    const { isRuning } = this.state;
    if (isRuning) {
      this.setState({ isRuning: false, i: interval });
      window.clearInterval(this.state.i);
      return;
    } else {
      interval = setInterval(this.moveSnake, this.state.speed);
      this.setState({ isRuning: true, i: interval });
      return;
    }
  };

  onKeyDown = (e) => {
    document.removeEventListener("keydown", this.onKeyDown);
    e = e || window.event;
    let { direction } = this.state;
    // Стрелка влево
    if (e.keyCode === 37 && (direction === "UP" || direction === "DOWN")) {
      direction = "LEFT";
    }
    // Стрелка вверх
    else if (
      e.keyCode === 38 &&
      (direction === "LEFT" || direction === "RIGHT")
    ) {
      direction = "UP";
    }
    // Стрелка вправо
    else if (e.keyCode === 39 && (direction === "UP" || direction === "DOWN")) {
      direction = "RIGHT";
    }
    // Стрелка вниз
    else if (
      e.keyCode === 40 &&
      (direction === "LEFT" || direction === "RIGHT")
    ) {
      direction = "DOWN";
    }
    this.setState({ direction });
  };

  moveSnake = () => {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    //this.checkIfEat();
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];
    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 4, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 4, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 4];
        break;
      case "UP":
        head = [head[0], head[1] - 4];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots,
    });
    document.addEventListener("keydown", this.onKeyDown);
  };

  checkIfOutOfBorders = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] < 0) {
      head[0] = 96;
    } else if (head[0] >= 100) {
      head[0] = 0;
    }
    if (head[1] < 0) {
      head[1] = 96;
    } else if (head[1] >= 100) {
      head[1] = 0;
    }

    // if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
    //   this.onGameOver();
  };

  checkIfCollapsed = () => {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  };

  checkIfEat = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let { food, score } = this.state;
    if (head[0] === food[0] && head[1] === food[1]) {
      score += points;
      this.setState({
        food: getRandomCoordinates(),
        foodType: getRandomType(),
        score,
      });
      this.enLargeSnake();
      if (score >= speedRate) {
        this.increaseSpeed();
      }
    }
  };

  enLargeSnake = () => {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  };

  increaseSpeed = () => {
    speedRate += 50;
    let { speed } = this.state;
    if (speed > 100) {
      speed -= 100;
      this.setState({
        speed,
      });
      window.clearInterval(this.state.i);
      interval = setInterval(this.moveSnake, this.state.speed);
      this.setState({ isRuning: true, i: interval });
    }
  };

  onGameOver = () => {
    buttons.start = !buttons.start;
    buttons.stop = !buttons.stop;
    buttons.pause = !buttons.pause;
    window.clearInterval(interval);
    this.setState({ scoreVisible: true });
    //alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
  };

  render() {
    const { score, scoreVisible, isRuning, direction } = this.state;
    return (
      <div>
        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots} />
          <Food dot={this.state.food} color={this.color()} />
        </div>
        <div className="points-info">
          <div className="pts" style={{ background: "red" }}></div>
          <strong>1 point</strong>
          <div className="pts" style={{ background: "green" }}></div>
          <strong>5 points</strong>
          <div className="pts" style={{ background: "blue" }}></div>
          <strong>10 points</strong>
        </div>
        <br />
        <div className="info">
          <strong>Score: {score}</strong>
          <strong>Direction: {direction}</strong>
        </div>
        <div>
          <Button
            className="m-1"
            onClick={this.start}
            disabled={buttons.start}
            variant="outline-success"
          >
            Start
          </Button>
          <Button
            className="m-1"
            onClick={this.onGameOver}
            disabled={buttons.stop}
            variant="outline-danger"
          >
            Stop
          </Button>
          <Button
            className="m-1"
            style={{ margin_right: 0 }}
            onClick={this.pause}
            disabled={buttons.pause}
            variant="outline-info"
          >
            {isRuning ? "Pause" : "Return"}
          </Button>
        </div>
        <CreateScore
          show={scoreVisible}
          onHide={() => this.setState(initialState)}
          score={score}
        />
      </div>
    );
  }
}

export default Snakee;
