
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

        /** The number of maximum recorded actions in the undo stack */
        this.stack_limit = 200
    }

    /** Push to the undo stack a cell placement action*/
    recordCellPlacement(pos) {
        this._recordCell("add", pos)
    }

    recordCellRemoval(pos) {
        this._recordCell("remove", pos)
    }

    _recordCell(action, pos) {
        this.undo_stack.push({"action": action, "position": pos}) 

        if (this.undo_stack.length > this.stack_limit) {
            this.undo_stack.shift(); 
        }
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