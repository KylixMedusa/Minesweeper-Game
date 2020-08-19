var cols = 10, rows = 10;
var w;
var h;
var cells = [];
var options = [];
var beesCount = 20;

function setup() {
  createCanvas(400, 400);
  w = width / cols;
  h = height / rows;
  for (let i = 0; i < rows; i++) {
    cells[i] = [];
    for (let j = 0; j < cols; j++) {
      cells[i][j] = new Cell(i * w, j * h, w, h);
      options.push([i,j]);
    }
  }
  for (let i = 0; i < beesCount; i++) {
    let index = floor(random(options.length));
    let point = options[index];
    let x = point[0];
    let y = point[1];
    options.splice(index,1);
    cells[x][y].bee = true;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cells[i][j].countBees();
    }
  }
}

function mousePressed() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      let cell = cells[i][j];
      if (cell.x < mouseX && cell.x + this.w > mouseX && cell.y < mouseY && cell.y + this.h > mouseY)
        if(!cell.bee)
          cell.reveal();
        else
        {
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              cells[i][j].revealed = true;
            }
          }
          console.log("Game Over!!!");
        }
    }
  }
}

function draw() {
  background(255);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cells[i][j].show();
    }
  }
}