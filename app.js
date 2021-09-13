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

const gameBoard = [[0,1,2],[3,4,5],[6,7,8]];
const tics = document.querySelectorAll('.tic');
const bothMoves = [];

const makePlayer = function(){
    const storeMoveX = [];
    const storeMoveO = [];

    const playMove = function(x){
        Array.from(tics, (e)=>{
            e.addEventListener('click', ()=>{
                const index = e.dataset.index;
                if(e.textContent===''){
                    if(bothMoves.length === 0 || bothMoves[bothMoves.length-1] === 'O'){
                        e.textContent = 'X';
                        storeMoveX.push(index);
                        bothMoves.push('X');
                        checkWinner(storeMoveX)
                    }else if(bothMoves[bothMoves.length-1] === 'X'){
                        e.textContent = 'O';
                        storeMoveO.push(index);
                        bothMoves.push('O');
                        checkWinner(storeMoveO);
                    }
                }
            })
        });
    };

    const checkWinner = function(moves){
        moves.forEach(element => {
            
        });
    };
    
    return {playMove};
};

const startGame = function (){
    const player = makePlayer();
    player.playMove()
}

startGame();

