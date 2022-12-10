const cards = document.querySelectorAll('.card');
let count=6;
let hasFlip = false;
let lockBoard = false;
let firstCard, secondCard;
function flip() { 
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');
  if (!hasFlip) {
    hasFlip = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
  document.getElementById('di').innerHTML=count;
}
function disable() {
    firstCard.removeEventListener('click', flip);
    secondCard.removeEventListener('click', flip);
    reset();
}
function checkForMatch() {
  let isMatch = firstCard.dataset.frame === secondCard.dataset.frame;
  if(isMatch){
    disable();
  }else{
    count--;
    unflip();
    if(count==0){
        alert("GAME OVER");
        window.location.reload();  
    }
  }
}
function unflip() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    reset();
  }, 1000);
}
function reset() {
  [hasFlip, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
cards.forEach(card => card.addEventListener('click', flip));