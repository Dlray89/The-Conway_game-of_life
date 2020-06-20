import React from "react"
import "./cell.css"




class Cell extends React.Component {

    render(){
        return(
            <div className={this.props.live ? 'cellContainerLive' : 'cellContainerDead'} onClick={() => this.props.storeCell(this,this.props.position)}>

            </div>
        )
    }
}

export default Cell