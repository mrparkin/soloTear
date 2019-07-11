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
        deck.push(cardRange[i]+ " Clubs");
        deck.push(cardRange[i]+ " Diamonds");
       
    }
  
    deck.sort(function(a,b) {return 0.5 - Math.random();});

    console.log(deck.length);




    //deal [0,1,2,3,4,5,6] = 21 | 52-21 =  31

    var dealCounter; var stackPosition = 1; var rowcount =0; var stackCards_bottomPercentage = 0;

    for(dealCounter=0; dealCounter<=27; dealCounter++)
    {
        //create card
        var currentCard = deck[dealCounter].toLowerCase();
        var faceDownCard = document.createElement('div');       
        faceDownCard.id = "faceDownCard"+dealCounter;
        faceDownCard.style.position = "relative";
        faceDownCard.style.bottom = stackCards_bottomPercentage+"%"

        if(dealCounter==0)
        {
            faceDownCard.innerHTML=currentCard
            faceDownCard.style.background = "white";
            faceDownCard.style.padding = "0.5em"
        }
       

        //change rows 
        
        if(stackPosition>7)
        { 
            stackCards_bottomPercentage += 90;
            //RevealTop CArd and style
            faceDownCard.innerHTML=currentCard; 
            faceDownCard.style.background = "white";
            faceDownCard.style.padding = "0.5em"
            faceDownCard.style.bottom = stackCards_bottomPercentage+"%"
            

            //each row start new pos
            stackPosition=0;
            rowcount ++;
            for(var temp=0; temp<rowcount; temp++){
                stackPosition=temp+2
            }
           
            
        }
   
        //place cards in position
          
        //console.log("StackNo: "+stackPosition +"   in row no: "+ rowcount);
        document.getElementById("stack"+stackPosition).appendChild(faceDownCard);
      

        
        stackPosition++;
       







                
        if(currentCard.includes("ades")){
            faceDownCard.className = "SolitareCard facedown";
        }
        else  if(currentCard.includes("clubs")){
            faceDownCard.className = "SolitareCard facedown";
        }
        else  if(currentCard.includes("dia")){
            faceDownCard.className = "SolitareCard facedown";
        }
        else{
            faceDownCard.className = "SolitareCard facedown";
        }
    }


});












//deck click event
var i=0;
function reveal(ev){
    
    var cardFromDeck = document.createElement("div");
    cardFromDeck.id = "cardDrawn"+i;
    cardFromDeck.className = "cardPlaceholder newCard";
    cardFromDeck.ondragstart = drag;
    cardFromDeck.draggable = "true";
    document.getElementById("deckShown").appendChild(cardFromDeck);

    const cardDrawn= document.getElementById("cardDrawn"+i);
    cardDrawn.style.display = "block";


    cardDrawn.innerHTML = deck[i+21];
    i++;
}

