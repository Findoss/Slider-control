/**
 * @format
 */

const $buttonNext = document.querySelector(".punch-viewer-navbar-next");
const $buttonPre = document.querySelector(".punch-viewer-navbar-prev");

(async () => {
  async function init() {
    chrome.runtime.onMessage.addListener((req, info, cb) => {
      if (req.action === "get-data-presentation") {
        extractGoogleData().then((data) => {
          cb(data);
        });
      }

      if (req.action === "key-press") {
        emulateActionUser(req.codeKey);
      }

      return true;
    });
  }

  async function extractGoogleData() {
    return new Promise((res, rej) => {
      const $script = document.createElement("script");
      $script.src = chrome.runtime.getURL("execute.js");

      document.body.appendChild($script);

      document.body.addEventListener("init-slide-control", (e) => {
        const { googleDataView } = e.detail;
        res(googleDataView);
        $script.remove();
      });
    });
  }

  const emulateActionUser = (key) => {
    const $script = document.createElement("script");
    $script.src = chrome.runtime.getURL("press.js");
    $script.dataset.key = key;
    $script.dataset.id = "press-key";
    document.body.appendChild($script);
    $script.onload = () => $script.remove();
  };

  init();
})();
