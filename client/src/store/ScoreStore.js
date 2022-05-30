import { makeAutoObservable } from "mobx";
export default class ScoreStore {
  constructor() {
    this._scores = [];
    makeAutoObservable(this);
  }

  setScores(scores) {
    this._scores = scores;
  }

  get scores() {
    return this._scores;
  }
}
