const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("poeni");
const startButton = document.getElementById("startButton");
const cardContainer = document.getElementById("cardContainer");
const cards = document.querySelectorAll(".card");

let givenTime = 59; // Timer starts from 59 seconds
let score = 0;
let flippedCards = [];
let cardIsFlipped = false;
let lockBoard = false;

// Start game event listener
startButton.addEventListener("click", startGame);

function startGame() {
  startButton.removeEventListener("click", startGame);
  startButton.style.display = "none"; // Hide start button
  updateTimer();
  shuffleCards();
  cards.forEach((card) => card.addEventListener("click", flipCard));
}

function updateTimer() {
  const minutes = Math.floor(givenTime / 60);
  const seconds = givenTime % 60;
  timerElement.innerText = `Time: ${padNumber(minutes)}:${padNumber(seconds)}`;

  if (givenTime > 0 && score < 8) {
    givenTime--;
    setTimeout(updateTimer, 1000);
  } else {
    endGame();
  }
}

function padNumber(number) {
  return number.toString().padStart(2, "0");
}

function shuffleCards() {
  cards.forEach((card) => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
  });
}

function flipCard() {
  if (lockBoard || this === flippedCards[0]) return;

  this.classList.add("flip");

  if (!cardIsFlipped) {
    cardIsFlipped = true;
    flippedCards[0] = this;
  } else {
    flippedCards[1] = this;
    checkForMatch();
  }
}

function checkForMatch() {
  const [firstCard, secondCard] = flippedCards;
  const isMatch =
    firstCard.querySelector(".front-face").src ===
    secondCard.querySelector(".front-face").src;

  isMatch ? disableMatchedCards() : unflipCards();
}

function disableMatchedCards() {
  flippedCards.forEach((card) => card.removeEventListener("click", flipCard));
  score++;
  scoreElement.innerText = `Your score: ${score}`;
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    flippedCards.forEach((card) => card.classList.remove("flip"));
    resetBoard();
  }, 1000);
}

function endGame() {
  const notificationId = score === 8 ? "victory" : "lost";
  displayNotification(notificationId);
}

function displayNotification(notificationId) {
  document.getElementById(notificationId).classList.add("show");
}

function resetBoard() {
  [cardIsFlipped, lockBoard] = [false, false];
  flippedCards = [];
}
