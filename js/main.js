function redOrBlack (string){
    if(string.toLocaleLowerCase().includes("diamonds")||string.toLocaleLowerCase().includes("hearts")){
        return "red"
    }
    else{
        return "black"
    }    
}
function convertToNumber(cardNo){
    if(cardNo=="A"){
        return 1;
    }
    if(cardNo=="J"){
        return 11;
    }
    if(cardNo=="Q"){
        return 12;
    }
    if(cardNo=="K"){
        return 13;
    }
}

function higherOrLower(dragged, target){

    if(dragged>target){
        return "false";
    }
}



document.addEventListener("dragstart",function(ev){
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.style.opacity ="0.7";
});
document.addEventListener("dragover", function(ev){
    ev.preventDefault();
});
document.addEventListener("dragenter", function(event){
    if(event.target.className == "faceUp" || event.target.id.includes("stack")){
        event.target.style.border = "3px solid blue";
    }
});
document.addEventListener("dragleave", function(event) {
    if ( event.target.className == "faceUp" || event.target.id.includes("stack")) {
      event.target.style.border = "";
    }
  });

  //DROP YO CARD
document.addEventListener("drop", function(ev){
    ev.preventDefault();
    ev.target.style.border = "";
    var data = ev.dataTransfer.getData("text");
    var cardType = document.getElementById(data).textContent;
    var comesFromParent = document.getElementById(data).parentElement.id;
    var redCards = cardType.toLocaleLowerCase().includes("diamonds")||cardType.toLocaleLowerCase().includes("hearts");
    console.log(redOrBlack(ev.target.textContent));
    //is card read or black ?
    if(redOrBlack(ev.target.textContent) != redOrBlack(cardType)){
        //need to split the text content, convert A,J,Q,K and do higher or lower function 
        var firstWord = [];
        for(var i=0; i<ev.target.textContent; i++){
            var words = ev.target.textContent[i].split(" ");
            firstWord.push(words[0]);
        }

        for(var x in firstWord){
        console.log(firstWord[x]);
        }



        //tell GUI where its allowed to stack    && append to the parent + overlap stack
        if(ev.target.id.includes("faceUpCard") ){
            document.getElementById(data).style.top = ev.target.parentElement.childElementCount+"0%";
            //insert element
            ev.target.parentElement.appendChild(document.getElementById(data));
            ev.target.style.opacity ="1";

            var checkIfLastCardNeedsTurning = document.getElementById(comesFromParent).lastElementChild.classList[0];
            var lastchildId = document.getElementById(comesFromParent).lastElementChild.id;

            if(checkIfLastCardNeedsTurning.includes("faceUp")==false){
                document.getElementById(lastchildId).classList.remove("facedown");
                document.getElementById(lastchildId).classList.add("faceUp");
                document.getElementById(lastchildId).draggable ="true";
            }

        }
        else if(ev.target.id.includes("stack"))
        {
            document.getElementById(data).style.top=ev.target.parentElement.childElementCount+"0%";
            //insert element
            ev.target.appendChild(document.getElementById(data));
            document.getElementById(data).style.opacity ="1";
            document.getElementById(data).style.top = "";

        }
    }
});



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

    var dealCounter; var stackPosition = 1; var rowcount =0; var stackCards_topPercentage = 0;

    for(dealCounter=0; dealCounter<=27; dealCounter++)
    {
        //create card
        var currentCard = deck[dealCounter];
        var faceDownCard = document.createElement('div');  
        faceDownCard.innerHTML = currentCard;     
        faceDownCard.id = "faceDownCard"+dealCounter;
        faceDownCard.style.top = stackCards_topPercentage+"%"

    
        faceDownCard.className = "facedown";
      
        var faceUpCard = document.createElement("div");
        faceUpCard.id = "faceUpCard"+dealCounter;
        faceUpCard.innerHTML=currentCard;
        faceUpCard.draggable="True";
        faceUpCard.classList.remove("facedown");
        faceUpCard.classList.add("faceUp");


        if(dealCounter==0)
        {
         
            document.getElementById("stack"+stackPosition).appendChild(faceUpCard);
        }
       


        //change rows        
        else if(stackPosition>7)
        { 
 
            stackCards_topPercentage += 10;
            faceUpCard.style.top = stackCards_topPercentage+"%"
         
           
            //ondrop="drop(event)" ondragover="allowDrop(event)"  draggable="true" ondragstart="drag(event)
            
            //each row start new pos
            stackPosition=0;
            rowcount ++;
            for(var temp=0; temp<rowcount; temp++){
                stackPosition=temp+2
            }
           
            document.getElementById("stack"+stackPosition).appendChild(faceUpCard);
        }
        else{
            document.getElementById("stack"+stackPosition).appendChild(faceDownCard);
        }
   
       
      

        
        stackPosition++;
       







                
     
    }


});












//deck click event
var i=0;
function reveal(ev){
    
    var cardFromDeck = document.createElement("div");
    cardFromDeck.id = "cardDrawn"+i;
    cardFromDeck.className = "cardPlaceholder newCard faceUp";
    document.getElementById("deckShown").appendChild(cardFromDeck);
    cardFromDeck.draggable = "true";
    const cardDrawn= document.getElementById("cardDrawn"+i);
    cardDrawn.style.display = "block";


    cardDrawn.innerHTML = deck[i+21];
    i++;
}

