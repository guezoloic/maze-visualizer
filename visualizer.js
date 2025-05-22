let cellSize = 33;
let currentAlgorithm;
let grid;

// true if dragging a cell false else
let dragging_cell = false
let dragged_cell_pos = undefined

function cell_dragged(i, j) {
    if(!dragging_cell) {
        return false;
    }
    return j == dragged_cell_pos[0] && i == dragged_cell_pos[1]
}

function is_cell_draggable(i, j) {
    let draggable_cell_states = [CellState.START, CellState.END]

    for(let dragging_cell_state of draggable_cell_states) {

        if(grid.get(j, i) == dragging_cell_state) {
            return true
        }
    } 
    return false
}

function can_move_dragged_to(i, j) {
    return grid.cell_in_grid(i, j) && grid.get(j,i) === CellState.EMPTY
}

function move_dragged_to(i, j) {

    let dragged_cell_state = grid.get(dragged_cell_pos[1], dragged_cell_pos[0])
    grid.set(dragged_cell_pos[1], dragged_cell_pos[0], CellState.EMPTY)
    grid.set(j, i, dragged_cell_state)
}

function undrag_cell() {

    dragging_cell = false
    dragged_cell_pos = undefined
}

function setup() {
    var canvas = createCanvas(1000, 533); // set default size before changing it
    canvas.parent("canva-parent");
    
    adjustCanvasAndGrid()
    
    // set a default algorithm
    currentAlgorithm = new Bfs(grid, [5, 5], [6, 15])
    currentAlgorithm.pause()
    
}

function adjustCanvasAndGrid() {

    let parentDiv = select("#canva-parent");  
    let divWidth = parentDiv.elt.offsetWidth; 
    let divHeight = parentDiv.elt.offsetHeight;
    
    let rows = Math.floor(divWidth / cellSize);
    let cols = Math.floor(divHeight / cellSize);

    resizeCanvas(rows * cellSize, cols * cellSize);

    grid = new Grid(rows, cols,  [5, 5], [6, 15])
}
  
function draw() {
    update()
    
    // change mouse cursor appearance
    cursor(CROSS);

    background(255)
    draw_grid()
}

function update() {
    if(!currentAlgorithm.isOver() && currentAlgorithm.isRunning()) {
        currentAlgorithm.nextStep()
    } 

    if(mouseIsPressed && !dragging_cell) {
        // TODO stop/reset if a simulation is running
        let i = Math.floor(mouseX / cellSize)
        let j = Math.floor(mouseY / cellSize)
        if(grid.cell_in_grid(i, j)) {
            if(mouseButton === LEFT && grid.get(j, i) == CellState.EMPTY) {
                grid.set(j, i, CellState.WALL)
            } 
            if(mouseButton == RIGHT) {
                grid.set(j, i, CellState.EMPTY)
            }
            //TODO reset current algorithm if cell dragged
            if(is_cell_draggable(i,j)) {
                dragging_cell = true
                dragged_cell_pos = [i,j]
            }
        }
    }
}

function mouseReleased() {
    if(dragging_cell) {

        let i = Math.floor(mouseY / cellSize)
        let j = Math.floor(mouseX / cellSize)

        if(can_move_dragged_to(j, i)) {
            move_dragged_to(j, i)
        }
        undrag_cell()

    }
}

function invertOpacity(opacity) {
    if(opacity == 250) {
        return 230
    } else {
        return 250
    }
}

function draw_grid() {
    let cellOpacity = 250
    for (let i = 0; i < grid.cols; i++) {

        if(grid.rows % 2 == 0) {
            cellOpacity = invertOpacity(cellOpacity)
        }

        for (let j = 0; j < grid.rows; j++) {
            
            noStroke();
            fill(cellOpacity);
            rect(i * cellSize , j * cellSize ,cellSize ,cellSize );
            
                
            if (isMouseInCell(i, j)) {

                fill(0, 0, 0, 90);
                rect(i * cellSize , j * cellSize , cellSize ,cellSize );
            }

            if(!cell_dragged(j, i)) {
                // visited
                if(grid.get(j, i) == CellState.VISITED) {
                    fill(153, 153, 238, 255);
                }
                // start
                if(grid.get(j, i)  == CellState.START) {
                    fill(59, 179, 65, 255);
                }
                // end
                if(grid.get(j, i)  == CellState.END) {
                    fill(184, 62, 93, 255);
                }
                // path start->end
                if(grid.get(j, i)  == CellState.PATH) {
                    fill(217, 255, 3, 255);
                }        
                if(grid.get(j, i)  == CellState.WALL) {
                    fill(0, 0, 0, 255);
                }
            }

            rect(i * cellSize , j * cellSize , cellSize ,cellSize );

            cellOpacity = invertOpacity(cellOpacity);
        }
    }
}

/**  Inverts running state, if pause -> resume , if resume -> pause */
function pauseOrResume() {
    if(currentAlgorithm.isRunning()) {
        currentAlgorithm.pause()
    } else {
        currentAlgorithm.resume()
    }
}

function resetGrid() {  
    currentAlgorithm.finish()
    let posStart = grid.get_start_pos()
    let posEnd = grid.get_end_pos()
    grid.generate(posStart, posEnd)
}

function keyPressed() {
    // pause
    if (key === 'p') {
        pauseOrResume()
    }
    // reset
    if (key === 'r') {
        resetGrid()
    }
}

function resume() {
    currentAlgorithm.resume()
}

function windowResized() {
    adjustCanvasAndGrid()
    resetGrid()
}


function isMouseInCell(i, j) {
    return mouseX > i * cellSize  && mouseX < (i + 1) * cellSize  && mouseY > j *cellSize  && mouseY < (j + 1) *cellSize 
}

function changeAlgorithm(newAlgorithm) {
    currentAlgorithm = newAlgorithm
}


function runMazeGeneration() {
    resetGrid()

    let selectElement = document.getElementById("maze-gen-select");
    let selectedAlgorithm = selectElement.value;

    if(selectedAlgorithm == "randomized-dfs") {
        changeAlgorithm(new RandomizedDfs(grid, grid.get_start_pos()));
    } else if(selectedAlgorithm == "recursive-division") {
        changeAlgorithm(new RecursiveDivision(grid, grid.get_start_pos()));
    } else {
        console.error("Selected algorithm doesn't exists")
    }

}
function runPathFinding() {
    grid.remove_visited_cells()

    let selectElement = document.getElementById("path-finding-select");
    let selectedAlgorithm = selectElement.value;

    if(selectedAlgorithm === "bfs") {
        changeAlgorithm(new Bfs(grid, grid.get_start_pos(), grid.get_end_pos()));
    } else {
        console.error("Selected algorithm doesn't exists")
    }
}