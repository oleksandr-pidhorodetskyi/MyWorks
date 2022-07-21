import '../scss/index.scss';
import { backArrow, forwardArrow, daysContainer, title } from './constants.js';

const nowDate = new Date();

let reload = () => {
    nowDate.setDate(1);
    title.innerHTML = `${nowDate.toLocaleString('Eng', 
    { month: 'long' })} ${nowDate.getFullYear()}`;

    const startIndex = nowDate.getDay();
    const lastDayNow = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate();
    const endIndex = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDay();
    const lastDayForward = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0).getDate();
        
    let nowLastForward = () => {
        let index = 0;
        if(startIndex > 4){
            index = 7 - endIndex - 1;
        } else {
            index = 14 - endIndex - 1;
        }
        return index;
    }
    let createDays = () => {
        daysContainer.innerHTML = '';
        for (let i = startIndex; i > 0; i--) {
            const dayBefore = document.createElement('div');
            dayBefore.classList.add('calendar__day-before');
            dayBefore.classList.add('calendar__day');
            dayBefore.innerText = lastDayForward - i + 1;
            daysContainer.appendChild(dayBefore);
        }

        for (let i = 1; i <= lastDayNow; i++) {
            if (i === new Date().getDate() && nowDate.getMonth() === new Date().getMonth() 
            && nowDate.getFullYear() === new Date().getFullYear()) {
                const dayToday = document.createElement('div');
                dayToday.classList.add('calendar__day-today');
                dayToday.classList.add('calendar__day');
                dayToday.innerText = i;
                daysContainer.appendChild(dayToday);
            } else {
                const ussualDay = document.createElement('div');
                ussualDay.classList.add('calendar__day');
                ussualDay.innerText = i;
                daysContainer.appendChild(ussualDay);
            }
        }
        for (let i = 1; i <= nowLastForward(); i++) {
            const dayNext = document.createElement('div');
            dayNext.classList.add('calendar__day-after');
            dayNext.classList.add('calendar__day');
            dayNext.innerText = i;
            daysContainer.appendChild(dayNext);
        }
    }
    createDays();
};

backArrow.addEventListener('click', () => {
    nowDate.setMonth(nowDate.getMonth() - 1);
    reload();
});
forwardArrow.addEventListener('click', () => {
    nowDate.setMonth(nowDate.getMonth() + 1);
    reload();
});

reload();