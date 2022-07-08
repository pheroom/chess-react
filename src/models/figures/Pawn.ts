import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/figures/pawn-black.png";
import whiteLogo from "../../assets/figures/pawn-white.png";

export class Pawn extends Figure{

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FigureNames.PAWN
  }

  canMove(target: Cell): boolean {
    if(!super.canMove(target))
      return false
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
    const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2
    if((target.y === this.cell.y + direction || (this.isFirstStep
      && (target.y === this.cell.y + firstStepDirection)
      && this.cell.board.getCell(target.x, target.y - direction).isEmpty()))
      && target.x === this.cell.x
      && this.cell.board.getCell(target.x, target.y).isEmpty()){
      return true
    }
    if(target.y === this.cell.y + direction
      && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
      && this.cell.isEnemy(target)){
      return true
    }
    return false
  }
}