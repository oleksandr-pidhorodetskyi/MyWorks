const chooseWindow = document.querySelector('.main__choose');
const resultWindow = document.querySelector('.main__result');
const scoreWindow = document.querySelector('.main__score');
const resetBtn = document.querySelector('.main__reset');
const restartBtn = document.querySelector('.main__restart');
const resultGlobalWindow = document.querySelector('.main__result-global');
const names = ['Rock', 'Paper', 'Scissors'];

const rules = document.querySelector('.main__rules');

const startBtn = document.querySelector('.main__start');

export {
    chooseWindow, resultWindow, scoreWindow, resetBtn,
    restartBtn, resultGlobalWindow, names, rules, startBtn
};