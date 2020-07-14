import Cell from './Cell.js';
import Row from './Row.js';
import Col from './Col.js';
import Box from './Box.js';
import Possibility from './Possibility.js';

class SudokuBoard {
  constructor(isAnswersBoard) {
    this.isAnswersBoard = isAnswersBoard;
    this.board = Array(9);
    for (var row = 0; row < 9; row++) {
      this.board[row] = Array(9);
      for(var col = 0; col < 9; col++) {
        this.board[row][col] = new Cell(null, row, col, isAnswersBoard);
      }
    }
    
    this.boxes = Array(9);
    for (var box = 0; box < 9; box++) {
      this.boxes[box] = new Box(box, this.board);
    }

    this.rows = Array(9);
    for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
      this.rows[rowIndex] = new Row(rowIndex, this.board);
    }

    this.cols = Array(9);
    for (var colIndex = 0; colIndex < 9; colIndex++) {
      this.cols[colIndex] = new Col(colIndex, this.board);
    }
  }

  checkIfNumberPossibleInCell(cell, number) {
    if (cell.number === number) {
      return true;
    }

    if (cell.number !== null) {
      return false;
    }
  
    if (this.rows[cell.row].containsNumber(number)) {
      return false;
    }

    if (this.cols[cell.col].containsNumber(number)) {
      return false;
    }

    const boxIndex = this.getBoxIndex(cell);
    if (this.boxes[boxIndex].containsNumber(number)) {
        return false;
    }

    return true;
  }
  getBoxIndex(cell) {
    for (var i = 0; i < 9; i++) {
      const box =  this.boxes[i];
      if (cell.row <= box.rowEndIndex && cell.row >= box.rowStartIndex) {
        if (cell.col <= box.colEndIndex && cell.col >= box.colStartIndex) {
          return i;
        }
      }
    }
  }
  updateCellPossibilities(cell) {
    if (cell.number !== null) {
      return;
    }
    for (let i = 0; i <= 9; i++) {
      if (!this.checkIfNumberPossibleInCell(cell, i + 1)) {
        cell.possibilities[i].number = null;
      }
    }
  }
  updateAllCellPossibilities(updatedRow, updateCol) {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        if (rowIndex !== updatedRow || colIndex !== updateCol) {
          this.updateCellPossibilities(this.board[rowIndex][colIndex]);
          this.board[rowIndex][colIndex].setUniqueSolution();
        }
      }
      this.rows[rowIndex].setUniqueSolution();
      this.cols[rowIndex].setUniqueSolution();
      this.boxes[rowIndex].setUniqueSolution();
    }
  }

  addNumberToGameBoard(row, col, selectedNum) {
    if (this.isAnswersBoard) {
      if (this.board[row][col].includesPossibility(selectedNum)) {
        this.board[row][col].number = selectedNum;
        this.board[row][col].possibilities = Array(9).fill(new Possibility(null));
        this.board[row][col].possibilities[selectedNum - 1] = new Possibility(selectedNum);
        this.updateAllCellPossibilities(row, col);
      }
    } else {
      this.board[row][col].number = selectedNum;
    }
    return this; 
  }

  addNoteToGameBoard(row, col, selectedNote) {
    this.board[row][col].possibilities[selectedNote - 1] = new Possibility(selectedNote);
    return this; 
  }

}
export default SudokuBoard;