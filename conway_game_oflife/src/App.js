import React, { Component } from 'react';
import './App.css';
import Universe from './componets/Universal';
import { TextField, Button, Slider, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Divider, List, ListItem, ListItemText } from "@material-ui/core"

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            universe: new Universe(),
            size: [50, 20],
            gameRunning: false,
            interval: 100,
            open: false
        }

        this.handleColumnChange = this.handleColumnChange.bind(this);
        this.handleRowChange = this.handleRowChange.bind(this);
        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.renderBoard = this.renderBoard.bind(this);
        this.storeCell = this.storeCell.bind(this);
    }

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

    startGame() {
        if (!this.state.gameRunning) {
            this.setState({
                gameRunning: true,
            }, () => {
                this.intervalRef = setInterval(() => this.runGame(), this.state.interval);
            })
        }
    }

    stopGame() {
        this.setState({
            gameRunning: false
        }, () => {
            if (this.intervalRef) {
                clearInterval(this.intervalRef);
            }
        })
    }

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

                <div className="intro">
                        <div>
                            <h1>John Conway Game Of Life</h1>
                            <p>
                                 The Game of Life (sometimes known simply as Life) is an example of a cellular automaton and a zero-player game. It takes place on an infinite two-dimensional grid in which cells can be ‘on’ (alive) or ‘off’ (dead), and is defined by a set of rules that jointly determine the state of a cell given the state of its neighbours. Following specification of an initial configuration, patterns evolve over time across the grid requiring no further user input (thus ‘zero-player’)
                            </p>

                            <List>
                                <p className='rules'>Rules</p>
                                <ListItem button>
                                    
                                    <ListItemText style={{color: 'white', textAlign: 'center'}}>
                                        A dead cell with exactly three live neighbors becomes a live cell (birth).
                                    </ListItemText>
                                </ListItem>
                                <Divider style={{background: 'white'}}  />
                                <ListItem button>
                                    <ListItemText style={{color: 'white', textAlign: 'center'}}>
                                        A live cell with two or three live neighbors stays alive (survival)
                                    </ListItemText>
                                </ListItem>

                                 <Divider style={{background: 'white'}}  />
                                <ListItem button>
                                    <ListItemText style={{color: 'white', textAlign: 'center'}}>
                                        In all other cases, a cell dies or remains dead (overcrowding or loneliness).
                                    </ListItemText>
                                </ListItem>
                            </List>
                           
                        </div>

                    </div>

                    <div className='controls'>
                        Controls:
                    </div>
                <div className="headerContainer">

                    
                    <div className="headerInnerContainer">
                        <Button className='buttons' style={{background: 'linear-gradient(to bottom, #870000, #190a05)', color: 'white', border:'solid 1px red'}}variant='outlined' onClick={this.handleOpen}>Settings</Button>

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

                        <Button variant='outlined' className="buttons"  onClick={this.startGame}style={{background: 'linear-gradient(to bottom, #870000, #190a05)', color: 'white', border:'solid 1px red'}} >Start</Button>
                        <Button style={{background: 'linear-gradient(to bottom, #870000, #190a05)', color: 'white', border:'solid 1px red'}} variant='outlined' className="buttons" onClick={this.stopGame}>Stop</Button>


                    </div>
                    
                  

                </div>
                <Divider  style={{background: 'white', margin: '3% auto', width: '90%'}} />
                <div className='generation'>
                    Generation: {this.state.universe.getGeneration()}
                </div>
                
                <div className="boardContainer">
                    {this.renderBoard()}
                </div>

            </div>
        );
    }
}

class Cell extends Component {
    render() {
        return (
            <div onClick={() => this.props.storeCell(this.props.position)} className={this.props.live ? "color-change-2x" : "cellContainerDead"}></div>
        );
    }
}
