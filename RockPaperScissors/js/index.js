import '../scss/index.scss';

import { game } from './game';
import { resetGame } from './game';
import {chooseWindow, resultWindow, scoreWindow, resetBtn, restartBtn, 
    resultGlobalWindow, names, rules, startBtn} from './constants'

let charactersArr = [];
let gameCount = 1;

const chooseContainer = document.createElement('div');

let createCharacters = () => {
    if(gameCount===1){
        chooseContainer.classList.add('choose__container');
        chooseWindow.appendChild(chooseContainer);
        for (let i = 0; i < 3; i++) {
            const character = document.createElement('div');
            character.classList.add('choose__character');
            chooseContainer.appendChild(character);
        }
        
    }
    const characters = Array.from(document.querySelectorAll('.choose__character'));


// Input name into character
characters.forEach( (element, index) => {
    element.innerText = names[index];
});

characters.forEach( (character, index) => {
    character.addEventListener('click', () => {
        clickCharacter(index);
    });
});
}


let getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

let clickCharacter = (index) => {

    if (charactersArr.length<1){
        charactersArr[0] = names[index];
        charactersArr[1] = names[getRandomInt(3)];
        gameCount++;
        game(charactersArr);
        
        return true;
    } else {
        return false;
    }  
}




startBtn.addEventListener('click', () => {
    startBtn.classList.add('hidden');
    rules.classList.add('hidden');
    chooseWindow.classList.remove('hidden');
    resetBtn.classList.remove('hidden');
    if(gameCount === 1) {
        createCharacters();
    }
});

restartBtn.addEventListener('click', () => {
    chooseWindow.classList.remove('hidden');
    resetBtn.classList.add('hidden');
    resultWindow.classList.add('hidden');
    scoreWindow.classList.add('hidden');
    charactersArr.length=0;
});
resetBtn.addEventListener('click', () => {
    gameCount=1;
    gameCount++;
    resetBtn.classList.add('hidden');
    scoreWindow.classList.add('hidden');
    restartBtn.classList.add('hidden');
    resultWindow.classList.add('hidden');
    resultGlobalWindow.classList.add('hidden');
    rules.classList.remove('hidden');
    startBtn.classList.remove('hidden');
    chooseWindow.classList.add('hidden');
    charactersArr.length=0;
    resetGame();
});