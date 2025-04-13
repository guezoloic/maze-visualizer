

/** A class that represents an algorithm that can be executed step by step, 
 *  allowing to control its execution and providing the ability to 
 *  visualize each step (such as drawing a grid at each step).
 * 
 *  This class can be extended to implement specific algorithms, such as pathfinding, sorting, etc.
 */
class RealtimeAlgorithm {

    constructor() {
        this.running = true   // TODO change
        this.over = false
    }
    /** Execute the code for a single step in a loop / recursion
     *  Acts like the body of a loop.
     *  Must be implemented by subclasses.
    */
    nextStep() {
        throw new Error("Must implement method when inheriting");
    }

    /** Used in nextstep function, indicates if the algorithm should continue
     *  It acts as the condition in while loop for recursion.
     *  Must be implemented by subclasses.
    */
    hasNextStep() {
        throw new Error("Must implement hasNextStep");
    }

    /** Method to use when the algorithm is considered finished 
     *  Must call **`super.finish()`** to ensure the algorithm is set as over
    */
    finish() {
        this.over = true
    }

    isOver() {
        return this.over
    }

    isRunning() {
        return this.running
    }

    pause() {
        this.running = false
    }
    resume() {
        this.running = true
    }
}

class PathFindingAlgorithm extends RealtimeAlgorithm {
    
    constructor(grid, start, end) {
        super()

        this.grid = grid;
        this.shortestPath = []
        /** A set of the cell preceding others */
        this.prev = {}

        this.start = start
        /** Target pos */
        this.end = end
        this.running = true
    }

    getShortestPath() {}
}

class Bfs extends PathFindingAlgorithm {

    constructor(grid, start, end) {
        super(grid, start, end)
        
        this.visited = new Set()
        this.queue = []
        this.queue.push(start)
        this.visited.add(start)

        for(let i = 0 ; i < grid.cols; i++) {
            for(let j = 0; j < grid.rows; j++) {
                this.prev[this.grid.pos_to_str(i, j)] = undefined
            }
        }
    }


    nextStep() {
        if(!this.hasNextStep()) return

        let curr = this.queue.at(0)
        this.queue.shift()

        let j = curr[0]
        let i = curr[1]

        if(this.targetFound(curr)) {
            this.finish()
            return
        }
        
        this.visited.add(this.grid.pos_to_str(j, i))

        for(let neighbor of this.grid.get_neighbors(curr[0], curr[1])) {
            let str_neighbor = this.grid.pos_to_str(neighbor[0], neighbor[1])
            if(!this.visited.has(str_neighbor) && this.grid.get(i, j) != CellState.WALL) {
                
                this.queue.push(neighbor)
                this.visited.add(str_neighbor)

                this.prev[str_neighbor] = curr
            } 
        }

        if(this.grid.get(i,j) != CellState.WALL) {
            this.grid.set(i, j, 1)
        }
    }
    hasNextStep() {
        return this.queue.length > 0
    }

    targetFound(curr) {
        return curr[0] === this.end[0] && curr[1] === this.end[1]
    }
    
    finish() {
        super.finish()
        this.constructShortestPath()
    }
    
    constructShortestPath() {

        let curr = this.end 
        while(curr !== undefined) {
            this.grid.set(curr[1], curr[0], 4)
            this.shortestPath.push(this.grid.pos_to_str(curr[0], curr[1]))
            curr = this.prev[this.grid.pos_to_str(curr[0], curr[1])]
        }
    }

    getShortestPath() {
        return this.shortestPath
    }

}

class MazeGenAlgorithm extends RealtimeAlgorithm{
    constructor(grid, start) {
        super()
        this.grid = grid
        this.start = start
    }
}

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