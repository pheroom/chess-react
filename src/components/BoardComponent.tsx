import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import PieceSelection from "./PieceSelection";
import {Figure} from "../models/figures/Figure";
import {observer} from "mobx-react-lite";
import {players} from '../store/players'
import {game} from '../store/game'

interface BoardProps {
  swapPlayer: () => void
  handlePawnEnd: (status: boolean) => void
  handleResetMove: () => void
  handleMoved: (boardCurrent: Board) => void
  hintsVision: boolean
}

const BoardComponent: FC<BoardProps> = observer(({
                                                   swapPlayer,
                                                   handleResetMove,
                                                   handleMoved,
                                                   handlePawnEnd,
                                                   hintsVision,
                                                 }) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  function click(cell: Cell) {
    if (game.pause || players.winner) return
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      const lastBoard = game.board.getDeepCopyBoard()
      const isCheck = selectedCell.moveFigure(cell)
      if (isCheck) {
        game.setBoard(lastBoard)
        return;
      }
      handleMoved(lastBoard)
      if (cell.isPawnEnd()) {
        handlePawnEnd(true)
        setSelectedCell(cell)
        return;
      }
      setSelectedCell(null)
      swapPlayer()
    } else {
      if (cell.figure?.color === players.currentPlayer?.color) {
        setSelectedCell(cell)
      }
    }
  }

  function pawnNewFigure(figure: Figure) {
    if (selectedCell) {
      selectedCell.setFigure(figure)
    }
    setSelectedCell(null)
    handlePawnEnd(false)
    swapPlayer()
  }

  useEffect(() => {
    highlightCells()
  }, [selectedCell])

  function highlightCells() {
    game.board.highlightCells(selectedCell)
    updateBoard()
  }

  function updateBoard() {
    const newBoard = game.board.getCopyBoard()
    game.setBoard(newBoard)
  }

  return (
      <div className={'board'}>
        {game.pawnEnd && <PieceSelection
          color={selectedCell?.figure?.color as Colors}
          setSelectedFigure={pawnNewFigure}
          figures={selectedCell?.figure?.color === Colors.WHITE ? game.board.figuresPawn.white : game.board.figuresPawn.black}
        />}
        {game.pause && <div className={'board--inactive'}></div>}
        {game.board.cells.map((row, index) =>
          <React.Fragment key={index}>
            {row.map(cell =>
              <CellComponent
                hintsVision={hintsVision}
                key={cell.id}
                cell={cell}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                click={click}
              />
            )}
          </React.Fragment>
        )}
      </div>
  );
})


export default BoardComponent;