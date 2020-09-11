class Cell {

    constructor(x, y) {
      this.x = x;
      this.y = y;
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
            let xoff = this.x + i;
            let yoff = this.y + j;
            if (xoff > -1 && xoff < cols && yoff > -1 && yoff < rows) {
              let neighbour = cells[(xoff * cols) + yoff];
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
  
    reveal() {
      this.revealed = true;
      document.getElementById(String((this.x * cols) + this.y)).classList.add("revealed");
      if(this.bee){
        document.getElementById(String((this.x * cols) + this.y)).classList.add("bee");
        // revealAll();
      }
      else{
        if(this.neighboursBeesCount === 0){
        }
        else if(this.neighboursBeesCount === 1){
          document.getElementById(String((this.x * cols) + this.y)).innerText = this.neighboursBeesCount;
          document.getElementById(String((this.x * cols) + this.y)).classList.add("blue");
        }
        else if(this.neighboursBeesCount === 2){
          document.getElementById(String((this.x * cols) + this.y)).innerText = this.neighboursBeesCount;
          document.getElementById(String((this.x * cols) + this.y)).classList.add("green");
        }
        else if(this.neighboursBeesCount >= 3){
          document.getElementById(String((this.x * cols) + this.y)).innerText = this.neighboursBeesCount;
          document.getElementById(String((this.x * cols) + this.y)).classList.add("red");
        }
      }
      if (this.neighboursBeesCount == 0)
        this.floodfill();
    }
  
    floodfill() {
      for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            // console.log("Working");
            let xoff = this.x + i;
            let yoff = this.y + j;
            if (xoff > -1 && xoff < cols && yoff > -1 && yoff < rows) {
              let neighbour = cells[(xoff * cols) + yoff];
              if (!neighbour.bee && !neighbour.revealed)
                neighbour.reveal();
            }
          }
        }
    }
  
  }