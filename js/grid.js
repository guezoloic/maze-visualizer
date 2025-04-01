
cols = 30
rows = 16

const grid = [];

function init_grid() {

    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
        }
    }
}

function cell_in_grid(i, j) {
    return i >= 0 && j >= 0 && i < cols && j < rows
}

function get_neighbors(i, j) {
    neighbors = []
    directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

    for(let index in directions) {
        direction = directions[index]
        pos = [i+direction[0], j+direction[1]]
        if(cell_in_grid(pos[0], pos[1])) {
            neighbors.push(pos)
        } 
    }
    return neighbors
}