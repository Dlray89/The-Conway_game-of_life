export default class Universe {
  constructor(generation = 0, liveCells = new Map()) {
    this.generation = generation;
    this.liveCells = liveCells;
    this.nextGeneration = new Map();
    this.deadCells = new Map();
  }

//function that will allow user to get current generation 
  getGeneration() {
    return this.generation;
  }

//function that will give us a map of the live cells in every generation
  getLiveCells() {
    return this.liveCells;
  }

 //the position object will let use know the position of a cell. The object will have an x and y coordinate to where it is located in the 2d array. Also it will help to count all the live and dead cells 

//function that will take a cell and added to to the live map of cells
  addCell(position) {
    this.liveCells.set(position.x + " , " + position.y, {x: position.x, y: position.y});
  }

//function that will remove a cell from the map of live cells
  removeCell(position) {
    this.liveCells.delete(position);
  }

//function that gives cell an position and tells user if the cell is alive or dead.
  isCellAlive(position) {
    return this.liveCells.has(position);
  }

//function that will allow the user to select an cell and store it on the board
  storeCell(position) {
    if(this.isCellAlive(position.x + " , " + position.y)) {
      this.removeCell(position.x + " , " + position.y);
    } else {
      this.addCell(position);
    }

        // rerender board
    return new Universe(this.generation, this.liveCells);
  }
  // Function to calculate all the live and dead cells. also include genteration
  addGeneration(){
    this.liveCells.forEach((item) => {
      this.calculateLiveCellsNeighboors(item);
    })

    this.deadCells.forEach((item) => {
      this.calculateDeadCellsNeighboors(item);
    })

    //return new generation 
    this.generation++;
    // and the current gen value and next gen cells
    return new Universe(this.generation, this.nextGeneration)
  }

  //function that will calculate all live cells for the next generation. also remeber to include its neighboring cell as well
  calculateLiveCellsNeighboors(position) {
    var liveNeighboors = 0;

    //set rules here to the live cells, find the neighbor cells for each live cell and figure out what their next state will be

    for(var i = position.x - 1; i <= position.x + 1; i++){
      for(var j = position.y - 1; j <= position.y + 1; j++){
        
        if(i === position.x && j === position.y)
          continue;

        if(this.isCellAlive(i + " , " + j)){
            liveNeighboors++;
        } else {
          this.deadCells.set(i + " , " +j, {x: i, y: j})
        }
      }
    }

    if((liveNeighboors === 2 || liveNeighboors === 3))
      this.nextGeneration.set(position.x + " , " + position.y, {x: position.x, y: position.y});
  }

  //function to calculate the dead cells that are going to remain dead or reborn.
  calculateDeadCellsNeighboors(position) {
    var liveNeighboors = 0;

    for(var i = position.x - 1; i <= position.x + 1; i++){
      for(var j = position.y - 1; j <= position.y + 1; j++){

        if(i === position.x && j === position.y)
          continue;

        if(this.isCellAlive(i + " , " + j)){
            liveNeighboors++;
          }
        }
      }

    if(liveNeighboors === 3)
      this.nextGeneration.set(position.x + " , " + position.y, {x: position.x, y: position.y});
  }

}