'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');
const scores = [0, 0];
let activePlayer = 0;
let currentscore = 0;
let playing = true;
const switchfn = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentscore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//rollin dice
btnroll.addEventListener('click', function () {
  if (playing) {
    const num = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${num}.png`;

    if (num != 1) {
      currentscore += num;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentscore;

      //current0El.textContent = currentscore;
    } else {
      switchfn();
    }
  }
});
btnhold.addEventListener('click', function () {
  // add current score to active player
  if (playing) {
    scores[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check score is 100 if finish
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchfn();
    }
  }
});
btnnew.addEventListener('click', function () {
  currentscore = 0;
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  currentscore = 0;
  playing = true;
  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
});
