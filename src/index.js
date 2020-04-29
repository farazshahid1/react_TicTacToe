import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }


  render () {
    return (
      <button 
        className="square" 
        onClick={ () => this.setState({value: 'X'}) }
      >
        {this.state.value}
      </button>
    );
  }
}


class Board extends Component {

  renderSquare(i) {
      return <Square value={i} />;
  }

  render () {

    const status = 'Next Player: X '; 
    return (
      <div>
        <div className="status"> {status}</div>
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

  render() {
    return (
      <div className="game">
       <div className="game-board">
          <Board />
       </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);