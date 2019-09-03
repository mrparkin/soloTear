export class dealCards {
  constructor(deck) {
    let deckCardsIdName = "DeckCardNo";

    let stackCards_topPercentage = 0;
    let stackCounter = 1;
    let rowCount = 2;
    //DEALT DIVS TO STACK
    for (var i = 1; i <= 28; i++) {
      if (stackCounter > 7) {
        stackCounter = rowCount++;
        stackCards_topPercentage += 15;
      }

      let currentCard = document.getElementById(deckCardsIdName + i);
      let currentStack = document.getElementById("stack" + stackCounter);

      if (rowCount > 1) {
        currentCard.style.top = stackCards_topPercentage + "%";
      }

      currentStack.appendChild(currentCard);

      stackCounter++;
    }
    this.flipLastChild();
  }

  flipLastChild() {
    for (var i = 1; i < 8; i++) {
      let currentStack = document.getElementById("stack" + i);
      let lastChild = currentStack.lastElementChild.id;

      document.getElementById(lastChild).classList.remove("facedown");
      document.getElementById(lastChild).classList.add("faceUp");
      document.getElementById(lastChild).draggable = "true";
    }
  }
}
