let sliderButtons = Array.from(document.querySelectorAll('.slider__item'));
let sliderLists = Array.from(document.querySelectorAll('.companies-grow-up__list'));

// slider
let curId = 0;
let  = 0;
let timer = setInterval(() => {
    if(pressedId < sliderLists.length-1) {
        pressedId++;
        changelist();
    } else{
        pressedId = 0;
        changelist();
    }
}, 8000);
let changelist = ()=>{
    if(pressedId != curId){
            sliderButtons[pressedId].classList.add('slider__item-active');
            sliderButtons[curId].classList.remove('slider__item-active');
            sliderLists[curId].classList.add('hide');
            sliderLists[pressedId].classList.remove('hide');
            curId = pressedId;
        }
}
sliderButtons.forEach((button)=>{
    button.addEventListener('click', () => {
        pressedId = sliderButtons.indexOf(button);
        changelist();
    })
})
//-------------------------------
// button UP
var smoothJumpUp = function() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        window.scrollBy(0,-50);
        setTimeout(smoothJumpUp, 10);
    }
}

window.onscroll = function() {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if (scrolled > 100) {
      document.querySelector('.button-up').style.display = 'block';
  } else {
      document.querySelector('.button-up').style.display = 'none';
  }
}
//-------------------------------