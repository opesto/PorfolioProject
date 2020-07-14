class Box {
    constructor(boxIndex, board) {
        this.boxIndex = boxIndex;
        this.rowStartIndex = parseInt((Math.floor(this.boxIndex / 3)) * 3);
        this.rowEndIndex = parseInt(this.rowStartIndex + 2); 
        this.colStartIndex = parseInt((this.boxIndex % 3) * 3);
        this.colEndIndex = parseInt(this.colStartIndex + 2); 
        this.box = Array(3);

        for (var row = 0; row < 3; row++) {
            this.box[row] = Array(3).fill(null);
            for (var col = 0; col < 3; col++) {
                this.box[row][col] = board[row + this.rowStartIndex][col + this.colStartIndex];
            }
        }
    }

    containsNumber(number) {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.box[row][col].number === number) {
                    return true;
                }
            }
        }
        return false;
    }

    setUniqueSolution() {
        for (let number = 1; number <= 9; number++) {
            let count = 0;
            var uniqueRowIndex = null;
            var uniqueColIndex = null;
            var uniqueRowIndex2 = null;
            var uniqueColIndex2 = null;
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    if (this.box[row][col].isNumberPossible(number)) {
                        count += 1;
                        if (count > 2) {
                            break;
                        } else if (count == 2) {
                            uniqueRowIndex2 = row;
                            uniqueColIndex2 = col;
                        } else {
                            uniqueRowIndex = row;
                            uniqueColIndex = col;
                        }
                    }
                }
            }
            if (uniqueRowIndex !== null && uniqueColIndex !== null && count === 1) {
                this.box[uniqueRowIndex][uniqueColIndex].possibilities[number - 1].isUnique = true;
                this.box[uniqueRowIndex][uniqueColIndex].possibilities[number - 1].styles = {
                    color: "rgb(9, 150, 19)"
                };
            }
            if (uniqueRowIndex !== null && uniqueColIndex !== null && count === 2) {
                this.box[uniqueRowIndex][uniqueColIndex].possibilities[number - 1].isUnique = false;
                this.box[uniqueRowIndex][uniqueColIndex].possibilities[number - 1].styles = {
                    color: "rgb(248, 98, 248)"
                };
                this.box[uniqueRowIndex2][uniqueColIndex2].possibilities[number - 1].isUnique = false;
                this.box[uniqueRowIndex2][uniqueColIndex2].possibilities[number - 1].styles = {
                    color: "rgb(248, 98, 248)"
                };
            }
        }
    }
}
export default Box; 