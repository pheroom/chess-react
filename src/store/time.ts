import {makeAutoObservable} from "mobx";

class Time{
  initialTime: number = 100
  blackTime: number = 10
  whiteTime: number = 10

  constructor() {
    makeAutoObservable(this)
  }

  initTime = (time: number = this.initialTime) => {
    this.initialTime = time
    this.blackTime = time
    this.whiteTime = time
  }

  decrementBlackTime = () => {
    this.blackTime = this.blackTime - 1
  }

  decrementWhiteTime = () => {
    this.whiteTime = this.whiteTime - 1
  }
}


export const time = new Time()