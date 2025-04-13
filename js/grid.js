
const CellState = Object.freeze({
    EMPTY: 0,
    VISITED: 1,
    START: 2,
    END: 3,
    PATH: 4,
    WALL:5
});

class Grid {

    constructor(cols,rows, start, end) {
        this.cols = cols
        this.rows = rows
        this.data = []
        this.start = start
        this.end = end
        this.generate(start, end)
    }

    generate(start, end) {
    
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
        this.data[start[1]][start[0]] = CellState.START
        this.data[end[1]][end[0]] = CellState.END
    }

    fill_empty_cells() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if(this.data[i][j] == CellState.EMPTY) {
                    this.data[i][j] = CellState.WALL;
                }
            }
        }
    }

    pos_to_str(i, j) {
        return `${i},${j}`
    }

    cell_in_grid(i, j) {
        return i >= 0 && j >= 0 && i < this.cols && j < this.rows
    }

    get_neighbors(i, j, dist=1) {
        let neighbors = []
        let directions = [[-dist, 0], [dist, 0], [0, -dist], [0, dist]]
    
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
        if(this.data[i][j] == CellState.START) {
            this.start = undefined
        }
        if(this.data[i][j] == CellState.END) {
            this.end = undefined
        }

        this.data[i][j] = val

    }

    get(i, j) {
        return this.data[i][j]
    }
}


