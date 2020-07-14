class Col {
    constructor(colIndex, board) {
        this.colIndex = colIndex;
        this.col = [];
        for (var row = 0; row < 9; row++) {
            this.col.push(board[row][colIndex]);
        }
    }

    containsNumber(number) {
        for (var i = 0; i < 9; i++) {
            if (this.col[i].number === number) {
                return true;
            }
        }
        return false;
    }

    setUniqueSolution() {
        for (let number = 1; number < 9; number++) {
            let count = 0;
            var uniqueIndex = null;
            for (let i = 0; i < 9; i++) {
                if (this.col[i].isNumberPossible(number)) {
                    count += 1;
                    if (count > 1) {
                        break;
                    } else {
                        uniqueIndex = i;
                    }
                }
            }
            if (uniqueIndex !== null && count === 1) {
                this.col[uniqueIndex].possibilities[number - 1].isUnique = true;
                this.col[uniqueIndex].possibilities[number - 1].styles = {
                    color: "rgb(9, 150, 19)"
                };
            }
        }
    }
}
export default Col;