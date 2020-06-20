import React from "react"
import "./App.css"
import Cell from "./componets/Cell"
import Universal from "./componets/Universal"


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Universal: new Universal(),
            size: [90, 20],
            gameRunning: false
        }
        this.handleColumnChange = this.handleColumnChange.bind(this);
        this.handleRowChange = this.handleRowChange.bind(this)
        this.startGame = this.startGame.bind(this)
        this.stopGame = this.stopGame.bind(this)
        this.renderBoard = this.renderBoard.bind(this)
        this.storeCell = this.storeCell.bind(this)
    }

    handleRowChange(e) {
        if(!this.state.gameRunning) {
            let actualSize = this.state.size;

            if(e.target.value < 20)
                actualSize[1] = e.target.value;
            else
                actualSize[1] = 20

            this.setState({
                size: actualSize
            })

            this.renderBoard()
        }
    }

    handleColumnChange(e) {
        if(!this.state.gameRunning) {
            let actualSize = this.state.size;
            if(e.target.value < 90)
                actualSize[0] = e.target.value;
            else        
                actualSize[0] = 90;

            this.setState({
                size: actualSize
            })
        }
    }

    startGame() {
        if(!this.state.gameRunning) {
            this.setState({
                gameRunning: true
            }, () => {
                this.intervalRef = setInterval(() => this.runGame(), 10)
            })
        }
    }

    stopGame() {
        this.setState({
            gameRunning: false
        },() => {
            if(this.intervalRef) {
                clearInterval(this.intervalRef)
            }
        })

    }

    runGame() {
        this.setState({
            universal: this.state.Universal.addGeneration()
        })

    }

    storeCell(position) {
        if(!this.state.gameRunning) {
            this.setState({
                universal: this.state.Universal.storeCell(position)
            })
        }
    }
//
    renderBoard() {
        let newWorld = []
        let cellRow = []

        for(let i = 0; i < this.state.size[0]; i++) {
            for (let j = 0; j < this.state.size[1]; j++) {
                if(this.state.Universal.isCellAlive(i + ',' + j)){
                    cellRow.push(<Cell key={[i, j]} position={{x: i, y: j}} live={true} storeCell={this.storeCell.bind(this)}  />)
                } else {
                    cellRow.push(<Cell key={[i, j]} position={{x: i, y: j}} live={false} storeCell={this.storeCell.bind(this)}  />)
                }
            }
            newWorld.push(<div className='row'>{cellRow}</div>);
            cellRow = []
        }
        return newWorld

    }


    render() {
        return (
            <div className='worldContainer'>
                <div className='headerContainer'>
                    <div className='headerInnerContainer'>
                        <label className='label'>
                            Rows:
                            <input className='input' type='text' value={this.state.size[1]} onChange={this.handleRowChange} />
                        </label>
                        <label className='label'>
                            Columns
                            <input className='input' type='text' value={this.state.size[0]} onChange={this.handleColumnChange} />
                        </label>
                    </div>
                    <div className='headerButton'>
                        <button className="submit" onClick={this.startGame}>Start</button>
                        <button className="submit" onClick={this.endGame}>Stop</button>
                    </div>
                    Generation: {this.state.Universal.getGeneration()}
                </div>
                <div className='boardContainer'>
                    {this.renderBoard()}
                </div>
            </div>
        )
    }
}

export default App


