import {Colors} from "../models/Colors";
import {Player} from "../models/Player";
import {makeAutoObservable} from "mobx";

class Players {
  whitePlayer: Player = new Player(Colors.WHITE)
  blackPlayer: Player = new Player(Colors.BLACK)
  currentPlayer: Player | null = null
  winner: Player | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setCurrentPlayer(player: Player) {
    this.currentPlayer = player
  }

  setWinner(player: Player | null) {
    this.winner = player
  }

  init() {
    this.setCurrentPlayer(this.whitePlayer)
    this.setWinner(null)
  }
}

export const players = new Players()