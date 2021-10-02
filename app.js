/* 
1. Create an array of gameboard
2. Create a factory function to create Player Objects
3. Create an Object to control the game flow
4. Create a function to play the move on the board
5. If 3-in-a-row, then end the game

[winning combinations]

Player Factory Function:

New Player Object = 

If the move can be played(){}

getPosition where played(){}

Is 3-in-a-row completed(){}

winningLogic(playerMovesArray)
*> if none player win, then draw()

draw()
*/

const winningCombo = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const tics = document.querySelectorAll('.tic');
const startGame = document.querySelector('#start');
const restart = document.querySelector('#restart');
const winnerPlayer = document.querySelector('.modal-content');
const beforModal = document.querySelector('.before-modal')
let bothMoves = [];

const game = function () {
    function computerPlay(){
        const ticArray = Array.from(tics);
        const emptryTics = ticArray.filter(num=>{
            return (!num.innerText);
        })
        const num = emptryTics.map(index=>[
            index.getAttribute('data-index')
        ]);
        
        if(num.length==0){
            return;
        }
        const rand = Math.floor(Math.random()*num.length);
        tics[num[rand]].textContent='O';
        bothMoves.push('O')
    }

    function playerPlay(){
        tics.forEach(tic=>{
            tic.addEventListener('click', ()=>{
                if(!tic.textContent==''){
                    return;
                }
                tic.textContent = 'X';
                bothMoves.push(tic.getAttribute('data-index'))
                this.computerPlay();
                checkDraw();
            })
        })
    }

    function checkWinner(player){
        return winningCombo.some(move=>{
            return move.every(moves=>{
                return tics[moves].textContent===player;
            })
        })
    }

    function checkWin(){
        if (checkWinner('X')){
            displayModal('Winner is X');
        }
        else if(checkWinner('O')){
            displayModal('Winner is O');
        }
        else{
            return false;
        }
    }

    function checkDraw(){
        if(!checkWin() && bothMoves.length==9){
            displayModal('Draw');
        }
    }

    function restart(){
        tics.forEach(el=>{
            el.textContent='';
        })
        bothMoves = [];
    }

    function displayModal(player){
        setTimeout(function(){
            beforModal.classList.add('modal')
            winnerPlayer.textContent = `${player}`;
            winnerPlayer.style.display = 'flex';
        },0)
    }

    return {playerPlay, checkWinner, computerPlay, checkDraw, restart}
}

startGame.addEventListener('click', function starting(){
    const start = game();
    start.playerPlay()
})

restart.addEventListener('click', ()=>{
    const restartH = game();
    beforModal.classList.remove('modal')
    winnerPlayer.style.display = 'none';
    restartH.restart();
    restartH.playerPlay();
})