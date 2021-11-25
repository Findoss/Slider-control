(async () => {
  async function PresentPage() {
    console.log('PresentPage');
    const store = await loadGoogleData();
    await getKey(store);

    console.log(store);
  }

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

  async function getKey(payload) {
    const api = 'http://localhost:5010';
    const data = JSON.stringify(payload);

    console.log('getKey');
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: 'postFetch',
        data: data,
        url: `${api}/key`
      }
      // response => {
      //   console.log(response);
      //   if (response) {
      //     console.log(response);
      //   }
      // }
    );
  }

  PresentPage();
})();
