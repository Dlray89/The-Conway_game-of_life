import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../App.css';
import Universe from './Universal';
import {Card, CardHeader, TextField, Button, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Divider, } from "@material-ui/core"

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //state for the logic
            universe: new Universe(),
            //state for the game board
            size: [40, 20],
            //state for starting game 
            gameRunning: false,
            //state foe speed
            interval: 100,
            //state for modal
            open: false
        }

        //needs access the the .this
        this.handleColumnChange = this.handleColumnChange.bind(this);
        this.handleRowChange = this.handleRowChange.bind(this);
        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.renderBoard = this.renderBoard.bind(this);
        this.storeCell = this.storeCell.bind(this);
    }

        //change handler to allow users to change the row size
    handleRowChange(event) {
        if (!this.state.gameRunning) {
            var actualSize = this.state.size;

            if (event.target.value < 20)
                actualSize[1] = event.target.value;
            else
                actualSize[1] = 20;

            this.setState({
                size: actualSize,
            });

            this.renderBoard();
        }
    }
    //handle change for users to change the columns
    handleColumnChange(event) {
        if (!this.state.gameRunning) {
            var actualSize = this.state.size;
            if (event.target.value < 50)
                actualSize[0] = event.target.value;
            else
                actualSize[0] = 50;

            this.setState({
                size: actualSize,
            });

            this.renderBoard();
        }
    }
    //Handle change for speed 
    changeInterval = (event) => {
        if (!this.state.gameRunning) {
            this.setState({
                interval: event.target.value
            })
        }
    }

    handleOpen = () => {
        if (!this.state.open) {
            this.setState({
                open: true
            })

        }

    }

    handleClose = () => {
        if (this.state.open) {
            this.setState({
                open: false
            })
        }
    }

    //Change handler to start start the game 
    startGame() {
        if (!this.state.gameRunning) {
            this.setState({
                gameRunning: true,
            }, () => {
                this.intervalRef = setInterval(() => this.runGame(), this.state.interval);
            })
        }
    }

    //Handle change to stop the game 
    stopGame() {
        this.setState({
            gameRunning: false
        }, () => {
            if (this.intervalRef) {
                clearInterval(this.intervalRef);
            }
        })
    }

    //an important funtion. this will run all logic and give us our universe for each gen
    runGame() {
        this.setState({
            universe: this.state.universe.addGeneration()
        })
    }

    storeCell(position) {
        if (!this.state.gameRunning) {
            this.setState({
                universe: this.state.universe.storeCell(position)
            })
        }
    }

    renderBoard() {
        var newWorld = [];
        var cellRow = [];

        // This loop is responsible for the creation of every rows and columns for the game and add the respective cells to our board
        for (var i = 0; i < this.state.size[0]; i++) {
            for (var j = 0; j < this.state.size[1]; j++) {
                if (this.state.universe.isCellAlive(i + " , " + j)) {
                    cellRow.push(
                        <Cell key={[i, j]} position={{ x: i, y: j }} live={true} storeCell={this.storeCell.bind(this)} />
                    );
                } else {
                    cellRow.push(
                        <Cell key={[i, j]} position={{ x: i, y: j }} live={false} storeCell={this.storeCell.bind(this)} />
                    );
                }
            }
            newWorld.push(<div className="row" key={i}>{cellRow}</div>);
            cellRow = [];
        }

        return newWorld;
    }

    render() {
        return (
            <div className="worldContainer">

                

                    <div className='controls'>
                        <div style={{width:'50%', fontSize:"20px"}}>
                            <p>Game: Select your cells and hit start</p>
                        </div>
                        
                        <div style={{width:'50%'}}>
                            <Link style={{width:'40%'}} to='/'>
                            <Button style={{color:'white', border:'solid 1px white', margin:'3% 0%', width:'40%', background:'linear-gradient(to right, #00b09b, #96c93d)'}} variant='outlined'>Home</Button>
                            </Link>
                        </div>

                    </div>
                <div className="headerContainer">

                    
                    <div className="headerInnerContainer">
                        <Button className='buttons' style={{background: 'linear-gradient(to right, #00b09b, #96c93d)', color: 'white', border:'solid 1px white'}}variant='outlined' onClick={this.handleOpen}>Settings</Button>

                        <Dialog open={this.state.open}>
                            <DialogTitle>Settings</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <TextField  label='Rows' variant='outlined' className="input" type="text" value={this.state.size[1]} onChange={this.handleRowChange} />


                                    <TextField style={{margin: '3% 0'}} label='Columns' variant='outlined' className="input" type="text" value={this.state.size[0]} onChange={this.handleColumnChange} />


                                    <TextField label='Interval' variant='outlined' className="input" type="text" value={this.state.interval} onChange={this.changeInterval} />

                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose}>Save</Button>
                                <Button onClick={this.handleClose}>Cancel</Button>
                            </DialogActions>
                        </Dialog>

                        <Button variant='outlined' className="buttons"  onClick={this.startGame}style={{background: 'linear-gradient(to right, #00b09b, #96c93d)', color: 'white', border:'solid 1px white'}} >Start</Button>
                        <Button style={{background: 'linear-gradient(to right, #00b09b, #96c93d)', color: 'white', border:'solid 1px white'}} variant='outlined' className="buttons" onClick={this.stopGame}>Stop</Button>


                    </div>
                    
                  

                </div>
               

                <Card style={{background:'black', width:'90%', margin:'1% auto', border:'solid 1px white'}}>
                    <CardHeader style={{color:'white'}} title={`Generation: ${this.state.universe.getGeneration()}`}  />
                    <Divider style={{background:'white', width:'100%'}} />
                
                
                <div className="boardContainer">
                   
                    {this.renderBoard()}
                </div>
                </Card>

            </div>
        );
    }
}

//This component is used to draw every cell on the board
class Cell extends Component {
    render() {
        return (
            <div onClick={() => this.props.storeCell(this.props.position)} className={this.props.live ? "color-change-2x" : "cellContainerDead"}></div>
        );
    }
}
