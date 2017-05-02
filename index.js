const Board = require('./boardClass.js');
const readline = require('readline');

// const rl = require('./boardClass.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const boardtest = new Board(rl);

//start script
(function start(){
  rl.write('Welcome to Tic Tac Terminal! Let\'s play!\n');
  rl.write('Enter a number to place a piece!\n');
  rl.write('Turns alternate between O\s & X\'s.\n\n');
})();

rl.question('Hit enter to start! ', () => {
  rl.write('Awesome! Lets go!\n\n')
  boardtest.displayBoard(rl);
});

//Command to quit the app
rl.on('SIGINT', () => {
  rl.question('Are you sure you want to quit? (Y/N)', (answer) => {
    if (answer.match(/^y(es)?$/i)) {
      console.log('Bye! Thanks for playing!')
      rl.close();
    }
  });
});
