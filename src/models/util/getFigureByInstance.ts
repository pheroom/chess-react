import {Figure, FigureNames} from "../figures/Figure";
import {King} from "../figures/King";
import {Knight} from "../figures/Knight";
import {Pawn} from "../figures/Pawn";
import {Queen} from "../figures/Queen";
import {Rook} from "../figures/Rook";
import {Bishop} from "../figures/Bishop";
import {Colors} from "../Colors";
import {Cell} from "../Cell";

export function getFigureByInstance(figure: Figure, color: Colors, newCell: Cell){
  let newFigure
  switch (figure.name){
    case FigureNames.KING:
      newFigure = new King(color, newCell)
      break;
    case FigureNames.KNIGHT:
      newFigure = new Knight(color, newCell)
      break;
    case FigureNames.PAWN:
      newFigure = new Pawn(color, newCell)
      break;
    case FigureNames.QUEEN:
      newFigure = new Queen(color, newCell)
      break;
    case FigureNames.ROOK:
      newFigure = new Rook(color, newCell)
      break;
    case FigureNames.BISHOP:
      newFigure = new Bishop(color, newCell)
      break;
  }
  if(newFigure){
    newFigure.isFirstStep = figure.isFirstStep
  }
  return newFigure
}

