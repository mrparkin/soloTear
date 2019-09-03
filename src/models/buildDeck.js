import { dealCards } from "./dealCards";
import { pullCardFromDeck } from "./pullCardFromDeck";
import { cardEvents } from "./cardEvents.js";

export class BuildDeck {
  constructor() {
    const element = document.createElement("div");

    element.id = "deck";
    element.classList.add("cardPlaceholder");
    element.style.zIndex = 100;

    //INSTANTIATE CLICK DECK EVENT
    let _pullCardFromDeck = new pullCardFromDeck();

    element.onclick = function() {
      _pullCardFromDeck.reveal(event);
    };

    document.getElementById("deckHolder").appendChild(element);
  }
  createDeck() {
    let deck = [];
    let cardRange = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K"
    ];

    for (let i = 0; i < cardRange.length; i++) {
      deck.push(cardRange[i] + " Spades");
      deck.push(cardRange[i] + " Hearts");
      deck.push(cardRange[i] + " Clubs");
      deck.push(cardRange[i] + " Diamonds");
    }
    deck.sort(function(a, b) {
      return 0.5 - Math.random();
    });

    let dealCounter = 1;
    let deckcardsClassName = "deckcardFacedown";
    let deckCardsIdName = "DeckCardNo";

    //CREATE ALL CARDS AS DIVS
    deck.forEach(element => {
      const faceDownCard = document.createElement("div");
      faceDownCard.innerHTML = element;
      faceDownCard.id = deckCardsIdName + dealCounter;
      faceDownCard.className = deckcardsClassName;
      document.getElementById("deckHolder").appendChild(faceDownCard);
      dealCounter++;

      //COLOUR ALL CARDS
      this.changeColour(faceDownCard);
      //INSTANTIATE EVENTS
      let _cardEvents = new cardEvents();
    });

    //DEAL CARDS
    let _dealCards = new dealCards(deck);

    return deck;
  }

  changeColour(cardElement) {
    if (
      cardElement.innerHTML.toLowerCase().includes("heart") ||
      cardElement.innerHTML.toLowerCase().includes("diamonds")
    ) {
      cardElement.classList.add("redCard");
    } else {
      cardElement.classList.add("blackCard");
    }
  }
}
