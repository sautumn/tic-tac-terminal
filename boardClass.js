//helper to build board
function _buildData(){
  const scoreArray = [];
  const pointers = {};
  let row = [];
  for (var i = 1; i <= 9; i++) {
    let boardObject = {value:0, display:i}
    row.push(boardObject);
    pointers[i] = boardObject;
    if (i % 3 === 0) {
      scoreArray.push(row);
      row = [];
    }
  }
  return [scoreArray, pointers];

}

const Board = function(rl) {
  this.dataHelpers = _buildData();
  //readline interface
  this.rl = rl;
  this.data = this.dataHelpers[0];
  this.pointers = this.dataHelpers[1];
  //alternate bool values to place pieces
  this.turn = false;
  this.currentTurn = function(){
    return this.turn ? 'O' : 'X';
  }
}

Board.prototype.userInput = function() {
  this.rl.write(`Currently player ${this.currentTurn()}'s turn.\n`)
  this.rl.question('Enter a number to place a piece: \n', (value) => {
    this.rl.write(`Placing a ${this.currentTurn()} piece at ${value}...\n\n`);
    this.placePiece(value);
  });

}

//check the current score of the data array
Board.prototype.scoreRows = function () {
  //check rows 1-3, 4-6, 7-9
  let _this = this;
  let gameOver = false;
  let scores = {X: 0, O: 0};

  function checkGameOver() {
    if (gameOver){
      return _this.rl.close()
    }
    return;
  }

  function checkScores(scores) {
    if (scores['X'] === 3) {
      _this.rl.write(`Player X wins the game!\n`);
      // console.log(scores)
      gameOver = true;
      return true;
    } else {
      scores['X'] = 0;
      return false;
    }
    if (scores ['O'] === 3) {
      _this.rl.write(`Player O wins the game!\n`);
      // console.log(scores)
      gameOver = true;
      return true;
    } else {
      scores['O'] = 0;
      return false;
    }
  }

  function rows(){
    for (let k = 0; k <= 6; k+=3) {
      for (let i = 1; i <= 3; i++) {
        if(_this.pointers[i+k]['display'] === 'X' ||
        _this.pointers[i+k]['display'] === 'O') {
          scores[_this.pointers[i+k]['display']] += _this.pointers[i+k]['value'];
        }
      }
      if (checkScores(scores)){
        return;
      };
      // checkGameOver();
    }
  };

  function columns(){
    for (var k = 1; k <= 3; k++) {
      for (var i = 0; i <= 6; i+=3) {
        if(_this.pointers[i+k]['display'] === 'X' ||
        _this.pointers[i+k]['display'] === 'O') {
          scores[_this.pointers[i+k]['display']] += _this.pointers[i+k]['value'];
        }
      }
      if (checkScores(scores)){
        return;
      };
      // checkGameOver();
    }
  };
  rows();
  columns();
  return gameOver ? this.rl.close() : this.displayBoard();
};

//place a piece on the board and score it
Board.prototype.placePiece = function (input) {
  //read in a pieces value and select it on the board
  if (this.pointers[input]){
    this.pointers[input]['value'] = 1;
    this.pointers[input]['display'] = this.currentTurn();
  }
  this.turn = !this.turn;
  this.scoreRows();
};

//display the current board
Board.prototype.displayBoard = function () {
  for (var i = 0; i < this.data.length; i++) {
    this.rl.write(`  ${this.data[i][0].display}   │   ${this.data[i][1].display}   │   ${this.data[i][2].display}  \n`);
    //draw the row dividers
    if (i === 0 || i === 1) {
      this.rl.write('──────┼───────┼──────\n')
    };
  }
  this.rl.write('\n')
  // console.log(this.pointers)
  this.userInput();
};

module.exports = Board;
