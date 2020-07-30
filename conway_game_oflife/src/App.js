import React from "react"
import { Switch, Route } from "react-router-dom"
import Welcome from "./componets/Welcome"
import Game from "./componets/Game"


const App = () => {

    return(
        <Switch>
            <Route exact path='/' component={Welcome}  />
            <Route path='/game' component={Game} />

        </Switch>
        
    )
}

export default App