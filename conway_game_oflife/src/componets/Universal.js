import React from "react";

//1. A live cell with less than two live neighbours dies
//2. A live cell with two of three neighbours lives on to the next generation
//3. A live cell with more than three neighbours dies
//4, a dead cell with exactly three beighbours is reborn and becomes a live cell

class Universal extends React.Component {
    // this is the entry point for each generation
    constructor(generation = 0, liveCells = new Map()) {
        super();

        this.generation = generation;
        this.liveCells = liveCells;
        this.nextGeneration = new Map();
        this.deadCells = new Map()
    }

    //get the current generation here
    getGeneration(){
        return this.generation
    }

    // this will map the live cells in each generation
    getLiveCells(){
        return this.liveCells
    }

    // add a cell here
    addCell(position){
        this.liveCells.set(position.x + " , " + position.y, {x: position.x, y: position.y})

    }

    //remove cells
    removeCell(position) {
        this.liveCells.delete(position)

    }
    //this will let us no if cell still alived
    isCellAlive(position){
        return this.liveCells.has(position)

    }

    //function for behavior of an individual cell
    storeCell(position){
        if(this.isCellAlive(position.x + ' , ' + position.y)) {
            this.removeCell(position.x + ' , ' + position.y);
        } else {
            this.addCell(position)
        }

        return new Universal(this.generation, this.liveCells)

    }

    addGeneration(){
        this.liveCells.forEach((item) => {
            this.calculateLiveCellsNeighbors(item)
        })

        this.deadCells.forEach((item) =>{
            this.calculateDeadCellsNeighbors(item)
        })

        this.generation++;

        return new Universal(this.generation, this.nextGeneration)
    }

    calculateLiveCellsNeighbors(position){
        let liveNeighbors = 0

        for(let i = position.x - 1; i <= position.x + 1; i++) {
            for(let j = position.y - 1; j <= position.y + 1; j++){

                if(i === position.x && j ===position.y)
                    continue;


                if(this.isCellAlive(i + ',' + j)) {
                    liveNeighbors++;
                } else {
                    this.deadCells.set(i + "," + j, {x: 1, y: j})
                }
            }
        }

        if((liveNeighbors === 2 || liveNeighbors ===3))
            this.nextGeneration.set(position.x + ',' + position.y, {x: position.x, y: position.y})

    }

    calculateDeadCellsNeighbors(position){
        let liveNeighbors = 0

        for(let i = position.x - 1; i <= position.x +1; i++) {
            for(let j = position.y - 1; j <= position.y + 1; i++) {

                if(i === position.x && j === position.y)
                    continue;

                if(this.isCellAlive(i + ', ' + j)) {
                    liveNeighbors++;
                }
            }
        }

        if(liveNeighbors === 3)
            this.nextGeneration.set(position.x + ',' + position.y, {x: position.x, y: position.y})

    }


}

export default Universal