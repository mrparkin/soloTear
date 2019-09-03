'use strict';/* jshint -W097 */



function redOrBlack (string){
    if(string.toLowerCase().includes("diamonds")||string.toLowerCase().includes("hearts")){
        return "red";
    }
    else{
        return "black";
    }    
}
function convertToNumber(cardNo){
    if(cardNo.includes("A")){
        return 1;
    }
    if(cardNo.includes("J")){
        return 11;
    }
    if(cardNo.includes("Q")){
        return 12;
    }
    if(cardNo.includes("K")){
        return 13;
    }
    else{return parseInt(cardNo);}
}


function higherOrLower(selected, target){
    selected = convertToNumber(selected.toString());
    target = convertToNumber(target.toString());
    if(selected!=target-1){
        return false;
    }
}

function isHigher(selected, target){
    selected = convertToNumber(selected.toString());
    target = convertToNumber(target.toString());
    if(selected!=target+1){
        return false;
    }
}


function checkForFlip(_selectedCardParentElement){
    //does sleected card have a card in previous stack to flip
    if(_selectedCardParentElement.childNodes.length >0)
    {
        const checkIfLastCardNeedsTurning = document.getElementById(_selectedCardParentElement.id).lastElementChild.classList[0];
        const lastchildId = document.getElementById(_selectedCardParentElement.id).lastElementChild.id;

        if(checkIfLastCardNeedsTurning.includes("faceUp")==false)
        {
            document.getElementById(lastchildId).classList.remove("facedown");
            document.getElementById(lastchildId).classList.add("faceUp");
            document.getElementById(lastchildId).draggable ="true";
        }
    }

}

function checkIfCardFromDeck(_cardSelectedElement){
    if(_cardSelectedElement.className.includes("newCard")){
        _cardSelectedElement.classList.remove("newCard");
    }
}

var subElementsIdsArray = [];
function checkIfSelectedCardHasChildren(_selectedCardElement){
 
    if(_selectedCardElement.id == _selectedCardElement.parentElement.lastElementChild.id){
    
        subElementsIdsArray.push(_selectedCardElement.id);
        return subElementsIdsArray;

    }
    else{
          
        
        subElementsIdsArray.push(_selectedCardElement.id);

        checkIfSelectedCardHasChildren(_selectedCardElement.nextElementSibling);  
        return;// _selectedCardElement.nextElementSibling.id;
    }
}



function dropOntoLastChild(eventTarget, _selectedCardElement, _data){
    const eventTargetParent = eventTarget.parentElement;
    const _selectedCardParentElement = _selectedCardElement.parentElement;
    var newTopSpace = eventTarget.style.top;
    //only drop on the last card of stack
    if(eventTargetParent.lastElementChild || eventTargetParent.id.includes("stack")){
        
        //MOVE CARD to suit stack  
        if((eventTarget.className.includes("suits") || eventTargetParent.className.includes("suits")) && _selectedCardParentElement.lastElementChild){
            document.getElementById(_data).style.top = "";

            if(eventTarget.className.includes("faceUp")){
                //if(isHigher(_data,eventTarget) && _data.innerHTML.includes(eventTarget.innerHTML.splice(0,2))){
                    eventTargetParent.appendChild(document.getElementById(_data));
               // }
            }else{
                eventTarget.appendChild(document.getElementById(_data));
            }


        }
        //Move card to Stack
        else
        {
                //is selected from deck?
            if(_selectedCardParentElement.id=="deckShown")
            {
                //              need to pop the array (DECK) to remove card 
                eventTargetParent.appendChild(_selectedCardElement);
                newTopSpace = eventTarget.style.top;
                newTopSpace = parseInt(newTopSpace.replace("%",""))+20;
                
                if(Number.isNaN(newTopSpace)){
                    newTopSpace=20;
                }
                _selectedCardElement.style.top = newTopSpace+"%";
                let cardIndex = deck.indexOf(_selectedCardElement.innerHTML);
                deck.splice(cardIndex,1);
                deckDrawnCounter--;
            }
            else
            {
                checkIfSelectedCardHasChildren(_selectedCardElement);
            }

            let count=1;    
            //Each card underselect is processed for the move accross
            for(var indx =subElementsIdsArray.length; indx>0; indx--){
                eventTargetParent.appendChild(document.getElementById(subElementsIdsArray[0])); 
                

                newTopSpace = eventTarget.style.top;
                newTopSpace = parseInt(newTopSpace.replace("%",""))+(20*count); 
                //if first card on stack        
                if(Number.isNaN(newTopSpace)){
                    newTopSpace=20;
                }
                document.getElementById(subElementsIdsArray[0]).style.top = newTopSpace+"%";
                
                subElementsIdsArray.shift();
                count++;     
            }
            subElementsIdsArray = [];

        }
    
        checkForFlip(_selectedCardParentElement);

    }
}


