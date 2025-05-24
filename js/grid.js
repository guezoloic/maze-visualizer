
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

        // Start and end positions for the pathfinding algorithm
        // If multiple positions are placed, only the most recent one is stored
        this.start = start
        this.end = end

        this.initialize(start, end)
    }

    initialize(start, end) {
    
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

    /** Replace all the cell with VISITED or PATH state by empty ones */
    remove_visited_cells() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if(this.data[i][j] == CellState.VISITED || this.data[i][j] == CellState.PATH) {
                    this.data[i][j] = CellState.EMPTY;
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
            if(val !== CellState.START) {
                console.warn("replacing an existing CellState.START")
            }

            this.start = undefined
        }
        if(this.data[i][j] == CellState.END) {
            if(val !== CellState.END) {
                console.warn("replaced an existing CellState.END")
            }
            
            this.end = undefined
        }

        this.data[i][j] = val

        // Update start/end to point to the latest placed position
        if(val == CellState.START) {
            this.start = [j,i]
        }
        if(val == CellState.END) {
            this.end = [j,i]
        }

    }

    get(i, j) {
        return this.data[i][j]
    }

    get_start_pos() {
        return this.start
    }
    get_end_pos() {
        return this.end
    }
}


