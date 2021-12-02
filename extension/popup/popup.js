/**
 * @format
 */

const $blockPrompt = document.querySelector(".prompt");
const $blockControl = document.querySelector(".control");

const $key = document.querySelector(".section_key__number");
const $buttonNewKey = document.querySelector(".button_new_key");

function init() {
  $buttonNewKey.addEventListener("click", start);
  renderControl();
}

function renderPrompt() {
  $blockPrompt.classList.remove("hide");
  $blockControl.classList.add("hide");
}

function renderControl() {
  $blockPrompt.classList.add("hide");
  $blockControl.classList.remove("hide");
}

function updateKey(key) {
  $key.textContent = JSON.stringify(key);
}

function getKey() {
  chrome.runtime.sendMessage({ action: "get-key" }, (key) => {
    console.log(key);
    updateKey(key);
  });
}

function isPresent() {
  console.log(location.host);
  return location.host === "docs.google.com";
}

function start() {
  chrome.runtime.sendMessage({ action: "start-presentation" }, (key) => {
    console.log(key);
    updateKey(key);
  });
}

init();
