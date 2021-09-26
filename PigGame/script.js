'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const player0Score = document.querySelector('#score--0');
const player1Score = document.getElementById('score--1');
const player0CurrentScore = document.getElementById('current--0');
const player1CurrentScore = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
let score, currentScore, playerTurn;

function changeActivePlayerCurrentScore(playerTurn, Score) {
  document.getElementById(`current--${playerTurn}`).textContent = Score;
}

function changeActivePlayerTotalScore(playerTurn, Score) {
  document.getElementById(`score--${playerTurn}`).textContent =
    Score[`${playerTurn}`];
}

function changePlayerTurn(currentTurn) {
  if (currentTurn === 0) {
    playerTurn = 1;
  } else if (currentTurn === 1) {
    playerTurn = 0;
  }
}

function changeActivePanel(playerTurn) {
  document
    .querySelector(`.player--${playerTurn}`)
    .classList.add('player--active');

  if (playerTurn === 0) {
    player1.classList.remove('player--active');
  } else {
    player0.classList.remove('player--active');
  }
}

function declareWinner() {}

function resetGame() {
  score = [0, 0];
  currentScore = 0;
  playerTurn = 0;

  dice.classList.add('hidden');
  player0Score.textContent = score[0];
  player1Score.textContent = score[1];
  player0CurrentScore.textContent = 0;
  player1CurrentScore.textContent = 0;
  changeActivePanel(playerTurn);
}

const init = function () {
  resetGame();
};

init();

buttonRoll.addEventListener('click', function () {
  if (dice.classList.contains('hidden')) {
    dice.classList.remove('hidden');
  }

  //generate random number 1-6
  let diceRoll = Math.trunc(Math.random() * 6 + 1);

  //display the new number
  dice.src = `dice-${diceRoll}.png`;

  //see if 1 is rolled
  if (diceRoll === 1) {
    currentScore = 0;
    changeActivePlayerCurrentScore(playerTurn, currentScore);
    changePlayerTurn(playerTurn);
    changeActivePanel(playerTurn);
  } else {
    currentScore += diceRoll;
    changeActivePlayerCurrentScore(playerTurn, currentScore);
  }
});

buttonHold.addEventListener('click', function () {
  //add current score to active player total
  score[`${playerTurn}`] += currentScore;
  changeActivePlayerTotalScore(playerTurn, score);

  //reset current score and display it
  currentScore = 0;
  changeActivePlayerCurrentScore(playerTurn, currentScore);

  //change player turn
  changePlayerTurn(playerTurn);
  changeActivePanel(playerTurn);
});

buttonNew.addEventListener('click', function () {
  resetGame();
});