document.addEventListener("dragstart",function(ev){
  let data =  ev.dataTransfer.setData("text", ev.target.id);
 // console.log(document.getElementById(data).nextElementSibling);                                              NEED TO FIX THIS NEXT 
});
document.addEventListener("dragover", function(ev){
    ev.preventDefault();
});
document.addEventListener("dragenter", function(event){
    if(event.target.className == "faceUp" || event.target.id.includes("stack")){
        event.target.style.border = "9px solid yellow";
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
    const data = ev.dataTransfer.getData("text");

    let selectedCard = document.getElementById(data);
    let selectedCardType = selectedCard.textContent;
    let selectedCardParent = selectedCard.parentElement;

  
    if(ev.target.tagName=="html"){return;}
    else if(ev.target.tagName !== "DIV" && ev.target.parentElement.classList[0].includes("cardPlaceholder") == false ){
        return;
    }
    else{
        //if card dropped on suit stack
        if(ev.target.parentElement.className.includes("suits")|| ev.target.className.includes("suits")){
            checkIfCardFromDeck(selectedCard);
            dropOntoLastChild(ev.target, selectedCard, data);
        }
        //if card is dropped on empty stack
        else if(ev.target.className.includes("cardPlaceholder") && selectedCardType.toLowerCase().includes("k")){
            document.getElementById(data).style.top ="";
            checkIfCardFromDeck(selectedCard);
            ev.target.appendChild(document.getElementById(data));
            checkForFlip(selectedCardParent);
        }
        //if card dropped on stack
        else if(redOrBlack(ev.target.textContent) != redOrBlack(selectedCardType)){
            if(higherOrLower(selectedCard.textContent,ev.target.textContent)==false)
            {               
                return;
            }
            checkIfCardFromDeck(selectedCard);
            dropOntoLastChild(ev.target, selectedCard, data);
            
        }

    }

});





let deck= [];
//DECK ---- JQUERY
$(document).ready(function(){

    let cardRange =["A","2","3","4","5","6","7","8","9","10","J","Q","K" ];
       
    for(let i=0; i< cardRange.length; i++){
        deck.push(cardRange[i]+ " Spades");
        deck.push(cardRange[i]+ " Hearts");
        deck.push(cardRange[i]+ " Clubs");
        deck.push(cardRange[i]+ " Diamonds");      
    }
  
    deck.sort(function(a,b) {return 0.5 - Math.random();});


    let dealCounter; let stackPosition = 1; let rowcount =0; let stackCards_topPercentage = 0;
    for(dealCounter=0; dealCounter<=27; dealCounter++)
    {
        //create card
        const currentCard = deck[dealCounter];
        const faceDownCard = document.createElement('div');  
        faceDownCard.innerHTML = currentCard;     
        faceDownCard.id = "faceDownCard"+dealCounter;
        faceDownCard.style.top = stackCards_topPercentage+"%";
        faceDownCard.className = "facedown";
        changeColour(faceDownCard);

        const faceUpCard = document.createElement("div");
        faceUpCard.id = "faceUpCard"+dealCounter;
        faceUpCard.innerHTML=currentCard;
        faceUpCard.draggable="True";
        faceUpCard.classList.remove("facedown");
        faceUpCard.classList.add("faceUp");
        changeColour(faceUpCard);



        if(dealCounter==0)
        {
            document.getElementById("stack"+stackPosition).appendChild(faceUpCard);
        }
       
        //change rows        
        else if(stackPosition>7)
        {  
            stackCards_topPercentage += 15;
            faceUpCard.style.top = stackCards_topPercentage+"%";

            //each row start new pos
            stackPosition=0;
            rowcount ++;
            for(let temp=0; temp<rowcount; temp++){
                stackPosition=temp+2;
            }
           
            document.getElementById("stack"+stackPosition).appendChild(faceUpCard);
        }
        else{
            document.getElementById("stack"+stackPosition).appendChild(faceDownCard);
        }
   
        stackPosition++; 
    }
    //remove dealt cards from array
    deck.splice(0,28);
    //Add green card
    deck.push("green");
});


function changeColour(cardElement){
    if(cardElement.innerHTML.toLowerCase().includes("heart")||cardElement.innerHTML.toLowerCase().includes("diamonds")){
        cardElement.classList.add("redCard");
    }
    else{
        cardElement.classList.add("blackCard");
    }
}

//deck click event
let deckDrawnCounter=0;
let goneThroughDeck=false;
function reveal(ev){
    
    if(goneThroughDeck==false){

        const cardFromDeck = document.createElement("div");
        cardFromDeck.id = "cardDrawn"+deckDrawnCounter;
        cardFromDeck.className = "cardPlaceholder newCard faceUp";
        document.getElementById("deckShown").appendChild(cardFromDeck);
        cardFromDeck.draggable = "true";
        const cardDrawn = document.getElementById("cardDrawn"+deckDrawnCounter);
        cardDrawn.style.display = "block";


        if(deck[deckDrawnCounter]=="green"){
            cardFromDeck.style.background = "green";
            cardFromDeck.draggable = false;
            cardFromDeck.innerHTML = deck[deckDrawnCounter];
            goneThroughDeck = true;
            //console.log("Deck Length="+deck.length+"    Deck position:"+deck.indexOf(cardDrawn.innerHTML)+ "         CArdValue is:"+cardDrawn.innerHTML);
            deckDrawnCounter = -1;

        }
        else{
            cardDrawn.innerHTML = deck[deckDrawnCounter];
           // console.log("Deck Length="+deck.length+"    Deck position:"+deck.indexOf(cardDrawn.innerHTML)+ "         CArdValue is:"+cardDrawn.innerHTML);
        }
        changeColour(cardDrawn);
    }
    else{
        
        //counter starts at 1           TRUE SIMPLE FINISH OF THIS PART WOULD MEAN GETTING THE GREEN BACKGROUND TO SHOW EVERY

        var getCard = document.getElementById("deckShown").childNodes;
        
        if(deckDrawnCounter==deck.length){
            deckDrawnCounter=0;
            getCard[deck.length-1].style.zIndex=0;
        }
        getCard[deckDrawnCounter].style.zIndex=1;
        //getCard[deckDrawnCounter-1].style.zIndex="";
        if(deckDrawnCounter>0){getCard[deckDrawnCounter-1].style.zIndex=0;}
        
        //console.log("Deck Length="+deck.length+"    Deck position:"+deck.indexOf(getCard[deckDrawnCounter].innerHTML)+ "         CArdValue is:"+getCard[deckDrawnCounter].innerHTML);
        
    }
   
    deckDrawnCounter++;
}

