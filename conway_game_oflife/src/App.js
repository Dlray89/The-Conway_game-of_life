import React from "react"
import "./App.css"


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            size: [90, 20],
        }
        this.handleColumnChange = this.handleColumnChange.bind(this);
        this.handleRowChange = this.handleRowChange.bind(this)
        this.startGame = this.startGame.bind(this)
        this.stopGame = this.stopGame.bind(this)
        this.renderBoard = this.renderBoard.bind(this)
    }
    handleRowChange(e) {

    }

    handleColumnChange(e) {

    }

    startGame() {

    }

    stopGame() {

    }

    runGame() {

    }
//
    renderBoard() {
        let newWorld = []
        let cellRow = []

        for(let i = 0; i < this.state.size[0]; i++) {
            for (let j = 0; j < this,this.state.size[1]; j++) {
                
            }
        }

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
                    Generation:
                </div>
                <div className='boardContainer'>
                    {this.renderBoard()}
                </div>
            </div>
        )
    }
}

export default App