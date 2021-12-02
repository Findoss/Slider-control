/**
 * @format
 */

importScripts("service-worker-utils.js");

const NEXT_BUTTON_CODE = 39;
const PREV_BUTTON_CODE = 37;

function init() {
  chrome.runtime.onMessage.addListener((req, info, cb) => {
    if (req.action === "start-presentation") {
      startPresentation().then((key) => {
        cb(key);
      });
    }

    if (req.action === "get-key") {
      getKey().then(({ key }) => {
        cb(key);
      });
    }

    return true;
  });

  chrome.webNavigation.onHistoryStateUpdated.addListener(updateSlide);
}

function setKey(key) {
  chrome.storage.local.set({ key: key });
}

function getKey() {
  return chrome.storage.local.get("key");
}

async function updateSlide(e) {
  const { url } = e;

  const id = new URL(url).pathname.split("/")[3];
  const slide = new URL(url).searchParams.get("slide").substring(3);
  const { key } = await getKey();

  const slideData = {
    id,
    key,
    slide,
  };

  fetch("http://localhost:5010/update", {
    method: "POST",
    body: JSON.stringify(slideData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // todo send server next slide
}

async function startPresentation() {
  const presentationData = await new Promise((res, rej) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "get-data-presentation" },
        (data) => {
          res(data);
        },
      );
    });
  });

  const raw = await fetch("http://localhost:5010/start", {
    method: "POST",
    body: JSON.stringify(presentationData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { key } = await raw.json();
  setKey(key);

  return key;
}

init();
