console.log('js collegato');


//aggiungo un event listener al click su ogni carta
const cards = document.querySelectorAll('.memory-card');


function flipCard() {
  this.classList.toggle('flip');
}
cards.forEach(card => {
  card.addEventListener('click', flipCard);
});
