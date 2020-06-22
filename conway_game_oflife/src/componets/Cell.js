import React from "react"
import "./cell.css"




class Cell extends React.Component {
    constructor(props){
        super(props)
    }
    

    render(){
        return(
            <div onClick={() => this.props.storeCell(this.props.position)} className={this.props.live ? 'cellContainerLive' : 'cellContainerDead'} >

            </div>
        )
    }
}

export default Cell