'use strict';

let diceRoll = 0;
let currentScore = 0;
let playerOneScore = 0;
let playerTwoScore = 0;
let currentPlayerTurn = 1;
const playerScores = document.querySelectorAll('.score');
const dice = document.querySelector('.dice');

function resetGame() {
  for (let i = 0; i < playerScores.length; i++) {
    playerScores[i].textContent = 0;
  }
  currentScore = 0;
  playerOneScore = 0;
  displayCurrentScore(1);
  playerTwoScore = 0;
  displayCurrentScore(2);
  currentPlayerTurn = 1;
  dice.classList.add('hidden');
  changePanelColor(currentPlayerTurn);
}

function roll1D6() {
  diceRoll = Math.trunc(Math.random() * 6 + 1);
}

function displayDice() {
  if (dice.classList.contains('hidden')) {
    dice.classList.remove('hidden');
  }
}

function changeDiceImg() {
  document.getElementById('dice-img').src = `dice-${diceRoll}.png`;
}

function displayCurrentScore(player) {
  document.getElementById(`current--${player - 1}`).textContent = currentScore;
}

function displayTotalScore(currentPlayerTurn, score) {
  document.getElementById(`score--${currentPlayerTurn - 1}`).textContent =
    score;
}

function changePanelColor(currentPlayerTurn) {
  if (currentPlayerTurn === 1) {
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
  } else {
    document.querySelector('.player--1').classList.add('player--active');
    document.querySelector('.player--0').classList.remove('player--active');
  }
}

function switchTurn() {
  if (currentPlayerTurn === 1) {
    currentPlayerTurn = 2;
  } else {
    currentPlayerTurn = 1;
  }
}

function checkDiceRoll() {
  if (diceRoll != 1) {
  }
}

resetGame();

document.querySelector('.btn--new').addEventListener('click', resetGame);

document.querySelector('.btn--hold').addEventListener('click', function hold() {
  let score = 0;
  if (currentPlayerTurn === 1) {
    playerOneScore += currentScore;
    score = playerOneScore;
  } else {
    playerTwoScore += currentScore;
    score = playerTwoScore;
  }
  displayTotalScore(currentPlayerTurn, score);
  currentScore = 0;
  displayCurrentScore(currentPlayerTurn);
  switchTurn();
  changePanelColor(currentPlayerTurn);
});

document
  .querySelector('.btn--roll')
  .addEventListener('click', function rollDice() {
    roll1D6();
    displayDice();
    changeDiceImg();
    if (diceRoll != 1) {
      currentScore += diceRoll;
      displayCurrentScore(currentPlayerTurn);
    } else if (diceRoll === 1) {
      currentScore = 0;
      displayCurrentScore(currentPlayerTurn);
      switchTurn();
      changePanelColor(currentPlayerTurn);
    }
  });
