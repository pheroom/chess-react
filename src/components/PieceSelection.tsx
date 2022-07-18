import React, {FC} from 'react';
import {Colors} from "../models/Colors";
import {Figure} from "../models/figures/Figure";

interface PieceSelectionProps{
  color: Colors
  setSelectedFigure: (figure: Figure) => void
  figures: Figure[]
}

const PieceSelection: FC<PieceSelectionProps> = ({color, setSelectedFigure, figures}) => {

  return (
    <div className={'pawn-selection'}>
      {figures.map(figure =>
        <div
          key={figure.id}
          className={'cell pawn-cell'}
          onClick={() => setSelectedFigure(figure)}
        >
          {figure.logo && <img src={figure.logo} alt={figure.name}/>}
        </div>
      )}
    </div>
  );
};

export default PieceSelection;