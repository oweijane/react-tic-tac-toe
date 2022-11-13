import React from "react";
import Board from "./Board";
import calculateWinner from "../logic/calculateWinner";


export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history : [{
        squares: Array(9).fill(null),
        lastSquareClicked: null,
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1]
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X': 'O';

    const lastSquareRow = Math.floor(i / 3) + 1;
    const lastSquareCol = Math.floor(i % 3) + 1;

    this.setState({
      history: history.concat([{
        squares: squares,
        lastSquareClicked: {
          row: lastSquareRow,
          col: lastSquareCol,
        },
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  renderDesc(desc, step) {
    if(step === this.state.stepNumber) {
      return (
        <b>
          {desc}
        </b>
      );
    } else {
      return desc;
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Move #${move}, (row: ${step.lastSquareClicked.row}, column: ${step.lastSquareClicked.col})` : 'Go to game start';
      
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {this.renderDesc(desc, move)}
          </button>
        </li>
      )
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
