//Global Variables
let nCartas = 1;
let cartas = [];
let cont = 0;
let seg = 0;
let idInt;

//Initialize game
startGame();

//Start game function
function startGame() {
    while(nCartas%2 !== 0 || nCartas<4 || nCartas>14){
        nCartas = Number(prompt("With how many cards do you wanna play? (just even numbers)"));
    }
    createCards();
    displayCards();
    startTimer();
}

//Create cards function
function createCards() {
    for(let i = 0; i<nCartas/2;i++){
        cartas.push(i+1);
        cartas.push(i+1);
    }
    cartas.sort(comparator); 
}

//Comparator function to shuffle the cards
function comparator() { 
    return Math.random() - 0.5; 
} 

//Display cards function
function displayCards() {
    let cardHTML = "";
    for(let a = 0; a<nCartas;a++){
        cardHTML += `
        <div class="card">
                <div class="id">${cartas[a]}</div>
                <div class="front-face face" onclick='selectCard(this)'><img src="./images/front.png"></div>
                <div class="back-face face"><img src="./images/${cartas[a]}.gif"></div></div>`;

}
document.querySelector(".page").innerHTML = cardHTML;
}


//Select card function
function selectCard(element) {
const parent = element.parentNode;
let flippedCards = document.querySelectorAll(".card.flipped");

if(flippedCards.length < 2){
    cont += 1;
    flipCard(parent);
    checkMatch();
}
}

//Flip card function
function flipCard(element){
element.classList.toggle('flipped');

if(element.classList.contains("flipped")){
    element.querySelector(".back-face").style.transform = "rotateY(0deg)";
    element.querySelector(".front-face").style.transform = "rotateY(-180deg)";
}else{
    element.querySelector(".back-face").style.transform = "rotateY(180deg)";
    element.querySelector(".front-face").style.transform = "rotateY(0deg)";
}
}

//Check match function
function checkMatch(){
  let flippedCards = document.querySelectorAll(".card.flipped");
  let question = "";

  if(flippedCards.length == 2){
      if(flippedCards[0].querySelector(".id").innerHTML == flippedCards[1].querySelector(".id").innerHTML){
          flippedCards[0].classList.remove("flipped");
          flippedCards[1].classList.remove("flipped");
          flippedCards[0].classList.add("correct");
          flippedCards[1].classList.add("correct");
      }else{
          setTimeout(function () {
              flipCard(flippedCards[0]);
              flipCard(flippedCards[1]);
          }, 1000);
      }
  }
  if(document.querySelectorAll(".card.correct").length == nCartas){
      clearInterval(idInt);
      setTimeout(function () {
          alert("You won in " + cont + " turns!");
          while(question !== "yes" && question !== "no"){
              question = prompt("Do you wanna play again? (yes or no)");
              if(question === "yes"){
                  document.location.reload(true);
              }
          }
      }, 500);
  }
}