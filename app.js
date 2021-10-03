const winningCombo = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const tics = document.querySelectorAll('.tic');
const startGame = document.querySelector('#start');
const res = document.querySelector('#restart');
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
                checkWin();
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
            displayBoard.displayModal('Winner is X');
        }
        else if(checkWinner('O')){
            displayBoard.displayModal('Winner is O');
        }
        else if(bothMoves.length==9){
            displayBoard.displayModal('Draw');
        }
    }

    return {playerPlay, checkWinner, computerPlay}
}

const displayBoard = (()=>{
    const restart = ()=>{
        tics.forEach(el=>{
            el.textContent='';
        })
        bothMoves = [];
    }

    const displayModal = (player)=>{
        setTimeout(function(){
            beforModal.classList.add('modal')
            winnerPlayer.textContent = `${player}`;
            winnerPlayer.style.display = 'flex';
        },0)
    }

    startGame.addEventListener('click', function starting(){
        const start = game();
        start.playerPlay()
    })
    
    res.addEventListener('click', ()=>{
        const restartGame = game();
        beforModal.classList.remove('modal')
        winnerPlayer.style.display = 'none';
        restart();
        restartGame.playerPlay();
    })

    return {restart, displayModal}
})()