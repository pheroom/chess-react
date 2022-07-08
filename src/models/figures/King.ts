import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/figures/king-black.png";
import whiteLogo from "../../assets/figures/king-white.png";

export class King extends Figure{

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FigureNames.KING
  }

  canMove(target: Cell): boolean {
    if(!super.canMove(target))
      return false
    if((target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
       && target.y === this.cell.y)
      return true
    if((target.y === this.cell.y + 1 || target.y === this.cell.y - 1)
       && target.x === this.cell.x)
      return true
    if((target.y === this.cell.y + 1 || target.y === this.cell.y - 1)
       && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1))
      return true
    if(this.cell.isMayCastling(target))
      return true
    return false
  }
}