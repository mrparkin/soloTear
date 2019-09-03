import { cardLogic } from "./cardLogic.js";

export class cardEvents {
  constructor() {
    //instantiate card logic
    let _cardLogic = new cardLogic();

    //DROP YO CARD
    document.addEventListener("drop", function(ev) {
      ev.preventDefault();
      ev.target.style.border = "";
      const data = ev.dataTransfer.getData("text");

      let selectedCard = document.getElementById(data);
      let selectedCardType = selectedCard.textContent;
      let selectedCardParent = selectedCard.parentElement;

      if (ev.target.tagName == "html") {
        return;
      } else if (
        ev.target.tagName !== "DIV" &&
        ev.target.parentElement.classList[0].includes("cardPlaceholder") ==
          false
      ) {
        return;
      } else {
        //if card dropped on suit stack
        if (
          ev.target.parentElement.className.includes("suits") ||
          ev.target.className.includes("suits")
        ) {
          _cardLogic.checkIfCardFromDeck(selectedCard);
          _cardLogic.dropOntoLastChild(ev.target, selectedCard, data);
        }
        //if card is dropped on empty stack
        else if (
          ev.target.className.includes("cardPlaceholder") &&
          selectedCardType.toLowerCase().includes("k")
        ) {
          document.getElementById(data).style.top = "";
          _cardLogic.checkIfCardFromDeck(selectedCard);
          ev.target.appendChild(document.getElementById(data));
          _cardLogic.checkForFlip(selectedCardParent);
        }
        //if card dropped on stack
        else if (
          _cardLogic.redOrBlack(ev.target.textContent) !=
          _cardLogic.redOrBlack(selectedCardType)
        ) {
          if (
            _cardLogic.higherOrLower(
              selectedCard.textContent,
              ev.target.textContent
            ) == false
          ) {
            return;
          }
          _cardLogic.checkIfCardFromDeck(selectedCard);
          _cardLogic.dropOntoLastChild(ev.target, selectedCard, data);
        }
      }
    });

    //______________________________________________________
    document.addEventListener("dragstart", function(ev) {
      let data = ev.dataTransfer.setData("text", ev.target.id);
      // console.log(document.getElementById(data).nextElementSibling);                                              NEED TO FIX THIS NEXT
    });
    document.addEventListener("dragover", function(ev) {
      ev.preventDefault();
    });
    document.addEventListener("dragenter", function(event) {
      if (
        event.target.className == "faceUp" ||
        event.target.id.includes("stack")
      ) {
        event.target.style.border = "9px solid yellow";
      }
    });
    document.addEventListener("dragleave", function(event) {
      if (
        event.target.className == "faceUp" ||
        event.target.id.includes("stack")
      ) {
        event.target.style.border = "";
      }
    });

    document.addEventListener("ondblclick", function(ev){
        console.log("double clicked");
    });
  }
}
