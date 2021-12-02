/**
 * @format
 */

const NEXT_BUTTON_CODE = 39;
const PREV_BUTTON_CODE = 37;

const $buttonNext = document.querySelector('.punch-viewer-navbar-next');
const $buttonPre = document.querySelector('.punch-viewer-navbar-prev');

(async () => {
  async function init() {
    getGoogleData();
    initEventListeners();

    // setInterval(()=>{
    //   emulateActionUser(NEXT_BUTTON_CODE);
    // },3000)
  }

  // получаем и отправляем данные в вебворкер презентации
  async function getGoogleData(params) {
    const googleData = await loadGoogleData();
    await sendGoogleData(googleData);
  }

  // вешаем обработчики на презентацию для синхронизации
  async function initEventListeners(params) {
    function debounce(f, t = 300) {
      let timer;
      return (...args) => {
        if (!timer) {
          f.apply(this, args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
          timer = undefined;
        }, t);
      };
    }

    function onScroll(event) {
      if (event.deltaY > 0) {
        sendNextSlide(event);
      } else {
        sendPrevSlide(event);
      }
    }

    $buttonNext.addEventListener('click', sendNextSlide);
    $buttonPre.addEventListener('click', sendPrevSlide);

    document.addEventListener('click', sendNextSlide);

    document.addEventListener('keyup', event => {
      switch (event.key) {
        case 'ArrowLeft':
          sendPrevSlide(event);
          break;
        case 'ArrowRight':
          sendNextSlide(event);
          break;
        case 'ArrowUp':
          sendPrevSlide(event);
          break;
        case 'ArrowDown':
          sendNextSlide(event);
          break;
      }
    });

    window.addEventListener('mousewheel', debounce(onScroll, 70), {
      passive: false
    });
  }

  // загружаем данные презы из контекста страницы
  async function loadGoogleData() {
    return new Promise((res, rej) => {
      const $script = document.createElement('script');
      $script.src = chrome.runtime.getURL('execute.js');

      document.body.appendChild($script);

      document.body.addEventListener('init-slide-control', e => {
        const store = e.detail.googleDataView;
        res(store);
        $script.remove();
      });
    });
  }

  async function sendGoogleData() {
    //
  }

  async function sendNextSlide(event) {
    event.preventDefault();
    event.stopPropagation();
    // chrome.runtime.sendMessage({
    //   contentScriptQuery: "postFetch",
    //   data: {
    //     id: "next-slide",
    //   },
    //   url: `${api}/key`,
    // });
    console.log('sendNextSlide');
  }

  async function sendPrevSlide(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('sendPrevSlide');
  }

  async function getKey(payload) {
    // const api = 'http://localhost:5010';
    // const data = JSON.stringify(payload);
    // console.log('getKey');
    // chrome.runtime.sendMessage(
    //   {
    //     contentScriptQuery: 'postFetch',
    //     data: data,
    //     url: `${api}/key`
    //   }
    // response => {
    //   console.log(response);
    //   if (response) {
    //     console.log(response);
    //   }
    // }
    // );
  }

  const emulateActionUser = (key) => {
    const $script = document.createElement('script');
    $script.src = chrome.runtime.getURL('press.js');
    $script.dataset.key = key;
    $script.dataset.id = 'press-key';
    document.body.appendChild($script);
    $script.onload = () => $script.remove();
  }

  init();
})();
