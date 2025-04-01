
const CellState = Object.freeze({
    EMPTY: 0,
    VISITED: 1,
    START: 2,
    END: 3,
    PATH: 4
});

class Grid {

    constructor(cols,rows) {
        this.cols = cols
        this.rows = rows
        this.data = []
        this.init_grid()
    }

    init_grid() {
    
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }

    pos_to_str(i, j) {
        return `${i},${j}`
    }

    cell_in_grid(i, j) {
        return i >= 0 && j >= 0 && i < this.cols && j < this.rows
    }

    get_neighbors(i, j) {
        let neighbors = []
        let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    
        for(let index in directions) {
            let direction = directions[index]
            let pos = [i+direction[0], j+direction[1]]
            if(this.cell_in_grid(pos[0], pos[1])) {
                neighbors.push(pos)
            } 
        }
        return neighbors
    }

    set(i, j, val) {
        this.data[i][j] = val
    }

    get(i, j) {
        return this.data[i][j]
    }
}


