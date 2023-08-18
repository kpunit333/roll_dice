let target = 30;
let cutoff = 1;

let diceArray = ['./rolling-dice-2.gif','./dice-face-1.png', './dice-face-2.png', './dice-face-3.png', './dice-face-4.png', './dice-face-5.png', './dice-face-6.png'];

let players = ['player1', 'player2'];

let celbox = $('.game-roll-screen-container')
let partygif = 'url(./party.webp)';

let greenU = 'rgba(4, 255, 0, 0.637)';
let greenL = 'rgb(3, 74, 7)';

let redU = 'rgba(255, 85, 0, 0.8)';
let redL = 'rgb(74, 21, 3)';

let blueA = 'rgba(0, 255, 255, 0.8)';
let blueX = 'rgba(0, 255, 255, 0.4)';
let blueL = 'rgb(2, 6, 54)';

let rollingImg = $('#rolling-dice-img');

let resetBtn = $('.reset-btn');
let rollBtn = $('.roll-btn');
let holdBtn = $('.hold-btn');

let turn = 0;

function reset()
{
    gameOver = false;
    turn = 0;

    $('#player1-total').text('0');
    $('#player1-score').text('0');

    $('#player2-total').text('0');
    $('#player2-score').text('0');

    celbox.css('background','');

    $(`.player1-screen`).css('background', blueA);
    $(`.player1-lower-screen`).css('background', blueL);

    $(`.player2-screen`).css('background', blueX);
    $(`.player2-lower-screen`).css('background', blueL);

    rollBtn.attr('disabled',false);
    holdBtn.attr('disabled',false);

    updateDice(1);
}

function celebrate(win)
{
    $(`.${players[win]}-screen`).css('background', greenU);
    $(`.${players[win]}-lower-screen`).css('background', greenL);

    win = (win+1)%2;

    $(`.${players[win]}-screen`).css('background', redU);
    $(`.${players[win]}-lower-screen`).css('background', redL);

    celbox.css('background',partygif);

    rollBtn.attr('disabled',true);
    holdBtn.attr('disabled',true);

    updateDice(0);
}

function getUpperScore(tn)
{
    return $(`#${players[tn]}-total`).text();
}

function getLowerScore(tn)
{
    return $(`#${players[tn]}-score`).text();
}

function updateDice(n)
{
    rollingImg.attr('src',diceArray[n]);
}

function updateScore(tn, n)
{
    $(`#${players[tn]}-score`).text(n);
}

function updateTotal(tn)
{
    let upperScore = getUpperScore(tn);
    let lowerScore = getLowerScore(tn);

    let newScore = parseInt(upperScore) + parseInt(lowerScore);

    $(`#${players[tn]}-total`).text(newScore);
}

function swapTurn()
{
    $(`.${players[turn]}-screen`).css('background', blueX);

    turn = (turn+1)%2;

    $(`.${players[turn]}-screen`).css('background', blueA);
}

function throwDice()
{
    let a = Math.floor((Math.random() * 6) + 1);

    rollingImg.attr('src',diceArray[0]);
    
    setTimeout(()=>{

        rollingImg.attr('src',diceArray[a]);

    },800);

    return a;
}

function holdDice()
{
    updateTotal(turn);
    updateScore(turn, 0);
    swapTurn();
}

let gameOver = false;

function rollDice()
{
    let score = throwDice();

    // console.log(players[turn], turn, score);
    
    setTimeout(()=>{
        
        let currentScore = getLowerScore(turn);
        let newScore = parseInt(currentScore)+parseInt(score);

        let upperScore = parseInt(getUpperScore(turn));

        updateScore(turn, newScore); 

        if(score == 1)
        {
            updateScore(turn, 0);
            swapTurn();
        }

        if(upperScore + newScore >= target)
        {
            // console.log('win', upperScore, newScore);
            celebrate(turn);
            updateTotal(turn);
            gameOver = true;
            return;
        }
    

    }, 1000);

    if(gameOver){
        return;
    }
}

function gameplay()
{
    rollBtn.click(()=>{
        // console.log('rolled');
        rollDice();
    });

    holdBtn.click(()=>{
        // console.log('hold');
        holdDice();
    })

    resetBtn.click(()=>{
        // console.log('reset');
        reset();
    })

    if(gameOver){
        return;
    }
}


$(document).ready(()=>{

    gameplay();

})