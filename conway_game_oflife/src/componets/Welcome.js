import React from "react"
import { Card, CardHeader, Button, makeStyles, CardContent, List, ListItem, ListItemText, Divider} from "@material-ui/core"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    welcomeContainer:{
        border:"solid 2px black",
        background:'#00b09b',
        height:'100vh'

    },
    root:{
        border:'solid 1px white',
        display:'flex',
        justifyContent:" space-between",
        width:"80%",
        margin:"1% auto",
        background:'linear-gradient(to right, #00b09b, #96c93d)',
        color:'white'
    },
    title:{
       
        width:'30%',
        padding:'1%',
        boxSizing:"border-box",
        fontSize:'20px'
    },
    buttonContainer:{
       
        width:'50%',
        display:"flex",
        justifyContent:'space-evenly',
        boxSizing:"border-box",
        
        
    },
    rulesContainer:{
        border:'solid 1px white',
        width:'80%',
        margin:'0 auto',
        background:'linear-gradient(to right, #00b09b, #96c93d)',
        color:'white'
    },
    info:{
        
        textAlign:'center',
        padding:'2%'
    },
    listContainer:{
        border:'solid 1px white',
        width:'55%',
        margin:'0 auto',
        color:'white'
    },
}))

const Welcome = () => {
const classes = useStyles()
    return(
        <div className={classes.welcomeContainer}>
            <Card className={classes.root}>
                <div className={classes.title}>
                    Conway | Game of life
                </div>
                <div className={classes.buttonContainer}>
                    <Link style={{textDecoration:'none'}} to='/game'><Button style={{color:'white', background:'#00b09b', margin:'5% 0%', width:'100%', border:"solid 1px white"}} variant="outlined" >Go To Game</Button></Link>

                    
                </div>
                
            </Card>
            <Card className={classes.rulesContainer}>
                <CardHeader title='Rules of the game' />
                <Divider />
                <CardContent>
                    <p className={classes.info}>
                                 The Game of Life is an example of a cellular automaton and a zero-player game. It takes place on an infinite two-dimensional grid in which cells can be ‘Alive’  or ‘Dead’, and is defined by a set of rules that jointly determine the state of a cell given the state of its neighbours. Following specification of an initial configuration, patterns evolve over time across the grid requiring no further user input (thus ‘zero-player’)
                            </p>

                            <List className={classes.listContainer}>
                              
                                <ListItem button>
                                    
                                    <ListItemText style={{color: 'white', textAlign: 'center'}}>
                                        Rule one:<br /> A dead cell with exactly three live neighbors becomes a live cell (birth).
                                    </ListItemText>
                                </ListItem>
                                <Divider style={{background: 'white'}}  />
                                <ListItem button>
                                    <ListItemText style={{color: 'white', textAlign: 'center'}}>
                                        Rule two:<br /> A live cell with two or three live neighbors stays alive (survival)
                                    </ListItemText>
                                </ListItem>

                                 <Divider style={{background: 'white'}}  />
                                <ListItem button>
                                    <ListItemText style={{color: 'white', textAlign: 'center'}}>
                                        Rule three: <br />In all other cases, a cell dies or remains dead (overcrowding or loneliness).
                                    </ListItemText>
                                </ListItem>
                            </List>
                </CardContent>

                 
            </Card>
        </div>
    )
}

export default Welcome