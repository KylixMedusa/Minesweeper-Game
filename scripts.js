var node = document.getElementById("container");

var cols = 10,
  rows = 10;
var options = [];
var beesCount = 20;
var cells = [];

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let button = document.createElement('button');
    button.setAttribute('class', 'button');
    button.setAttribute('id', String(i * cols + j));
    button.setAttribute('onclick', "buttonReveal(this)")
    node.appendChild(button);
    options.push([i, j]);
    cells.push(new Cell(i, j));
  }
}

for (let i = 0; i < beesCount; i++) {
  let index = Math.floor(Math.random() * options.length);
  let point = options[index];
  let x = point[0];
  let y = point[1];
  options.splice(index, 1);
  cells[(x * cols) + y].bee = true;
}

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    cells[(i * cols) + j].countBees();
  }
}

function buttonReveal(item) {
  if (cells[parseInt(item.id)].bee) {
    document.getElementById(item.id).classList.add("attacked");
    revealAll();
  } else
    cells[parseInt(item.id)].reveal();
}


function revealAll() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cells[(i * cols) + j].reveal();
    }
  }
}