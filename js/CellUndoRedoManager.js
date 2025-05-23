
/** Handles the cell placement history,
 *  and provide ability to undo / redo placements
 */
class CellUndoRedoManager {

    constructor(grid) {
        this.grid = grid
        /** The stack of the last cell actions (placement or removal)
         *  Contains 
         */
        this.undo_stack = []
        this.redo_stack = []
    }

    /** Push to the undo stack a cell position
     */
    recordCellPlacement(pos) {
        this.undo_stack.push({"action": "add", "position": pos}) 
        // TODO remove if too many elements in undostack
    }
    recordCellRemoval(pos) {
        this.undo_stack.push({"action": "remove", "position": pos}) 
    }

    undo() {
        if(this._undoStackEmpty()) return

        let last_action = this.undo_stack.pop()
        let pos = last_action["position"]
        
        if(last_action["action"] === "add") {
            this.grid.set(pos[0], pos[1], CellState.EMPTY)
        }
        else if(last_action["action"] === "remove") {
            this.grid.set(pos[0], pos[1], CellState.WALL)
        }

    }

    redo() {

    }

    resetHistory() {
        this.undo_stack = []
        this.redo_stack = []
    }
    
    _undoStackEmpty() {
        return this.undo_stack.length == 0
    }

}