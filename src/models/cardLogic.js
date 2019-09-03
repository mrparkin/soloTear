let subElementsIdsArray = [];

export class cardLogic {
  constructor() {}
  checkIfCardFromDeck(_cardSelectedElement) {
    if (_cardSelectedElement.className.includes("newCard")) {
      _cardSelectedElement.classList.remove("newCard");
    }
  }

  checkIfSelectedCardHasChildren(_selectedCardElement) {
    if (
      _selectedCardElement.id ==
      _selectedCardElement.parentElement.lastElementChild.id
    ) {
      subElementsIdsArray.push(_selectedCardElement.id);
      return subElementsIdsArray;
    } else {
      subElementsIdsArray.push(_selectedCardElement.id);

      this.checkIfSelectedCardHasChildren(
        _selectedCardElement.nextElementSibling
      );
      return subElementsIdsArray; // _selectedCardElement.nextElementSibling.id;
    }
  }

  dropOntoLastChild(eventTarget, _selectedCardElement, _data) {
    const eventTargetParent = eventTarget.parentElement;
    const _selectedCardParentElement = _selectedCardElement.parentElement;
    var newTopSpace = eventTarget.style.top;
    //only drop on the last card of stack
    if (
      eventTargetParent.lastElementChild ||
      eventTargetParent.id.includes("stack")
    ) {
      //MOVE CARD to suit stack
      if (
        (eventTarget.className.includes("suits") ||
          eventTargetParent.className.includes("suits")) &&
        _selectedCardParentElement.lastElementChild
      ) {
        document.getElementById(_data).style.top = "";

        if (eventTarget.className.includes("faceUp")) {
          //if(isHigher(_data,eventTarget) && _data.innerHTML.includes(eventTarget.innerHTML.splice(0,2))){
          eventTargetParent.appendChild(document.getElementById(_data));
          // }
        } else {
          eventTarget.appendChild(document.getElementById(_data));
        }
      }
      //Move card to Stack
      else {
        //is selected from deck?
        if (_selectedCardParentElement.id == "deckShown") {
          //              need to pop the array (DECK) to remove card
          eventTargetParent.appendChild(_selectedCardElement);
          newTopSpace = eventTarget.style.top;
          newTopSpace = parseInt(newTopSpace.replace("%", "")) + 20;

          if (Number.isNaN(newTopSpace)) {
            newTopSpace = 20;
          }
          _selectedCardElement.style.top = newTopSpace + "%";
          let cardIndex = deck.indexOf(_selectedCardElement.innerHTML);
          console.log(cardIndex);
          deck.splice(cardIndex, 1);
          deckDrawnCounter--;
        } else {
          subElementsIdsArray = this.checkIfSelectedCardHasChildren(
            _selectedCardElement
          );
        }

        let count = 1;
        //Each card underselect is processed for the move accross
        for (var indx = subElementsIdsArray.length; indx > 0; indx--) {
          eventTargetParent.appendChild(
            document.getElementById(subElementsIdsArray[0])
          );

          newTopSpace = eventTarget.style.top;
          newTopSpace = parseInt(newTopSpace.replace("%", "")) + 20 * count;
          //if first card on stack
          if (Number.isNaN(newTopSpace)) {
            newTopSpace = 20;
          }
          document.getElementById(subElementsIdsArray[0]).style.top =
            newTopSpace + "%";

          subElementsIdsArray.shift();
          count++;
        }
      }

      this.checkForFlip(_selectedCardParentElement);
    }
  }

  checkForFlip(_selectedCardParentElement) {
    //does sleected card have a card in previous stack to flip
    if (_selectedCardParentElement.childNodes.length > 0) {
      const checkIfLastCardNeedsTurning = document.getElementById(
        _selectedCardParentElement.id
      ).lastElementChild.classList[0];
      const lastchildId = document.getElementById(_selectedCardParentElement.id)
        .lastElementChild.id;

      if (checkIfLastCardNeedsTurning.includes("faceUp") == false) {
        document.getElementById(lastchildId).classList.remove("facedown");
        document.getElementById(lastchildId).classList.add("faceUp");
        document.getElementById(lastchildId).draggable = "true";
      }
    }
  }

  redOrBlack(string) {
    if (
      string.toLowerCase().includes("diamonds") ||
      string.toLowerCase().includes("hearts")
    ) {
      return "red";
    } else {
      return "black";
    }
  }

  higherOrLower(selected, target) {
    selected = this.convertToNumber(selected.toString());
    target = this.convertToNumber(target.toString());
    if (selected != target - 1) {
      return false;
    }
  }

  convertToNumber(cardNo) {
    if (cardNo.includes("A")) {
      return 1;
    }
    if (cardNo.includes("J")) {
      return 11;
    }
    if (cardNo.includes("Q")) {
      return 12;
    }
    if (cardNo.includes("K")) {
      return 13;
    } else {
      return parseInt(cardNo);
    }
  }
}
