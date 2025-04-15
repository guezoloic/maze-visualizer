

class RandomizedDfs extends MazeGenAlgorithm {
    constructor(grid, start) { 
        super(grid, start)

        grid.fill_empty_cells()

        this.stack = []
        this.stack.push(start)
        this.visited = new Set()
        this.visited.add(this.grid.pos_to_str(start[1], start[0]))
        
    }

    nextStep() {
        if(this.hasNextStep()) {
            let curr = this.stack.pop()

            let neighbors = shuffleArray( this.grid.get_neighbors(curr[0], curr[1], 2))

            for(let neighbor of neighbors) {
                
                let str_neighbor = this.grid.pos_to_str(neighbor[0], neighbor[1])

                if(!this.visited.has(str_neighbor)) {

                    if(this.grid.get(neighbor[1], neighbor[0]) == CellState.WALL) {
                        this.grid.set(neighbor[1], neighbor[0], CellState.EMPTY)
                    }
                    let intermediate_cell = [(curr[0]+neighbor[0])/2, (curr[1]+neighbor[1])/2]

                    if(this.grid.get(intermediate_cell[1], intermediate_cell[0]) == CellState.WALL) {
                        this.grid.set(intermediate_cell[1], intermediate_cell[0], CellState.EMPTY)
                    }

                    this.stack.push(neighbor)
                    this.visited.add(str_neighbor)
                }
            }
            // TODO colorize
            /*if(this.grid.get(curr[1], curr[0]) != CellState.WALL) {
                this.grid.set(curr[1], curr[0], CellState.VISITED)
            }*/
        }
        //If the algorithm hasn't been marked as over, this is the last step so we mark it as finished
        else if(!this.isOver()) {
            this.finish()
        }
    }

    hasNextStep() {
        return this.stack.length > 0
    }
    finish() {
        super.finish()
    }
}