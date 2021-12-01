const $key = document.querySelector('.section_key__number');
const $buttonNewKey = document.querySelector('.button_new_key');

function init() {
  $buttonNewKey.addEventListener('click', getNewKey);
  getNewKey();
}

function updateKey(key) {
  $key.textContent = JSON.stringify(key);
}

function getNewKey() {
  chrome.runtime.sendMessage({ action: 'get-key' }, key => {
    // if (key) updateKey(key);
    updateKey(key);
  });
}

init();
