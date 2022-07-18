import React, {FC} from 'react';
import BackgroundText from "./UI/BackgroundText";
import TimeElement from "./UI/TimeElement";
import {Colors} from "../models/Colors";

interface TimeLeftProps{
  color: Colors
  title: string
  time: number
}

const TimeLeft: FC<TimeLeftProps> = ({color, title, time}) => {

  const timeElement = time > 60
    ? <TimeElement time={Math.floor(time / 60)} unit={'мин.'}/>
    : <TimeElement time={time} unit={'сек.'}/>

  return (
    <div className={"timer__left"}>
      <div className={'timer__left-title'}><h3>{title}</h3></div>
      <div>
        <h3>
          у <BackgroundText
            text={color === Colors.WHITE
              ? 'Белых'
              : 'Чёрных'
            }
            bgColor={color === Colors.BLACK ? 'black' : 'white'}
          /> : {timeElement}
        </h3>
      </div>
    </div>
  );
};

export default TimeLeft;