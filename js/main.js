function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }



  var deck= [];
  //DECK ---- JQUERY
$(document).ready(function(){


    var cardRange =["A","2","3","4","5","6","7","8","9","10","J","Q","K" ];
   
    var i;
    for(i=0; i< cardRange.length; i++){
        deck.push(cardRange[i]+ " Spades");
        deck.push(cardRange[i]+ " Hearts");
        deck.push(cardRange[i]+ " CLubs");
        deck.push(cardRange[i]+ " Diamonds");
    }
  
    deck.sort(function(a,b) {return 0.5 - Math.random();});

    console.log(deck.length);

    //deal [0,1,2,3,4,5,6] = 21 | 52-21 =  31

//problem is dealt cards not being created

    var dealCounter;
    console.log("getsHere");
    for(dealCounter=0, dealCounter>21; dealCounter++;)
    {
        var faceDownCard = document.createElement("div");
        faceDownCard.id = "faceDownCard"+i;
        faceDownCard.className = "SolitareCard topCard facedown";
        console.log("create");

        for(var j=2; j<7;j++){
            document.getElementById("stack"+j).appendChild(faceDownCard);
            const dealt = document.getElementById("stack"+j);
            dealt.style.display = "block";
            console.log("runs");
        }
    }


});












//deck click event
var i=0;
function reveal(ev){
    
    var cardFromDeck = document.createElement("div");
    cardFromDeck.id = "cardDrawn"+i;
    cardFromDeck.className = "SolitareCard topCard";
    cardFromDeck.ondragstart = drag;
    cardFromDeck.draggable = "true";
    document.getElementById("deckShown").appendChild(cardFromDeck);

    const topCard= document.getElementById("cardDrawn"+i);
    topCard.style.display = "block";


    topCard.innerHTML = deck[i+21];
    i++;
}

