'use strict';

let guessNumber = randomNumber();
let currentHighScore = 0;
const winningBackgroundColor = '#60b347';
const defaultBackgroundColor = '#222';

console.log(guessNumber);

//this is the value the game will change to when the game resets
const defaultScore = 30;
document.querySelector('.score').textContent = defaultScore;
let currentScore = defaultScore;
let inputNumber;

function randomNumber() {
  return Math.trunc(Math.random() * 20 + 1);
}

//decrease current score by 1 and updates the text content
function subtractScore() {
  if (currentScore > 0) {
    currentScore--;
    document.querySelector('.score').textContent = currentScore;
  }
}

function checkForCorrectNumber(value) {
  //when there is no number
  if (!value) {
    document.querySelector('.message').textContent = 'NO NUMBER!';

    //when they guess correct
  } else if (Number(value) === Number(guessNumber)) {
    document.querySelector('.message').textContent = '🎉 WE GOT A WINNER!';
    document.querySelector('.number').textContent = guessNumber;
    document.querySelector('body').style.backgroundColor =
      winningBackgroundColor;
    if (currentScore > currentHighScore) {
      currentHighScore = currentScore;
      document.querySelector('.highscore').textContent = currentHighScore;
    }

    //when the guess is lower
  } else if (value > guessNumber) {
    document.querySelector('.message').textContent = 'LOWER!';
    subtractScore();

    //when the guess is higher
  } else if (value < guessNumber) {
    document.querySelector('.message').textContent = 'HIGHER!';
    subtractScore();
  }
}

//when play uses the play again button. This will reset the number, message and the guess to their default state
function resetGame() {
  guessNumber = randomNumber();
  currentScore = defaultScore;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = defaultBackgroundColor;
  document.querySelector('.score').textContent = defaultScore;

  console.log(guessNumber);
}

//when they click the guess button
document.querySelector('.check').addEventListener('click', function () {
  checkForCorrectNumber(Number(document.querySelector('.guess').value));
});

//when they click the again button
document.querySelector('.again').addEventListener('click', function () {
  resetGame();
});
