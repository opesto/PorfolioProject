import Possibility from "./Possibility";

class Cell {
    constructor(number, row, col, isAnswerCell) {
        this.number = number;
        this.row = row;
        this.col = col;

        if (isAnswerCell) {
            this.possibilities = [new Possibility(1), new Possibility(2), new Possibility(3), new Possibility(4), new Possibility(5), new Possibility(6), new Possibility(7), new Possibility(8), new Possibility(9)];
        } else {
            this.possibilities = Array(9).fill(new Possibility(null));
        }
        
        if (number !== null){
            this.possibilities = Array(9).fill(new Possibility(null));
            this.possibilities[number - 1] = new Possibility(number);
        }
    }

    isNumberPossible(number) {
        return this.possibilities[number - 1].number === number;
    }

    setUniqueSolution() {
        let count = 0;
        let number = null;
        for (let i = 0; i < 9; i++) {
            if (this.possibilities[i].number === null) {
                count += 1;
            } else {
                number = this.possibilities[i].number;
            }
        }
        if (count === 8) {
            this.possibilities[number - 1].isUnique = true;
            this.possibilities[number - 1].styles = {
                color: "rgb(9, 150, 19)"
            };
        } 
    }

    includesPossibility(number) {
        for (let i = 0; i < 9; i++) {
            if (this.possibilities[i].number === number) {
                return true;
            }
        }
        return false;
    }
}
export default Cell;