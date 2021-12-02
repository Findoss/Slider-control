/**
 * @format
 */

importScripts('service-worker-utils.js');

function setKey(key) {
  chrome.storage.local.set({ key: key });
}

function getKey() {
  return chrome.storage.local.get('key');
}

function init() {
  chrome.runtime.onMessage.addListener(e => {
    setKey(startPresentation(e));
  });

  chrome.runtime.onMessage.addListener((req, info, cb) => {
    if (req.action === 'get-key') {
      const key = getKey();

      if (key) {
        cb(key);
      } else {
        cb(startPresentation());
      }

      return true;
    }
  });

  chrome.webNavigation.onHistoryStateUpdated.addListener(updateSlide);
}

function updateSlide(e) {
  const { url } = e;

  const searchParams = new URLSearchParams(new URL(url).searchParams);

  // todo send server next slide
  console.log(searchParams.get('slide'));
}

function startPresentation(data) {
  console.log(data);
  return Math.random();
}

init();
