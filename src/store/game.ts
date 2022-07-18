import {Board} from "../models/Board";
import {makeAutoObservable} from "mobx";

class Game{
  board = new Board()
  pause: boolean = false
  pawnEnd: boolean = false
  lastBoard: Board = new Board()
  canBack: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setBoard = (board?: Board) => {
    if(!board){
      const newBoard = new Board()
      newBoard.init()
      game.setBoard(newBoard)
    } else{
      this.board = board
    }
  }

  setPause = (pause: boolean) => {
    this.pause = pause
  }

  setPawnEnd = (pawnEnd: boolean) => {
    this.pawnEnd = pawnEnd
  }

  setLastBoard = (lastBoard: Board) => {
    this.lastBoard = lastBoard
  }

  setCanBack = (canBack: boolean) => {
    this.canBack = canBack
  }

  init(){
    this.setBoard()
    this.setPause(false)
    this.setPawnEnd(false)
    this.setCanBack(false)
  }
}

export const game = new Game()