import React from 'react';
import Square from "./Square";

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        key={i}
      />
    );
  }

  render() {
    let squares = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for(let j = 0; j < 3; j++) {
        row.push(this.renderSquare(3*i + j));
      }
      
      squares.push(
        <div className="board-row" key={i}>
          {row}
        </div>
      );
    }


    return (
      <div>
        {squares}
      </div>
    );
  }
}
