const url = "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/";
const fetchBtn = document.getElementById("btn-fetch");
const drawBtn = document.getElementById("draw-btn");
const cardContainer = document.getElementById("card--container");
const winnerBar = document.getElementById("winner--bar");
const cardCountBar = document.getElementById("remaining--card");
const computerScoreUI = document.getElementById("computer--score--ui");
const playerScoreUI = document.getElementById("player--score--ui");
let computerScore = 0;
let playerScore = 0;
drawBtn.addEventListener("click", drawCards);
fetchBtn.addEventListener("click", fetchCards);

let deckId = "";
let remaingCard = 52;
function fetchCards() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      remaingCard = data.remaining;
      cardCountBar.textContent = remaingCard;
    });
}

function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      data.cards.map((card, index) => {
        // console.log(card);
        cardContainer.children[
          index
        ].innerHTML = `<img class="card animate__animated animate__backInUp" src="${card.image}" />`;
      });
      const winnerText = getWinner(data.cards[0], data.cards[1]);
      winnerBar.textContent = winnerText;
      cardCountBar.textContent = data.remaining;
      if (data.remaining === 0) {
        drawBtn.disabled = true;
        // check whoe won the game
        computerScore > playerScore
          ? (winnerBar.textContent = "Game Over! Computer Won the game")
          : computerScore < playerScore
          ? (winnerBar.textContent = "Game Over! You Won the game")
          : (winnerBar.textContent = "Game Over! It's a tie");
      }
    });
}

const cardValues = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];
function getWinner(card1, card2) {
  const card1ValueIndex = cardValues.indexOf(card1.value);
  const card2ValueIndex = cardValues.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    computerScore++;
    computerScoreUI.textContent = `Computer Score: ${computerScore}`;
    return "Computer wins!";
  } else if (card1ValueIndex < card2ValueIndex) {
    playerScore++;
    playerScoreUI.textContent = `Your Score: ${playerScore}`;
    return "You win!";
  } else {
    return "War!";
  }
}
