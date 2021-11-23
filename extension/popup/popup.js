const $key = document.querySelector('.section_key__number');
const $buttonNewKey = document.querySelector('.button_new_key');

function updateKey(key) {
  $key.classList.add('special-text');
  $key.textContent = key;
}

function getNewKey() {
  console.log('btn getNewKey');
  updateKey((Math.random() * 1000000).toFixed(0));
}

$buttonNewKey.addEventListener('click', getNewKey);
updateKey();
