let cellSize;
let currentAlgorithm;
let grid;
let posStart = [5, 5]
let posEnd = [19, 12]

function setup() {
    createCanvas(1000, 700);
    grid = new Grid(30, 16, posStart, posEnd)
    cellSize = width/grid.cols
    currentAlgorithm = new BfsState(grid, posStart, posEnd)
}

function mousePressed() {
}

function keyPressed() {
    // pause
    if (key === 'p') {
        if(currentAlgorithm.isRunning()) {
            currentAlgorithm.pause()
        } else {
            currentAlgorithm.resume()
        }
    }
    // reset
    if (key === 'r') {
        changeAlgorithm(new BfsState(grid, posStart, posEnd));
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
            if(mouseButton === LEFT) {
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

    background(220); 
    draw_grid()
}

function draw_grid() {
    for (let i = 0; i < grid.cols; i++) {
        for (let j = 0; j < grid.rows; j++) {

        stroke(0);
        noFill();
        rect(i * cellSize , j * cellSize ,cellSize ,cellSize );
            
        if (isMouseInCell(i, j)) {

            fill(0, 255, 0, 100);
            rect(i * cellSize , j * cellSize , cellSize ,cellSize );
        }

        // visited
        if(grid.get(j, i) == CellState.VISITED) {
            fill(0, 0, 255, 100);
        }
        // start
        if(grid.get(j, i)  == CellState.START) {
            fill(255, 0, 2, 255);
        }
        // end
        if(grid.get(j, i)  == CellState.END) {
            fill(25, 25, 0, 255);
        }
        // path start->end
        if(grid.get(j, i)  == CellState.PATH) {
            fill(25, 25, 66, 255);
        }        
        if(grid.get(j, i)  == CellState.WALL) {
            fill(0, 0, 0, 255);
        }

        rect(i * cellSize , j * cellSize , cellSize ,cellSize );
    }
}}

function isMouseInCell(i, j) {
    return mouseX > i * cellSize  && mouseX < (i + 1) * cellSize  && mouseY > j *cellSize  && mouseY < (j + 1) *cellSize 
}

function changeAlgorithm(newAlgorithm) {
    grid.generate(posStart, posEnd)
    currentAlgorithm = newAlgorithm
    // also pause the algorithm to let the user running it himself
    currentAlgorithm.pause()
}