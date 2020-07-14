import cloneDeep from 'lodash/cloneDeep';

var counter;
function checkGrid(sudokuBoard) {
  for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (sudokuBoard[row][col] ===0) {
          return false;
        }
      }
  }

  //We have a complete grid!  
  return true; 
}

//A backtracking/recursive function to check all possible combinations of numbers until a solution is found
function fillGrid(sudokuBoard, numberList){
  //Find next empty cell
  for (let i = 0; i < 81; i++) {
    var row = Math.floor(i/9);
    var col = i % 9;
    if (sudokuBoard[row][col] === 0) {
      shuffleArray(numberList);      
      for (let k = 0; k < numberList.length; k++) {
        let value = numberList[k];
        //Check that this value has not already be used on this row
        if (!sudokuBoard[row].includes(value)) {
          //Check that this value has not already be used on this column
          if (sudokuBoard[0][col] !== value && sudokuBoard[1][col] !== value && sudokuBoard[2][col] !== value && sudokuBoard[3][col] !== value && sudokuBoard[4][col] !== value && sudokuBoard[5][col] !== value && sudokuBoard[6][col] !== value && sudokuBoard[7][col] !== value && sudokuBoard[8][col] !== value ) {
            //Identify which of the 9 squares we are working on
            let square=[];
            if (row < 3) {
              if (col<3) {
                for (let j = 0; j < 3; j++) {
                  square.push(sudokuBoard[j].slice(0, 3));
                }
              } else if (col < 6) {
                for (let j = 0; j < 3; j++) {
                  square.push(sudokuBoard[j].slice(3, 6));
                }
              } else {  
                for (let j = 0; j < 3; j++) {
                  square.push(sudokuBoard[j].slice(6, 9));
                }
              }
            } else if (row<6) {
              if (col < 3) {
                for (let j = 3; j < 6; j++) {
                  square.push(sudokuBoard[j].slice(0, 3));
                }
              } else if (col < 6) {
                for (let j = 3; j < 6; j++) {
                  square.push(sudokuBoard[j].slice(3, 6));
                }
              } else {  
                for (let j = 3; j < 6; j++) {
                    square.push(sudokuBoard[j].slice(6, 9));
                }
              }
            } else {
              if (col < 3) {
                for (let j = 6; j < 9; j++) {
                  square.push(sudokuBoard[j].slice(0, 3));
                }
              } else if (col < 6) {
                for (let j = 6; j < 9; j++) {
                  square.push(sudokuBoard[j].slice(3, 6));
                }
              } else {  
                for (let j = 6; j < 9; j++) {
                  square.push(sudokuBoard[j].slice(6, 9));
                }
              }
            }
            //Check that this value has not already be used on this 3x3 square 
            if (!square[0].includes(value) && !square[1].includes(value) && !square[2].includes(value)) {
              sudokuBoard[row][col] = value;
              if (checkGrid(sudokuBoard)) {
                return true;
              } else {
                if (fillGrid(sudokuBoard, numberList)){
                  return true;
                }
              }
            }
          }
        }
      }
      break;
    }
  }
  sudokuBoard[row][col]=0;  
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

//shuffle(numberList)
//A backtracking/recursive function to check all possible combinations of numbers until a solution is found
function solveGrid(sudokuBoard, numberList) {
  //Find next empty cell
  for (let i = 0; i < 81; i++) {
    var row = Math.floor(i/9);
    var col = i % 9;
    if (sudokuBoard[row][col] === 0) {   
      for (let value = 0; value < 10; value++) {
        //Check that this value has not already be used on this row
        if (!sudokuBoard[row].includes(value)) {
          //Check that this value has not already be used on this column
          if (sudokuBoard[0][col] !== value && sudokuBoard[1][col] !== value && sudokuBoard[2][col] !== value && sudokuBoard[3][col] !== value && sudokuBoard[4][col] !== value && sudokuBoard[5][col] !== value && sudokuBoard[6][col] !== value && sudokuBoard[7][col] !== value && sudokuBoard[8][col] !== value ) {
            //Identify which of the 9 squares we are working on
            let square=[];
            if (row<3) {
              if (col<3) {
                for (let j = 0; j < 3; j++) {
                  square.push(sudokuBoard[j].slice(0, 3));
                }
              } else if (col<6) {
                for (let j = 0; j < 3; j++) {
                  square.push(sudokuBoard[j].slice(3, 6));
                }
              } else {  
                for (let j = 0; j < 3; j++) {
                  square.push(sudokuBoard[j].slice(6, 9));
                }
              }
            } else if (row < 6) {
              if (col < 3) {
                for (let j = 3; j < 6; j++) {
                  square.push(sudokuBoard[j].slice(0, 3));
                }
              } else if (col < 6) {
                for (let j = 3; j < 6; j++) {
                  square.push(sudokuBoard[j].slice(3, 6));
                }
              } else {  
                for (let j = 3; j < 6; j++) {
                  square.push(sudokuBoard[j].slice(6, 9));
                }
              }
            } else { 
              if (col < 3) {
                for (let j = 6; j < 9; j++) {
                  square.push(sudokuBoard[j].slice(0, 3));
                }
              } else if (col < 6) {
                for (let j = 6; j < 9; j++) {
                  square.push(sudokuBoard[j].slice(3, 6));
                }
              } else {  
                for (let j = 6; j < 9; j++) {
                  square.push(sudokuBoard[j].slice(6, 9));
                }
              } 
            } 
            if (!square[0].includes(value) && !square[1].includes(value) && !square[2].includes(value)) {
              sudokuBoard[row][col] = value;
              if (checkGrid(sudokuBoard)) {
                counter += 1;
                break;
              } else {
                if (solveGrid(sudokuBoard, numberList, counter)){
                  return true;
                }
              }
            }
          }
        }
      }
      break;
    }
  }
  sudokuBoard[row][col] = 0;             
    
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


//Start Removing Numbers one by one
//A higher number of attempts will end up removing more numbers from the grid
//Potentially resulting in more difficiult grids to solve!
var counter = 1;

function buildPuzzle () {
  var sudokuBoard = Array(9);
  for (var row = 0; row < 9; row++) {
    sudokuBoard[row] = Array(9);
    for(var col = 0; col < 9; col++) {
      sudokuBoard[row][col] = 0;
    }
  }
  
  let numberList=[1,2,3,4,5,6,7,8,9];
  
  //Generate a Fully Solved Grid
  fillGrid(sudokuBoard, numberList);
  var attempts = 5; 
  
  while (attempts > 0) {
    //Select a random cell that is not already empty
    let row = getRandomInt(9);
    let col = getRandomInt(9);
    while (sudokuBoard[row][col] === 0) {
      row = getRandomInt(9);
      col = getRandomInt(9);
    }
    //Remember its cell value in case we need to put it back  
    let backup = sudokuBoard[row][col];
    //Take a full copy of the grid
    var copyBoard = cloneDeep(sudokuBoard);
    copyBoard[row][col] = 0;
    //Count the number of solutions that this grid has (using a backtracking approach implemented in the solveGrid() function)
    counter = 0;      
    solveGrid(copyBoard, numberList);   

    //If the number of solution is different from 1 then we need to cancel the change by putting the value we took away back in the grid
    if (counter!=1) {
      sudokuBoard[row][col]=backup;
      console.log('yaaaaay');
      //We could stop here, but we can also have another attempt with a different cell just to try to remove more numbers
      attempts -= 1;
    } else {
      var sudokuBoard = cloneDeep(copyBoard);
    }
  }
  return sudokuBoard;
}
export default buildPuzzle;