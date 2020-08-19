class Cell {

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.neighboursBeesCount = 0;
    this.bee = false;
    this.revealed = false;
  }

  countBees() {
    let total = 0;
    if (!this.bee) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // console.log("Working");
          let xoff = this.x / this.w + i;
          let yoff = this.y / this.h + j;
          if (xoff > -1 && xoff < cols && yoff > -1 && yoff < rows) {
            let neighbour = cells[xoff][yoff];
            if (neighbour.bee)
              total++;
          }
        }
      }
    }
    else
      total=-1;
    this.neighboursBeesCount = total;
  }

  show() {
    noFill();
    rect(this.x, this.y, w, h);
    if (this.revealed) {
      if (this.bee) {
        fill(220);
        circle(this.x + w / 2, this.y + h / 2, w / 2);
      } else {
        fill(220);
        rect(this.x, this.y, w, h);
        if (this.neighboursBeesCount > 0) {
          fill(0);
          textSize(20);
          text(this.neighboursBeesCount, this.x + w / 3, this.y + h / 1.5)
        }
      }
    }
  }

  reveal() {
    this.revealed = true;
    if (this.neighboursBeesCount == 0)
      this.floodfill();
  }

  floodfill() {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // console.log("Working");
          let xoff = this.x / this.w + i;
          let yoff = this.y / this.h + j;
          if (xoff > -1 && xoff < cols && yoff > -1 && yoff < rows) {
            let neighbour = cells[xoff][yoff];
            if (!neighbour.bee && !neighbour.revealed)
              neighbour.reveal();
          }
        }
      }
  }

}