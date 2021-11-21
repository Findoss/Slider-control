(async () => {
  const ModeEnum = {
    PRESENT: 'present',
    present: 'PRESENT',
    EDIT: 'edit',
    edit: 'EDIT'
  };

  const SelectorsGoogle = {
    TITLEBAR: '.docs-titlebar-buttons'
  };

  const Pages = {
    [ModeEnum.PRESENT]: { init: PresentPage },
    [ModeEnum.EDIT]: { init: EditPage }
  };

  const store = {
    title: 'loading',
    slides: [],
    currentSlide: 0
  };

  function start() {
    const path = location.pathname.slice(
      location.pathname.lastIndexOf('/') + 1,
      location.pathname.length
    );

    if (path) {
      Pages[path].init();
    }
  }

  function EditPage() {
    const $titlebar = document.querySelector(SelectorsGoogle.TITLEBAR);

    const $btnStart = document.createElement('button');
    $btnStart.textContent = 'Start presentation';
    $btnStart.addEventListener('click', () => {
      location.href = location.href.replace(ModeEnum.EDIT, ModeEnum.PRESENT);
    });

    $titlebar.prepend($btnStart);
  }

  async function PresentPage() {
    console.log('PresentPage');
    const store = await loadGoogleData();
    getKey(store);

    console.log(store);
  }

  async function loadGoogleData() {
    return new Promise((res, rej) => {
      const $script = document.createElement('script');
      $script.src = chrome.runtime.getURL('execute.js');

      document.body.appendChild($script);

      document.body.addEventListener('init-slide-control', e => {
        const store = e.detail.googleDataView;
        store.currentSlide = 0;
        res(store);
        $script.remove();
      });
    });
  }

  async function getKey(payload) {
    let response = await fetch('http://localhost:5010', { body: payload, method: 'POST' });

    if (response.ok) {
      let json = await response.json();
      console.log(json);
    } else {
      alert('Ошибка HTTP: ' + response.status);
    }
  }

  start();
})();
