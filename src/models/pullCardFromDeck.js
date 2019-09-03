export class pullCardFromDeck {
  constructor() {}

  //deck click event

  reveal(ev) {
    let deckParent = document.getElementById("deckHolder");
    let deckParentLastChild = deckParent.lastElementChild;
    let destination = document.getElementById("deckShown");

    if (deckParent.childElementCount > 1) {
      deckParentLastChild.classList.add("faceUp");
      deckParentLastChild.draggable = "true";
      destination.appendChild(deckParentLastChild);
    } else {
      let elementArray = [];
      destination.childNodes.forEach(element => {
        elementArray.push(element);
      });

      elementArray.forEach(ele => {
        ele.classList.remove("faceUp");
        deckParent.appendChild(ele);
        console.log(ele);
      });
    }
  }
}
