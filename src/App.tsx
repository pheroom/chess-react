import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
import Header from "./components/Header";
import Settings from "./components/Settings";
import {time} from "./store/time";
import {players} from "./store/players";
import {game} from "./store/game";
import {observer} from "mobx-react-lite";
import Title from "./components/Title";
import ButtonSquare from "./components/UI/ButtonSquare";
import SettingsService from "./API/SettingsService";

const App = observer(() => {
  const [hintsVision, setHintsVision] = useState(true)
  const [settingsVision, setSettingsVision] = useState(false)


  useEffect(() => {
    const {hints, time: initialTime} = SettingsService.getConfig()
    setHintsVision(hints)
    handleRestart(initialTime)
  }, [])

  function handleRestart(initialTime?: number) {
    game.init()
    players.init()
    initialTime ? time.initTime(initialTime) : time.initTime()
  }

  function handleMoved(boardCurrent: Board) {
    game.setLastBoard(boardCurrent)
    game.setCanBack(true)
  }

  function handleResetMove() {
    game.setBoard(game.lastBoard)
    swapPlayer()
    game.setCanBack(false)
    players.setWinner(null)
  }

  function isCheckMate(player: Player): boolean {
    const color = player?.color
    return game.board.isCheckMateOnBoard(color)
  }

  function swapPlayer() {
    const player = players.currentPlayer?.color === Colors.WHITE ? players.blackPlayer : players.whitePlayer
    players.setCurrentPlayer(player)
    if (isCheckMate(player)) {
      players.setWinner(player?.color === Colors.WHITE ? players.blackPlayer : players.whitePlayer)
    }
  }

  function timerIsOver(color: Colors) {
    players.setWinner(color === Colors.WHITE ? players.blackPlayer : players.whitePlayer)
  }

  function handlePawnEnd(status: boolean) {
    game.setPause(status)
    game.setPawnEnd(status)
    game.setCanBack(!status)
  }

  function handleUpdateSettings(times: number, hints: boolean) {
    time.initTime(times * 60)
    setHintsVision(hints)
    SettingsService.setConfig({time: times*60, hints})
    setSettingsVision(false)
    handleRestart()
  }

  return (
    <div className="app">
      <Header
        settingsVision={settingsVision}
        setSettingsVision={setSettingsVision}
      />
      {settingsVision && <Settings hintsVision={hintsVision} setSettings={handleUpdateSettings}/>}
      {settingsVision && <div className={'main_inactive'}/>}
      <div className="main">
        <div className="container">
          <div className="main__inner">
            <div className="main__content">
              <div className="main__title">
                <Title currentPlayer={players.currentPlayer} winner={players.winner}/>
              </div>
              <div className="main__game">
                <div className="sidebar_control">
                  <Timer
                    handleRestart={handleRestart}
                    timerIsOver={timerIsOver}
                  />
                  <ButtonSquare
                    children={'Отменить ход'}
                    onClick={handleResetMove}
                    disabled={game.pause || !game.canBack}
                  />
                </div>
                <BoardComponent
                  handleResetMove={handleResetMove}
                  handleMoved={handleMoved}
                  handlePawnEnd={handlePawnEnd}
                  swapPlayer={swapPlayer}
                  hintsVision={hintsVision}
                />
              </div>
            </div>
            <div className={'sidebar_lost_figures'}>
              <LostFigures
                color={'black'}
                figures={game.board.lostWhiteFigures}
              />
              <LostFigures
                color={'white'}
                figures={game.board.lostBlackFigures}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})

export default App;
