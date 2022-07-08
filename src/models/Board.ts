import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Queen} from "./figures/Queen";
import {Rook} from "./figures/Rook";
import {Pawn} from "./figures/Pawn";
import {King} from "./figures/King";
import {Bishop} from "./figures/Bishop";
import {Knight} from "./figures/Knight";
import {Figure, FigureNames} from "./figures/Figure";
import {getFigureByInstance} from "./util/getFigureByInstance";

export class Board{
  cells: Cell[][] = []
  lostBlackFigures: Figure[] = []
  lostWhiteFigures: Figure[] = []
  figuresPawn: {white: Figure[], black: Figure[]} = {white: [], black: []}

  public init(){
    this.initCells()
    this.initFiguresPawn()
    this.addFigures()
  }

  public initFiguresPawn(){
    this.figuresPawn.white = [
      new Queen(Colors.WHITE, this.getCell(0, 0)),
      new Bishop(Colors.WHITE, this.getCell(0, 0)),
      new Knight(Colors.WHITE, this.getCell(0, 0)),
      new Rook(Colors.WHITE, this.getCell(0, 0)),
    ]
    this.figuresPawn.black = [
      new Queen(Colors.BLACK, this.getCell(0, 0)),
      new Bishop(Colors.BLACK, this.getCell(0, 0)),
      new Knight(Colors.BLACK, this.getCell(0, 0)),
      new Rook(Colors.BLACK, this.getCell(0, 0)),
    ]
  }

  public initCells(){
    for (let i = 0; i < 8; i++){
      const row: Cell[] = []
      for (let j = 0; j < 8; j++){
        if((i + j) % 2 !== 0){
          row.push(new Cell(this , j, i, Colors.BLACK, null))
        } else{
          row.push(new Cell(this , j, i, Colors.WHITE, null))
        }
      }
      this.cells.push(row)
    }
  }

  public getDeepCopyBoard(): Board{
    const newBoard = new Board()
    newBoard.initCells()
    for(let i = 0; i < this.cells.length; i++){
      const row = this.cells[i]
      for(let j = 0; j < row.length; j++){
        const target = row[j]
        if(target.figure){
          let newCell = newBoard.getCell(target.x, target.y)
          let color = target.figure.color
          let newFigure = getFigureByInstance(target.figure, color, newCell)
          newCell.figure = newFigure as Figure
        }
      }
    }
    newBoard.lostBlackFigures = [...this.lostBlackFigures]
    newBoard.lostWhiteFigures = [...this.lostWhiteFigures]
    newBoard.figuresPawn = this.figuresPawn
    return newBoard
  }

  public getCopyBoard(): Board{
    const newBoard = new Board()
    newBoard.cells = this.cells
    newBoard.lostWhiteFigures = this.lostWhiteFigures
    newBoard.lostBlackFigures = this.lostBlackFigures
    newBoard.figuresPawn = this.figuresPawn
    return newBoard
  }

  public isCheckMateOnBoard(color: Colors): boolean{
    for(let y = 0; y < this.cells.length; y++){
      const row = this.cells[y]
      for(let x = 0; x < row.length; x++){
        let target = row[x]
        if(target.figure?.color === color){
          let copyBoard = this.getDeepCopyBoard()
          target = copyBoard.getCell(target.x, target.y)
          let cells = copyBoard.highlightCells(target)
          for(let i = 0; i < cells.length; i++){
            let cell = cells[i]
            let newBoard = copyBoard.getDeepCopyBoard()
            let newTarget = newBoard.getCell(target.x, target.y)
            const isCheck = newTarget.moveFigure(newBoard.getCell(cell.x, cell.y))
            if(!isCheck){
              return false
            }
          }
        }
      }
    }
    return true
  }

  public highlightCells(selectedCell: Cell | null){
    const availableCells = []
    for(let i = 0; i < this.cells.length; i++){
      const row = this.cells[i]
      for(let j = 0; j < row.length; j++){
        const target = row[j]
        target.available = !!selectedCell?.figure?.canMove(target)
        if(target.available){
          availableCells.push(target)
        }
      }
    }
    return availableCells
  }

  public checkTest(king: Figure){
    for(let i = 0; i < this.cells.length; i++){
      const row = this.cells[i]
      for(let j = 0; j < row.length; j++){
        const target = row[j]
        if(target.figure?.color !== king.color){
          if(target.figure?.canMove(king.cell))
            return true
        }
      }
    }
    return false
  }

  public findKing(color: Colors){
    for(let i = 0; i < this.cells.length; i++){
      const row = this.cells[i]
      for(let j = 0; j < row.length; j++){
        const target = row[j]
        if(target.figure?.name === FigureNames.KING && target.figure?.color === color)
          return target.figure
      }
    }
  }

  public getCell(x: number, y: number){
    return this.cells[y][x]
  }

  private addPawns(){
    for(let i = 0; i < 8; i++){
      new Pawn(Colors.BLACK, this.getCell(i, 1))
      new Pawn(Colors.WHITE, this.getCell(i, 6))
    }
  }

  private addKings(){
    new King(Colors.BLACK, this.getCell(4, 0))
    new King(Colors.WHITE, this.getCell(4, 7))
  }

  private addQueens(){
    new Queen(Colors.BLACK, this.getCell(3, 0))
    new Queen(Colors.WHITE, this.getCell(3, 7))
  }

  private addBishops(){
    new Bishop(Colors.BLACK, this.getCell(2, 0))
    new Bishop(Colors.BLACK, this.getCell(5, 0))
    new Bishop(Colors.WHITE, this.getCell(2, 7))
    new Bishop(Colors.WHITE, this.getCell(5, 7))
  }

  private addKnights(){
    new Knight(Colors.BLACK, this.getCell(1, 0))
    new Knight(Colors.BLACK, this.getCell(6, 0))
    new Knight(Colors.WHITE, this.getCell(1, 7))
    new Knight(Colors.WHITE, this.getCell(6, 7))
  }

  private addRooks(){
    new Rook(Colors.BLACK, this.getCell(0, 0))
    new Rook(Colors.BLACK, this.getCell(7, 0))
    new Rook(Colors.WHITE, this.getCell(0, 7))
    new Rook(Colors.WHITE, this.getCell(7, 7))
  }

  public addFigures() {
    this.addPawns()
    this.addKings()
    this.addQueens()
    this.addBishops()
    this.addKnights()
    this.addRooks()
  }
}