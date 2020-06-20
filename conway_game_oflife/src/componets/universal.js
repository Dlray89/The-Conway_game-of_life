import React from "react"


class Universal extends React.Component {


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