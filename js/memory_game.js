//array of tiles to be used
let crds = [
"fa fa-diamond",
"fa fa-paper-plane-o",
"fa fa-anchor",
"fa fa-bolt",
"fa fa-cube",
"fa fa-anchor",
"fa fa-leaf",
"fa fa-bicycle",
"fa fa-diamond",
"fa fa-bomb",
"fa fa-leaf",
"fa fa-bomb",
"fa fa-bolt",
"fa fa-bicycle",
"fa fa-paper-plane-o",
"fa fa-cube"
];

//variables
let deck=document.querySelector(".deck");   
let card=document.getElementsByClassName("card");
let cards=[...card];
var time=document.querySelector("#timer");
let moves=document.querySelector(".moves");
let star=document.getElementsByClassName("fa-star");
let move=0;
let openedcard=[];
let matchedCard = document.getElementsByClassName("match");
let model=document.getElementById("popup1");
let reset_card= document.querySelector('.restart');
let close=document.querySelector('.close');

let second=0,minute=1;
let check_time=true;
let Interval;


//To manage time
function setTime(){
  Interval=setInterval(() => {
    if(matchedCard.length!=16){
      time.innerHTML =`mins: ${minute} seconds: ${second}`;
      second++;
      if(second==60){
        minute++;
        second=0;
      }
    }       
    else{
      let pop_moves=document.querySelector('#finalMove');
      let pop_time=document.querySelector('#totalTime');
      let pop_Star=document.querySelector(".stars").innerHTML;
      pop_moves.innerHTML=move;
      pop_time.innerHTML=`mins: ${minute} seconds: ${second}`;
      document.getElementById("starRating").innerHTML =pop_Star;
      model.classList.add('show');
    }
  }, 1000);
}

function start(){
  let li;
  let ii;
  let shfCards = shuffle(crds);
  let deckc=document.getElementById("deck");
  deckc.innerHTML=''
  shfCards.forEach(function(e){
    li=document.createElement("LI")
    li.setAttribute("class",'card')
    ii=document.createElement("i")
    ii.setAttribute('class',e)
    li.appendChild(ii)
    deckc.appendChild(li) 
  })
  move=0;
  moves.innerHTML=move;
  check_time=true;
  second=0,minute=0;
  check_time=true;
  clearInterval(Interval);
  time.innerHTML =`mins: ${minute} seconds: ${second}`;
  star[star.length-1].style.visibility = "visible";
  star[star.length-2].style.visibility = "visible";
  openedcard=[];
  for (var i = 0; i < 16; i++){
    card[i].addEventListener('click',deck_click);
  }
}

start();

// restart
function playagain(){
 start();
 model.classList.remove('show');
}

//Count number of moves
function move_add(){
  move++;
  moves.innerHTML=move;
  if(move>12&&move<16)
    star[star.length-1].style.visibility = "collapse";
  else if(move>16&&move<18){
    star[star.length-2].style.visibility = "collapse";
  }
}

// Shuffle function 
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


function deck_click(event){
  if(event.target.classList.contains('open')){
    console.log("Already Clicked");
  }
  else if(openedcard.length === 0){
    openedcard.push(event.target);
    event.target.classList.add('open','show');
    console.log(openedcard);
    if(check_time){
      setTime();
      check_time=false;
    }
  }
  else if (openedcard.length=== 1) {
    openedcard.push(event.target)  
    event.target.classList.add('open','show');
    setTimeout(card_check,500);
  }
}

// Matching Cards
function card_check(){

  if(openedcard[0].childNodes[0].classList[1].replace(/fa-/, "")!=openedcard[1].childNodes[0].classList[1].replace(/fa-/, "")){
    console.log(openedcard[0]);

    openedcard[0].classList.add('unmatched');

    openedcard[1].classList.add('unmatched');
    setTimeout(function(){
      openedcard[0].classList.remove('open','show','unmatched');
      openedcard[1].classList.remove('open','show','unmatched');
      openedcard=[];
    },300)
    console.log(openedcard.length);
  }
  else{
    console.log("matched");
    openedcard[0].classList.add('match');
    openedcard[1].classList.add('match');
    openedcard=[];
  }
  move_add();

}


close.addEventListener('click',function(){
  matchedCard=0;
  clearInterval(Interval);
  model.classList.remove('show');
});


reset_card.addEventListener('click',start);
