

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

        if(this.grid.get(i,j) === CellState.EMPTY) {
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
            if(this.grid.get(curr[1],curr[0]) === CellState.VISITED) {
                this.grid.set(curr[1], curr[0], 4)
            }
            this.shortestPath.push(this.grid.pos_to_str(curr[0], curr[1]))
            curr = this.prev[this.grid.pos_to_str(curr[0], curr[1])]
        }
    }

    getShortestPath() {
        return this.shortestPath
    }

}