import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Components/Board';

  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            isXNext: true,
            stepNumber: 0,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.isXNext ? 'X': 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            isXNext: !this.state.isXNext,
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            isXNext: (step % 2) === 0,
        })
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
          const desc = move ? 
            'Go to move # ' + move :
            'Go to game start';
          return(
              <li key = {move}> 
                  <button className="travel-btn" onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
          );      
      });

      let status; 
      if (winner) {
        status = 'Winner: ' + winner;
      } else if (this.state.stepNumber === 9){
          status = 'DRAW!';
      } else {
        status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
      }

      return (
        <div className="game">
              <div className="full-row ">
                <h1>Tic-Tac-Toe</h1>
            </div>
          <div className="game-board">
          <div className="status tc">{status}</div>
            <Board
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info"> 
            <p className="tc">Time Travel</p>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }