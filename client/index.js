const state = {
  slide: 0,
  text: ''
};

const $inputKey = document.querySelector('.input-key');
const $btnConnect = document.querySelector('.connect');
const $btnPre = document.querySelector('.pre');
const $btnNext = document.querySelector('.next');
const $text = document.querySelector('.text');

$btnConnect.addEventListener('click', e => {
  console.log(e);
});

$btnPre.addEventListener('click', e => {
  console.log(e);
});

$btnNext.addEventListener('click', e => {
  console.log(e);
});
