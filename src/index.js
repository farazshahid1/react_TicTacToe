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
        key={i} 
          value={this.props.squares[i]} 
          onClick={() => this.props.onClick(i) }      />
        );
  }

  render () {

    let square=[]
    let count=0;
      for(let i=0; i<3; i++){
        
        let rows=[]
        for(let k=0; k<3 ; k++){
          
            rows.push(this.renderSquare(count))
            count ++;
        }
        square.push(<div key={i}className="board-row">{rows}</div>)
      }

    return (
      <div>
           {square}
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
          currentSelectSquare: null
        }],
        stepNumber: 0,
        xIsNext: true,
        ascDesc: true
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
    
   
      squares[i]= this.state.xIsNext ? 'X': 'O';
      this.setState({
        history: history.concat([{
          squares:squares,
          currentSelectSquare: i
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
        xIsNext: (step % 2) === 0,
      
      }); 
    }

    toggelHandler() {
      console.log("Toggel Handler Clicked");
      this.setState({
        ascDesc: !this.state.ascDesc
      });
    }

  render() {

    console.log("Render: ");
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    console.log("HistoryLength in render: " + history.length);
    console.log("Step Number in render: " + this.state.stepNumber);
    const current = history[this.state.stepNumber];
    //const button= "Button"
    const winner = calculateWinner(current.squares)
    console.log("Winner in render: " + winner);
    console.log("history.length " + history.length)
    const stepNumber = this.state.stepNumber
    let moves=null;

    if(this.state.ascDesc){
       moves = history.map((step, move) => {
        console.log("move # is render : " + move)
        const currentSelected = step.currentSelectSquare;
        const row = 1 + Math.floor(currentSelected / 3);
        const col = 1+ (currentSelected % 3);
        const desc = move ? 
          'Go to move #' + move + ' (' + col + ',' + row + ')':
          'Go to game Start';
          let button
          if(stepNumber === move){
             button= "Button"
          }
          else{
            button =""
          }
          return (
            <li key={move}>
              <button className={button} onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
      });
    }else {
      moves=[];

      for(let i=history.length-1; i>=0; i--){
        console.log("current Selected " + history[i].currentSelectSquare)
        const currentSelected = history[i].currentSelectSquare;
        const row = 1 + Math.floor(currentSelected / 3);
        const col = 1+ (currentSelected % 3);
        const desc = i ? 
          'Go to move #' + i + ' (' + col + ',' + row + ')':
          'Go to game Start';
          let button
          if(stepNumber === i){
             button= "Button"
          }
          else{
            button =""
          }
         moves.push(  <li key={i}>
          <button className={button} onClick={() => this.jumpTo(i)}>{desc}</button>
        </li>);
      }
    }
    

    

     

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
          <div><button onClick={() => this.toggelHandler()}>Toggel</button></div>
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


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);