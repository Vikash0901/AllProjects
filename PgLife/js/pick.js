'Use strict';
const player0El =document.querySelector('.player--0');
const player1El =document.querySelector('.player--1');
const score0El=document.querySelector('#score--0');
const score1El=document.getElementById('score--1');
const current0El=document.getElementById('current--0');
const current1El=document.getElementById('current--1');
const diceEl=document.querySelector('.dice');
const btnNew= document.querySelector('.btn--new');
const btnRoll= document.querySelector('.btn--roll');
const btnHold= document.querySelector('.btn--hold');

///starting condition
score0El.textContent=0;
score1El.textContent=0;
diceEl.classList.add('hidden');

const scores=[0,0];
let currentScore=0;
let activePlayer=0;
let playing=true;

const switchPlayer=function(){
        document.getElementById(`current--${activePlayer}`).textContent=0;
        currentScore=0;
        activePlayer= activePlayer===0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}

//rolling dice functionally
btnRoll.addEventListener('click',function(){
    if(playing){
    //generating a random dice roll
    const dice=Math.trunc( Math.random()*6)+1;  
    // console.log(dice);

    //2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src=`/img/dice-${dice}.png`;

    //3. check for rolled 1
    if(dice !==1){
        //add dice to current score
    currentScore+= dice;
        // current0El.textContent=currentScore;
    document.getElementById(`current--${activePlayer}`).textContent=currentScore;
    }else{
        switchPlayer(); 
    }
}

});

btnHold.addEventListener('click', function(){
    if(playing){
    //add the current score to active player
    scores[activePlayer]+= currentScore;
    //scores[1]=scores[1]+currentScore
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];

    //2. check if player's score is >=100
    //finish the game
    if (scores[activePlayer]>=20){
        playing=false;
        Document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        Document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    }
    else {
        switchPlayer();
    }
}

    //3.switch the player
})