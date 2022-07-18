import React, {FC} from 'react';
import {Cell} from "../models/Cell";
import {FigureNames} from "../models/figures/Figure";
import {Colors} from "../models/Colors";

interface CellProps{
  cell: Cell
  selected: boolean
  click: (cell: Cell) => void
  hintsVision: boolean
  checkColor: Colors | null
}

const CellComponent: FC<CellProps> = ({cell, selected, click, hintsVision, checkColor}) => {

  const classCell = [
    'cell',
    cell.color, selected ? 'selected' : '',
    cell.available && hintsVision && cell.figure ? 'available-kill' : '',
  ].join(' ')

  const classIcon = cell.figure?.name === FigureNames.KING && cell.figure?.color === checkColor
    ? 'king'
    : ''

  return (
    <div
      className={classCell}
      onClick={() => click(cell)}
    >
      {hintsVision && cell.available && !cell.figure && <div className={'available-move'}/>}
      {cell.figure?.logo && <img className={classIcon} src={cell.figure.logo} alt={cell.figure.name}/>}
    </div>
  );
};

export default CellComponent;