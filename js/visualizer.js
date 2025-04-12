let cellSize;
let currentAlgorithm;
let grid;
let posStart = [5, 5]
let posEnd = [19, 12]

function setup() {
    var canvas = createCanvas(1000, 533);
    canvas.parent("parent-div");

    grid = new Grid(30, 16, posStart, posEnd)
    cellSize = width/grid.cols
    currentAlgorithm = new BfsState(grid, posStart, posEnd)
}


function pauseOrResume() {
    if(currentAlgorithm.isRunning()) {
        currentAlgorithm.pause()
    } else {
        currentAlgorithm.resume()
    }
}

function resetGrid() {   
    changeAlgorithm(new BfsState(grid, posStart, posEnd));
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

function update() {
    if(!currentAlgorithm.isOver() && currentAlgorithm.isRunning()) {
        currentAlgorithm.nextStep()
    } 

    if(mouseIsPressed) {
            
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
        }
    }
}
  
function draw() {
    update()
    
    background(255)
    draw_grid()
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

            rect(i * cellSize , j * cellSize , cellSize ,cellSize );

            cellOpacity = invertOpacity(cellOpacity);
        }
    }
}

function isMouseInCell(i, j) {
    return mouseX > i * cellSize  && mouseX < (i + 1) * cellSize  && mouseY > j *cellSize  && mouseY < (j + 1) *cellSize 
}

function changeAlgorithm(newAlgorithm) {
    grid.generate(posStart, posEnd)
    currentAlgorithm = newAlgorithm
    // also pause the algorithm to let the user running the simulation it himself
    currentAlgorithm.pause()
}