import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import {observer} from "mobx-react-lite";
import {time} from '../store/time'
import {players} from '../store/players'
import {game} from '../store/game'
import BackgroundText from "./UI/BackgroundText";
import TimeElement from "./UI/TimeElement";
import ButtonSquare from "./UI/ButtonSquare";

interface TimerProps {
  handleRestart: () => void
  timerIsOver: (color: Colors) => void
}

const Timer: FC<TimerProps> = observer(({handleRestart, timerIsOver}) => {
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
  }, [players.currentPlayer])

  useEffect(() => {
    game.pause ? removeTimer() : startTimer()
  }, [game.pause])

  useEffect(() => {
    players.winner ? removeTimer() : startTimer()
  }, [players.winner])

  useEffect(() => {
    if (time.whiteTime === 0) {
      timerIsOver(Colors.WHITE)
      removeTimer()
    }
    if (time.blackTime === 0) {
      timerIsOver(Colors.BLACK)
      removeTimer()
    }
  }, [time.whiteTime, time.blackTime])

  function removeTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
  }

  function startTimer() {
    removeTimer()
    const callback = players.currentPlayer?.color === Colors.WHITE
      ? time.decrementWhiteTime
      : time.decrementBlackTime
    timer.current = setInterval(callback, 1000)
  }

  function pauseTimer() {
    if (players.winner || game.pawnEnd) return
    if (!game.pause) {
      removeTimer()
      game.setPause(true)
    } else {
      startTimer()
      game.setPause(false)
    }
  }

  function restart(){
    handleRestart()
    startTimer()
  }

  const blackTimeElement = time.blackTime > 60
    ? <TimeElement time={Math.floor(time.blackTime / 60)} unit={'мин.'}/>
    : <TimeElement time={time.blackTime} unit={'сек.'}/>

  const whiteTimeElement = time.whiteTime > 60
    ? <TimeElement time={Math.floor(time.whiteTime / 60)} unit={'мин.'}/>
    : <TimeElement time={time.whiteTime} unit={'сек.'}/>

  return (
    <div className="timer">
      <div className="timer__black timer__left">
        <div className={'timer__left_title'}><h3>Осталось времени</h3></div>
        <div>
          <h3>
            у <BackgroundText text={'Чёрных'} color={'black'}/> : {blackTimeElement}
          </h3>
        </div>
      </div>
      <ButtonSquare children={'Рестарт'} onClick={restart} className={'timer__restart'}/>
      <ButtonSquare children={'Пауза'} onClick={pauseTimer} className={'timer__pause'}/>
      <div className="timer__white timer__left">
        <div className={'timer__left_title'}><h3>Осталось времени</h3></div>
        <div>
          <h3>
            у <BackgroundText text={'Белых'} color={'white'}/> : {whiteTimeElement}
          </h3>
        </div>
      </div>
    </div>
  );
})

export default Timer;