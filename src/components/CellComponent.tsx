import React, {FC} from 'react';
import {Cell} from "../models/Cell";

interface CellProps{
  cell: Cell
  selected: boolean
  click: (cell: Cell) => void
  hintsVision: boolean
}

const CellComponent: FC<CellProps> = ({cell, selected, click, hintsVision}) => {

  const classCell = [
    'cell',
    cell.color, selected ? 'selected' : '',
    cell.available && hintsVision && cell.figure ? 'available_kill' : '',
  ].join(' ')

  return (
    <div
      className={classCell}
      onClick={() => click(cell)}
    >
      {hintsVision && cell.available && !cell.figure && <div className={'available_move'}/>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt={cell.figure.name}/>}
    </div>
  );
};

export default CellComponent;