class Row {
    constructor(rowIndex, board) {
        this.rowIndex = rowIndex;
        this.row = board[rowIndex];
    } 

    containsNumber(number) {
        for (let i = 0; i < 9; i++) {
            if (this.row[i].number === number) {
                return true;
            }
        }
        return false;
    }

    setUniqueSolution() {
        for (let number = 1; number <= 9; number++) {
            let count = 0;
            var uniqueIndex = null;
            for (let i = 0; i < 9; i++) {
                if (this.row[i].isNumberPossible(number)) {
                    count += 1;
                    if (count > 1) {
                        break;
                    } else {
                        uniqueIndex = i;
                    }
                }
            }
            if (uniqueIndex !== null && count === 1) {
                this.row[uniqueIndex].possibilities[number - 1].isUnique = true;
                this.row[uniqueIndex].possibilities[number - 1].styles = {
                    color: "rgb(9, 150, 19)"
                };
            }
        }
    }
}
export default Row;

