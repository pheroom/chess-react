import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";
import BackgroundText from "./UI/BackgroundText";

interface LostFiguresProps {
  color: string
  figures: Figure[]
}

interface IFiguresList {
  figures: Figure[]
}

const FiguresList: FC<IFiguresList> = ({figures}) => {
  return (
    <>
      {
        figures.map(figure =>
          <span key={figure.id}>
            {figure.logo && <img className={'lost-figures__img'} src={figure.logo} alt={figure.name}/>}
          </span>
        )
      }
    </>
  )
}

const LostFigures: FC<LostFiguresProps> = ({color, figures}) => {

  const title = color === 'white' ? 'Белыми' : 'Чёрными'

  return (
    <div className={'lost-figures'}>
      <div className={'lost-figures__title'}>
        Взятые фигуры <BackgroundText text={title} bgColor={color}/> :
      </div>
      <div className="lost-figures__list">
        {figures.length === 0
          ? <span className={'lost-figures__placeholder'}>Пусто!</span>
          : <FiguresList figures={figures}/>
        }
      </div>
    </div>
  );
};

export default LostFigures;