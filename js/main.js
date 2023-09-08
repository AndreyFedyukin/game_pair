// создаем карточку
class Card {
  constructor(container, number, action) {
    this._open = false;
    this._success = false;
    this.number = number;

    this.card = document.createElement("li");
    this.card.classList.add("card");
    this.card.textContent = number;

    this.card.addEventListener("click", () => {
      if (this.open == false && this.success == false) {
        this.open = true;
        action(this);
      }
    });

    container.append(this.card);
  }

  set open(value) {
    this._open = value;
    this.card.classList.toggle("open", value);
  }
  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;
    this.card.classList.toggle("success", value);
  }
  get success() {
    return this._success;
  }
};

// создаем игровое поле
function newGame(container, cardsCount) {
  let cardsNumberArray = [],
    cardsArray = [],
    firstCard = null,
    secondCard = null;

  for (let i = 1; i <= cardsCount / 2; i++) {
    cardsNumberArray.push(i, i);
  }

  cardsNumberArray.sort(() => Math.random() - 0.5)

  // создаем логику игры
  function flip(card) {
    if (firstCard && secondCard) {
      if (firstCard.number !== secondCard.number) {
        firstCard.open = false;
        secondCard.open = false;
        firstCard = null;
        secondCard = null;
      }
    }

    if (!firstCard) {
      firstCard = card;
    } else {
      if (!secondCard) {
        secondCard = card;
      }
    }

    if (firstCard && secondCard) {
      if (firstCard.number === secondCard.number) {
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null;
        secondCard = null;
      }
    }

    if (document.querySelectorAll(".card.success").length == cardsNumberArray.length) {
      alert("Победа! Игра окончена))");

      // делаем сброс игры
      container.innerHTML = "";
      cardsNumberArray = [];
      cardsArray = [];
      firstCard = null;
      secondCard = null;

      newGame(container, cardsCount)
    }
  }

  for (const cardNumber of cardsNumberArray) {
    cardsArray.push(new Card(container, cardNumber, flip));
  }
}

newGame(document.getElementById("game"), 16);
