


/** A class that represents an algorithm, 
 * it used to execute an algorithm step by step, 
 * allowing to control its execution and draw the grid at each step
 * 
 */
class AlgoState {

    constructor() {
        this.running = true   // TODO change
    }
    /** Execute the code for a single step in a loop / recursion */
    nextStep() {}
    isOver() {
        return true;
    }
}

class PathFindingAlgoState extends AlgoState {
    
    constructor(grid, start, end) {
        super()

        this.grid = grid;
        this.shortestPath = []
        /** A set of the cell preceding others */
        this.prev = {}

        this.start = start
        /** Target pos */
        this.end = end
        
        this.over = false
        this.running = true
    }

    getShortestPath() {}
    finish() {
        this.over = true
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

class BfsState extends PathFindingAlgoState {

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
        if(this.isOver()) return

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

    targetFound(curr) {
        return curr[0] === this.end[0] && curr[1] === this.end[1]
    }
    
    isOver() {
        return this.queue.length <= 0 || this.over
    }

    getShortestPath() {
        return this.shortestPath
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
}
