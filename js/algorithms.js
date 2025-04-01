


/** A class that represents an algorithm, 
 * it used to execute an algorithm step by step, 
 * allowing to control its execution and draw the grid at each step
 * 
 */
class AlgoState {

    constructor() {
        this.running = true   // TODO change
    }
    nextStep() {}
    isOver() {
        return true;
    }
}

class PathFindingAlgoState extends AlgoState {
    
    constructor(grid, start) {
        super()
        this.shortestPath = []
    }

    getShortestPath() {
    }
}

class BfsState extends PathFindingAlgoState {

    constructor(grid, start, end) {
        super()
        this.grid = grid;
        
        this.visited = new Set()
        this.queue = []
        this.queue.push(start)
        this.visited.add(start)
        this.prev = {}

        for(let i = 0 ; i < cols; i++) {
            for(let j = 0; j < rows; j++) {
                this.prev[this.pos_to_str(i, j)] = undefined
            }
        }

        this.end = end;

        this.shortestPath = new Set()

    }

    pos_to_str(x, y) {
        return `${x},${y}`
    }

    nextStep() {
        if(this.isOver()) return

        let curr = this.queue.at(0)
        this.queue.shift()

        let j = curr[0]
        let i = curr[1]
        this.grid[i][j] = 1

        if(this.targetFound(curr)) {
            this.running = false
            this.finish()
            return
        }
        
        this.visited.add(this.pos_to_str(j, i))

        for(let neighbor of get_neighbors(curr[0], curr[1])) {
            let str_neighbor = this.pos_to_str(neighbor[0], neighbor[1])
            if(!this.visited.has(str_neighbor)) {
                
                this.queue.push(neighbor)
                this.visited.add(str_neighbor)

                this.prev[str_neighbor] = curr
            }
        }
    }

    targetFound(curr) {
        return curr[0] === this.end[0] && curr[1] === this.end[1]
    }
    
    isOver() {
        return this.queue.length <= 0 || !this.running
    }

    getShortestPath() {
        return this.shortestPath
    }

    finish() {
        this.constructShortestPath()
    }

    constructShortestPath() {

        let curr = this.end 
        while(curr !== undefined) {
            this.grid[curr[1]][curr[0]] = 4
            this.shortestPath.add(this.pos_to_str(curr[0], curr[1]))
            curr = this.prev[this.pos_to_str(curr[0], curr[1])]
        }

    }
}
