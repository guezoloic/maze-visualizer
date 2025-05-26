

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

        this.isLookingForPath = true
        this.isConstructingPath = false
    }
}