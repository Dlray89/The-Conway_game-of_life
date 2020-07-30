import React, { Component } from "react"
import "./cell.css"




class Cell extends Component {
    render() {
        return (
            <div onClick={() => this.props.storeCell(this.props.position)} className={this.props.live ? "color-change-2x" : "cellContainerDead"}></div>
        );
    }
}

export default Cell