import React, {FC, useEffect, useRef} from 'react';
import {Colors} from "../models/Colors";
import {observer} from "mobx-react-lite";
import {time} from '../store/time'
import {players} from '../store/players'
import {game} from '../store/game'
import ButtonSquare from "./UI/ButtonSquare";
import pauseIcon from '../assets/icon/pause.png'
import playIcon from '../assets/icon/play.png'
import TimeLeft from "./TimeLeft";

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

  const pauseText = <div className={'timer__pause-inner'}>
    Пауза
    {
      game.pause
        ? <img className={'timer__pause-icon'} src={playIcon} alt={'play'}/>
        : <img className={'timer__pause-icon'} src={pauseIcon} alt={'pause'}/>
    }
  </div>

  return (
    <div className="timer">
      <TimeLeft color={Colors.BLACK} title={'Осталось времени'} time={time.blackTime}/>
      <ButtonSquare
          children={'Рестарт'}
          onClick={restart}
          className={'timer__restart'}
      />
      <ButtonSquare
          children={pauseText}
          onClick={pauseTimer}
          className={'timer__pause'}
          disabled={players.winner || game.pawnEnd}
      />
      <TimeLeft color={Colors.WHITE} title={'Осталось времени'} time={time.whiteTime}/>
    </div>
  );
})

export default Timer;