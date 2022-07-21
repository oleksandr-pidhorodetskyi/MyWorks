let score = [0, 0];
let roundCount = 1;
const player1 = document.querySelector('.result__first');
const player2 = document.querySelector('.result__second');
const round = document.querySelector('.result__round');
const winner = document.querySelector('.result__winner');
const winnerGlobal = document.querySelector('.result-global__text');
import {chooseWindow, resultWindow, scoreWindow, resetBtn, restartBtn, resultGlobalWindow, names} from './constants'


export let game = (players) => {

    chooseWindow.classList.add('hidden');
    resultWindow.classList.remove('hidden');
    restartBtn.classList.remove('hidden');
    resetBtn.classList.remove('hidden');
    scoreWindow.classList.remove('hidden');

    player1.innerText = players[0];
    player2.innerText = players[1];
    round.innerText = `Round ${roundCount}`;
    scoreWindow.innerText = `${score[0]} : ${score[1]}`;

    if(players[0]===players[1]){
        winner.innerText = `Tie!`;
    }else if(players[0] === names[1] && players[1] === names[0] ||
        players[0] === names[0] && players[1] === names[2] ||
        players[0] === names[2] && players[1] === names[1]){
        winner.innerText = `You\`ve WON!`;
        score[0]++;
        scoreWindow.innerText = `${score[0]} : ${score[1]}`;
        }else{
        winner.innerText = `You\`ve LOST!`;
        score[1]++;
        scoreWindow.innerText = `${score[0]} : ${score[1]}`;
    }
    roundCount++;
    if(score[0]===3){
        winnerGlobal.innerText = `You\`ve WON!`;
        resultGlobalWindow.classList.remove('hidden');
        resultWindow.classList.add('hidden');
        restartBtn.classList.add('hidden');
    }else if(score[1]===3){
        winnerGlobal.innerText = `You\`ve LOST!`;
        resultGlobalWindow.classList.remove('hidden');
        resultWindow.classList.add('hidden');
        restartBtn.classList.add('hidden');
    }
      
}
export let resetGame = () => {
    score = [0, 0];
    roundCount = 1;
}