import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {

    return (
      <button 
        className="square" 
        onClick={ props.onClick }>
        {props.value}
      </button>
    );
 
}


class Board extends Component {
  
  

  renderSquare(i) {
      return (
        <Square 
          value={this.props.squares[i]} 
          onClick={() => this.props.onClick(i) }      />
        );
  }

  render () {
    return (
      <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
      </div>
    )
  }
}

class Game extends Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          locations: Array(2).fill(null)
        }],
        stepNumber: 0,
        xIsNext: true
      };
    }

    handleClick(i) {
      
      console.log("Handle Click box is: " + i)
      const history = this.state.history.slice(0, this.state.stepNumber + 1)
      console.log("stepNumber in start HandleClick: " + this.state.stepNumber)
      console.log(JSON.stringify(history))
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if(calculateWinner(squares) || squares[i] ){
        return
      }

     // let location = current.locations.slice();
     let location ;
    location = calculatePosition(i)
    console.log(location)
      squares[i]= this.state.xIsNext ? 'X': 'O';
      this.setState({
        history: history.concat([{
          squares:squares,
          locations: location
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    //  console.log("stepNumber in  exit HandleClick: " + history.length)
    }

    jumpTo(step) {
       console.log("jump step: " + step)
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }

  render() {

    console.log("Render: ");
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    console.log("HistoryLength in render: " + history.length);
    console.log("Step Number in render: " + this.state.stepNumber);
    const current = history[this.state.stepNumber];
    
    const winner = calculateWinner(current.squares)
    console.log("Winner in render: " + winner);

    const moves = history.map((step, move) => {
      console.log("move # is render : " + move)
      
      const desc = move ? 
        'Go to move #' + move + ' (' + step.locations[1] + ',' + step.locations[0] + ')':
        'Go to game Start';

        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
    });

    let status;
    if(winner){
      status = 'Winner: ' + winner;
    } else {
      console.log("status")
      status = "Next Player: " + (this.state.xIsNext ? 'X' : 'O');
      console.log(status)
    }

    return (
      <div className="game">
       <div className="game-board">
          <Board 
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}/>
       </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

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

  for(let i=0; i < lines.length; i++){
    const [a, b, c] = lines[i];

    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

function calculatePosition(i){
    const location = [];
    // column
    if(i === 0 || i === 3 || i === 6)
    {
      location[1] = 1;
    }
    else if(i === 1 || i === 4 || i === 7)
    {
      location[1] = 2;
    }
    else if(i === 2 || i === 5 || i === 8)
    {
      location[1] = 3;
    }

    //row
    if(i === 0 || i === 1 || i === 2)
    {
      location[0] = 1;
    }
    else if(i === 3 || i === 4 || i === 5)
    {
      location[0] = 2;
    }
    else if(i === 6 || i === 7 || i === 8)
    {
      location[0] = 3;
    }

    return location;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);