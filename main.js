
/*Ispirato e migliorato da https://marina-ferreira.github.io/tutorials/js/memory-game/*/

//aggiungo un event listener al click su ogni carta
const cards = document.querySelectorAll('.memory-card');
const replay = document.querySelector('.replay-button');
const victoryBanner = document.querySelector('.victory');


let hasFlippedFirstCard = false
let lockBoard = false;
let firstCard, secondCard;
let cardsGuessed = 12;
let totalCards = 12;

function shuffleCards() {
  cards.forEach(card => {
    let randomNumber = Math.floor(Math.random() * 12);
    card.style.order = randomNumber;
  });
}

function resetVariables() {
  [hasFlippedFirstCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null]
}

function checkVictory(){
  if(cardsGuessed >= totalCards) {
    victoryBanner.classList.remove('hidden');
  }
}

function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  cardsGuessed += 2;
  resetVariables();
  checkVictory();
}

function unflipCards() {

  lockBoard = true;
  setTimeout(() => {

    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetVariables();

  }, 1200);
}

function unflipAll() {
  cards.forEach(card => {
    card.classList.remove('flip');
  });

}

function checkForMatch() {

  //se sono uguali le lascia scoperte
   //se sono diverse le rigira a posto
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}


function flipCard() {

  //se sto guardando altre carte esco non le guardo
  if (lockBoard) return;
  //se premo due volte la stessa carta non la conto
  if (this === firstCard) return;


  //mostro la carta
  this.classList.add('flip');

  //se è la prima carta
  if (!hasFlippedFirstCard) {
    hasFlippedFirstCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch();
  }

}

function setGame () {
  victoryBanner.classList.add('hidden');
  resetVariables();
  cardsGuessed = 0;
  unflipAll();
  shuffleCards();
  cards.forEach(card => {
    card.addEventListener('click', flipCard);
  });
  replay.addEventListener('click', setGame);
}

setGame();
