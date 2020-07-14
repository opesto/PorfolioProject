import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../static/sudoku/blah.css';
import buildPuzzle from '../services/sudokuPuzzleGenerator';
import SudokuBoard from './SudokuBoard';
import Possibility from './Possibility.js';
import cloneDeep from 'lodash/cloneDeep';
import Switch from "react-switch";
import {render} from 'react-dom';

function getNoteList(number) {
  var noteList = Array(9).fill(new Possibility(null));
  noteList[number-1] = new Possibility(number);
  return noteList;

}

function Square(props) {
  var styles = {
    color: props.color,
    'border-right': props.borderRight,
    'border-left': props.borderLeft
  }
  return (
    <div >
    <button className="square" style={styles} onClick={props.onClick}>
      {props.value}
      
    </button>
    </div>
  );
}
  
class BoardComponent extends React.Component {
  constructor(props) {
    super(props);
    var generatedBoard = buildPuzzle();
    var sudokuBoard = new SudokuBoard(false);
    var answersBoard = new SudokuBoard(true);
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (generatedBoard[row][col] !== 0) { 
          sudokuBoard.addNumberToGameBoard(row, col, generatedBoard[row][col]);
          answersBoard.addNumberToGameBoard(row, col, generatedBoard[row][col]);
        }
      }
    }

    this.handleHint = this.handleHint.bind(this);
    this.state = {
      isHintButtonPressed: false,
      lockBoard: false,
      selectedRow: null,
      selectedCol: null,
      selectedNum: null,
      selectedNote: null,
      sudokuGameBoard: sudokuBoard,
      history: [sudokuBoard],
      answersHistory: [answersBoard],
      answersBoard: answersBoard
    };
    
  }

  handleHint(isHintButtonPressed) {
    this.setState({ isHintButtonPressed });
  }

  undoMove() {
    let history = this.state.history;
    let answersHistory = this.state.answersHistory;
    history.pop();
    answersHistory.pop();
    var gameBoard = this.state.history[this.state.history.length - 1];
    var newAnswersBoard = this.state.answersHistory[this.state.answersHistory.length - 1];
    this.setState({
      lockBoard: false,
      history: history,
      answersHistory: answersHistory,
      selectedRow: null,
      selectedCol: null,
      selectedNum: null,
      selectedNote: null,
      sudokuGameBoard: gameBoard,
      answersBoard: newAnswersBoard
    })
  }

  noteClick(num) {
    this.setState({
      selectedNote: num
    })
  }

  numberClick(num) {
    this.setState({
      selectedNum: num
    })
  }

  handleClick(row, col) {
    if (this.state.lockBoard) {
      alert('Please undo your last move!')
      return;
    }
    if (this.state.selectedNote !== null) { 
      let newSelectedNote = this.state.selectedNote;

      var newSudokuGameBoard = cloneDeep(this.state.sudokuGameBoard);
      var newAnswersBoard = cloneDeep(this.state.answersBoard);
      newSudokuGameBoard = newSudokuGameBoard.addNoteToGameBoard(row, col, newSelectedNote);
      let history = this.state.history;
      let answersHistory = this.state.answersHistory;

      if (history.length === 5) {
        history.shift();
      }
      if (answersHistory.length === 5) {
        answersHistory.shift();
      }

      this.setState({
        sudokuGameBoard: newSudokuGameBoard,
        history: history.concat([newSudokuGameBoard]),
        answersHistory: answersHistory.concat([newAnswersBoard]),
        selectedRow: null,
        selectedCol: null,
        selectedNum: null,
      })
    }
    if (this.state.selectedNum !== null) { 
      let newSelectedNum = this.state.selectedNum;

      var newSudokuGameBoard = cloneDeep(this.state.sudokuGameBoard);
      var newAnswersBoard = cloneDeep(this.state.answersBoard);
      
      let newLockBoard = this.state.lockBoard;
      let history = this.state.history;
      let answersHistory = this.state.answersHistory;
      if (!newAnswersBoard.board[row][col].includesPossibility(newSelectedNum)) {
        newLockBoard = true;
      }
      newSudokuGameBoard = newSudokuGameBoard.addNumberToGameBoard(row, col, newSelectedNum);
      newAnswersBoard = newAnswersBoard.addNumberToGameBoard(row, col, newSelectedNum);
      
      if (history.length === 5) {
        history.shift();
      }
      if (answersHistory.length === 5) {
        answersHistory.shift();
      }

      this.setState({
        sudokuGameBoard: newSudokuGameBoard,
        history: history.concat([newSudokuGameBoard]),
        answersHistory: answersHistory.concat([newAnswersBoard]),
        selectedRow: null,
        selectedCol: null,
        selectedNum: null,
        lockBoard: newLockBoard,
        answersBoard: newAnswersBoard
      })
    }
  }

  renderSquare(row, col) {
    let cell;
    if (this.state.isHintButtonPressed) {
      cell = this.state.answersBoard.board[row][col];
    } else {
      cell = this.state.sudokuGameBoard.board[row][col];
    }
    
    if (cell.number === null) {
      return (this.possibilities(cell.possibilities, row, col));
    }
    else {
      let color = "#000000";
      let borderRight = '1px solid #999'
      let borderLeft = '1px solid #999'
      if (col === 8 || col === 5 || col === 2) {
        borderRight = 'solid black'
      }
      if (col === 0) {
        borderLeft = 'solid black'
      }

      if (!this.state.answersBoard.board[row][col].includesPossibility(cell.number)) {
        color = "#ff0000";
      }
      return ( 
        <Square 
          value = {cell.number}
          color = {color}
          borderRight = {borderRight}
          borderLeft = {borderLeft}
          onClick={() => this.handleClick(row, col)}
        />);
    }
  }

  numbers(i) {
    return(
      <button className="number" onClick={() => this.numberClick(i)}>
       {i} 
      </button>
    );
  }

  possibilities(possibilities, row, col) {
    return( 
      <button className="possibilities" 
      onClick={() => this.handleClick(row, col)}>
      <tr id = "noteTable">
        <td style={possibilities[0].styles}>{possibilities[0].number}</td>
        <td style={possibilities[1].styles}>{possibilities[1].number}</td>
        <td style={possibilities[2].styles}>{possibilities[2].number}</td>
      </tr>
      <tr id = "noteTable">
        <td style={possibilities[3].styles}>{possibilities[3].number}</td>
        <td style={possibilities[4].styles}>{possibilities[4].number}</td>
        <td style={possibilities[5].styles}>{possibilities[5].number}</td>
      </tr>
      <tr id = "noteTable">
        <td style={possibilities[6].styles}>{possibilities[6].number}</td>
        <td style={possibilities[7].styles}>{possibilities[7].number}</td>
        <td style={possibilities[8].styles}>{possibilities[8].number}</td>
      </tr></button>
    );
    }

  note(notes, num) {
    return( 
      <button className="note" 
      onClick={() => this.noteClick(num)}>
      <tr id = "noteTable">
        <td style={notes[0].styles}>{notes[0].number}</td>
        <td style={notes[1].styles}>{notes[1].number}</td>
        <td style={notes[2].styles}>{notes[2].number}</td>
      </tr>
      <tr id = "noteTable">
        <td style={notes[3].styles}>{notes[3].number}</td>
        <td style={notes[4].styles}>{notes[4].number}</td>
        <td style={notes[5].styles}>{notes[5].number}</td>
      </tr>
      <tr id = "noteTable">
        <td style={notes[6].styles}>{notes[6].number}</td>
        <td style={notes[7].styles}>{notes[7].number}</td>
        <td style={notes[8].styles}>{notes[8].number}</td>
      </tr></button>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2)}
          {this.renderSquare(0, 3)}
          {this.renderSquare(0, 4)}
          {this.renderSquare(0, 5)}
          {this.renderSquare(0, 6)}
          {this.renderSquare(0, 7)}
          {this.renderSquare(0, 8)}
        </div>
        <div className="board-row">
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
          {this.renderSquare(1, 3)}
          {this.renderSquare(1, 4)}
          {this.renderSquare(1, 5)}
          {this.renderSquare(1, 6)}
          {this.renderSquare(1, 7)}
          {this.renderSquare(1, 8)}
        </div>
        <div className="board-row">
          {this.renderSquare(2, 0)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
          {this.renderSquare(2, 3)}
          {this.renderSquare(2, 4)}
          {this.renderSquare(2, 5)}
          {this.renderSquare(2, 6)}
          {this.renderSquare(2, 7)}
          {this.renderSquare(2, 8)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, 0)}
          {this.renderSquare(3, 1)}
          {this.renderSquare(3, 2)}
          {this.renderSquare(3, 3)}
          {this.renderSquare(3, 4)}
          {this.renderSquare(3, 5)}
          {this.renderSquare(3, 6)}
          {this.renderSquare(3, 7)}
          {this.renderSquare(3, 8)}
        </div>
        <div className="board-row">
          {this.renderSquare(4, 0)}
          {this.renderSquare(4, 1)}
          {this.renderSquare(4, 2)}
          {this.renderSquare(4, 3)}
          {this.renderSquare(4, 4)}
          {this.renderSquare(4, 5)}
          {this.renderSquare(4, 6)}
          {this.renderSquare(4, 7)}
          {this.renderSquare(4, 8)}
        </div>
        <div className="board-row">
          {this.renderSquare(5, 0)}
          {this.renderSquare(5, 1)}
          {this.renderSquare(5, 2)}
          {this.renderSquare(5, 3)}
          {this.renderSquare(5, 4)}
          {this.renderSquare(5, 5)}
          {this.renderSquare(5, 6)}
          {this.renderSquare(5, 7)}
          {this.renderSquare(5, 8)}
        </div>
        <div className="board-row">
          {this.renderSquare(6, 0)}
          {this.renderSquare(6, 1)}
          {this.renderSquare(6, 2)}
          {this.renderSquare(6, 3)}
          {this.renderSquare(6, 4)}
          {this.renderSquare(6, 5)}
          {this.renderSquare(6, 6)}
          {this.renderSquare(6, 7)}
          {this.renderSquare(6, 8)}
        </div>
        <div className="board-row">
          {this.renderSquare(7, 0)}
          {this.renderSquare(7, 1)}
          {this.renderSquare(7, 2)}
          {this.renderSquare(7, 3)}
          {this.renderSquare(7, 4)}
          {this.renderSquare(7, 5)}
          {this.renderSquare(7, 6)}
          {this.renderSquare(7, 7)}
          {this.renderSquare(7, 8)}
        </div>
        <div className="board-row">
          {this.renderSquare(8, 0)}
          {this.renderSquare(8, 1)}
          {this.renderSquare(8, 2)}
          {this.renderSquare(8, 3)}
          {this.renderSquare(8, 4)}
          {this.renderSquare(8, 5)}
          {this.renderSquare(8, 6)}
          {this.renderSquare(8, 7)}
          {this.renderSquare(8, 8)}
        </div>
        <br></br>
        <div id="container">
        <div className="numbers">
          {this.numbers(1)}
          {this.numbers(2)}
          {this.numbers(3)}
          {this.numbers(4)}
          {this.numbers(5)}
          {this.numbers(6)}
          {this.numbers(7)}
          {this.numbers(8)}
          {this.numbers(9)}
        </div>
        <div>
          {this.note(getNoteList(1), 1)}
          {this.note(getNoteList(2), 2)}
          {this.note(getNoteList(3), 3)}
          {this.note(getNoteList(4), 4)}
          {this.note(getNoteList(5), 5)}
          {this.note(getNoteList(6), 6)}
          {this.note(getNoteList(7), 7)}
          {this.note(getNoteList(8), 8)}
          {this.note(getNoteList(9), 9)}
        </div>
        </div>
        <div className="buttons">
          <button className="undoButton" onClick={() => this.undoMove()}>Undo</button>
          <Switch className="switch" onChange={this.handleHint} checked={this.state.isHintButtonPressed}/>
          </div>
      </React.Fragment>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="container text-center">
        <div className="game-board">
          <BoardComponent />
        </div>
      </div>);
  }
}

export default Game;

const container = document.getElementById("app");
render(<Game />, container);