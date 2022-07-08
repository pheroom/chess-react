import {Colors} from "./Colors";
import {Figure, FigureNames} from "./figures/Figure";
import {Board} from "./Board";

export class Cell{
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: number;

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.x = x
    this.y = y
    this.color = color
    this.figure = figure
    this.board = board
    this.available = false
    this.id = Math.random()
  }

  isEmpty(): boolean {
    return this.figure === null
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color
    }
    return false
  }

  isEmptyVertical(target: Cell): boolean {
    if(this.x !== target.x)
      return false
    const min = Math.min(this.y, target.y)
    const max = Math.max(this.y, target.y)
    for(let y = min+1; y < max; y++){
      if(!this.board.getCell(this.x, y).isEmpty()){
        return false
      }
    }
    return true
  }

  isEmptyHorizontal(target: Cell): boolean {
    if(this.y !== target.y)
      return false
    const min = Math.min(this.x, target.x)
    const max = Math.max(this.x, target.x)
    for(let x = min+1; x < max; x++){
      if(!this.board.getCell(x, this.y).isEmpty()){
        return false
      }
    }
    return true
  }

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x)
    const absY = Math.abs(target.y - this.y)
    if(absY !== absX)
      return false

    const dy = this.y < target.y ? 1 : -1
    const dx = this.x < target.x ? 1 : -1

    for(let i = 1; i < absY; i++){
      if(!this.board.getCell(this.x + dx*i, this.y + dy*i).isEmpty())
        return false
    }
    return true
  }

  isSuitableRook(figure: Figure | null): boolean{
    return figure?.name === FigureNames.ROOK
      && figure?.color === this.figure?.color
      && figure?.isFirstStep
  }

  isMayCastlingUnit(target: Cell, rookCoords: { x: number; y: number }, horizontal: { x: number; y: number }): boolean{
    if(this.y === target.y && this.figure?.isFirstStep
      && this.isSuitableRook(this.board.getCell(rookCoords.x, rookCoords.y).figure)
      && this.isEmptyHorizontal(this.board.getCell(horizontal.x, horizontal.y))){
      return true
    }
    return false
  }

  isMayCastling(target: Cell): boolean {
    if(this.figure?.color === Colors.BLACK){
      if(this.x === target.x - 2
        && this.isMayCastlingUnit(target, {x: 7, y: 0}, {x: 6, y: 0}))
        return true
      if(this.x === target.x + 2
        && this.isMayCastlingUnit(target, {x: 0, y: 0}, {x: 1, y: 0}))
        return true
    }
    if(this.figure?.color === Colors.WHITE) {
      if (this.x === target.x - 2
        && this.isMayCastlingUnit(target, {x: 7, y: 7}, {x: 6, y: 7}))
        return true
      if (this.x === target.x + 2
        && this.isMayCastlingUnit(target, {x: 0, y: 7}, {x: 1, y: 7}))
        return true
    }
    return false
  }

  isPawnEnd(): boolean{
    const endY = this.figure?.color === Colors.WHITE ? 0 : 7
    //const endY = this.figure?.color === Colors.WHITE ? 5 : 2
    return this.figure?.name === FigureNames.PAWN && this.y === endY;
  }

  isCheck(): boolean{
    const color = this.figure?.color as Colors
    const king = this.board.findKing(color)
    return this.board.checkTest(king as Figure)
  }

  isCheckMate(target: Cell): boolean{
    return false
  }

  setFigure(figure: Figure){
    this.figure = figure
    this.figure.cell = this
  }

  addLostFigure(figure: Figure){
    figure.color === Colors.BLACK
      ? this.board.lostBlackFigures.push(figure)
      : this.board.lostWhiteFigures.push(figure)
  }

  moveCastlingRook(target: Cell){
    const y = this.figure?.color === Colors.WHITE ? 7 : 0
    const rookX = target.x === 6 ? 7 : 0
    const newX = target.x === 6 ? 5 : 3
    const cell = this.board.getCell(rookX, y)
    this.board.getCell(newX ,y).figure = cell.figure
    cell.figure = null
  }

  moveFigure(target: Cell): boolean{
    if(this.figure && this.figure?.canMove(target)){
      if(this.figure?.name === FigureNames.KING && this.isMayCastling(target)){
        this.moveCastlingRook(target)
      }
      this.figure?.moveFigure(target)
      if(target.figure){
        this.addLostFigure(target.figure)
      }
      target.setFigure(this.figure)
      this.figure = null
      if(target.isCheck()) {
        return true
      }
    }
    return false
  }
}