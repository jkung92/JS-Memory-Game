const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let moves = 0;
let counter = document.querySelector(".moves");

function flipCard(){
  if(lockBoard) return;
  if (this === firstCard) return;
  
  this.classList.toggle('flip');

  if (!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
    moveCounter();
  }
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework){
    disableCards();
  } else {
    unflipCards();
  }
}

function moveCounter(){
  moves++;
  counter.innerHTML = moves;
}

function disableCards(){
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards(){
  lockBoard = true;
  setTimeout(()=> {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
    }, 1000);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

(function shuffle() {
  cards.forEach (card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));