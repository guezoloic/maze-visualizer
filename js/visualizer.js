let cellSize;
let currentAlgorithm;
let start = [5, 5];
let end = [19, 12]

function setup() {
    createCanvas(1000, 700);
    cellSize = width/cols;
    init_grid()

    grid[start[1]][start[0]] = 2
    grid[end[1]][end[0]] = 3

    currentAlgorithm = new BfsState(grid,start, end)
}

function mousePressed() {
    let i = Math.floor(mouseX / cellSize)
    let j = Math.floor(mouseY / cellSize)
    console.log(grid[j][i])
}

function update() {
    if(!currentAlgorithm.isOver()) {
        currentAlgorithm.nextStep()
    } 
}
  
function draw() {
    update()

    background(220); 
    draw_grid()
}

function draw_grid() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

        stroke(0);
        noFill();
        rect(i * cellSize , j * cellSize ,cellSize ,cellSize );
            
        if (isMousePosInCell(i, j)) {

            fill(0, 255, 0, 100);
            rect(i * cellSize , j * cellSize , cellSize ,cellSize );
        }

        // visited
        if(grid[j][i] == 1) {
            fill(0, 0, 255, 100);
        }
        // start
        if(grid[j][i] == 2) {
            fill(255, 0, 2, 255);
        }
        // end
        if(grid[j][i] == 3) {
            fill(25, 25, 0, 255);
        }
        // path start->end
        if(grid[j][i] == 4) {
            fill(25, 25, 66, 255);
        }

        rect(i * cellSize , j * cellSize , cellSize ,cellSize );
    }
}}

function isMousePosInCell(i, j) {
    return mouseX > i * cellSize  && mouseX < (i + 1) * cellSize  && mouseY > j *cellSize  && mouseY < (j + 1) *cellSize 
}