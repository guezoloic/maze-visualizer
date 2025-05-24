
/** Handles drag and drop of draggable cells (Start and end cells) on the grid.  */
class CellDragger {

    constructor(grid) {

        // true if dragging a cell false else
        this.dragging = false
        // dragged cell original pos
        this.dragged_cell_pos = undefined
        this.grid = grid
        
    }

    /** Returns true if a cell is being dragging */
    isDragging() {
        return this.dragging
    }

    dragCell(i, j) {
        this.dragging = true
        this.dragged_cell_pos = [i,j]
    }

    cellDragged(i, j) {
        if(!this.dragging) {
            return false;
        }
        return j == this.dragged_cell_pos[0] && i == this.dragged_cell_pos[1]
    }

    isCellDraggable(i, j) {
        let draggable_cell_states = [CellState.START, CellState.END]

        for(let dragging_cell_state of draggable_cell_states) {

            if(this.grid.get(j, i) == dragging_cell_state) {
                return true
            }
        } 
        return false
    }

    canDropTo(i, j) {
        return this.grid.cell_in_grid(i, j) && this.grid.get(j,i) === CellState.EMPTY
    }

    dropTo(i, j) {

        let dragged_cell_state = this.grid.get(this.dragged_cell_pos[1], this.dragged_cell_pos[0])
        this.grid.set(this.dragged_cell_pos[1], this.dragged_cell_pos[0], CellState.EMPTY)
        this.grid.set(j, i, dragged_cell_state)
    }

    releaseDragged() {

        this.dragging = false
        this.dragged_cell_pos = undefined
    }
}