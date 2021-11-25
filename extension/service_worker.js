chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.contentScriptQuery == 'getFetch') {
    const url = request.url;
    // fetch(url)
    //   .then(response => response.json())
    //   .then(response => sendResponse(response))
    //   .catch();
    return true;
  }

  if (request.contentScriptQuery == 'postFetch') {
    try {
      let raw = await fetch(request.url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: request.data
      });
      const data = await raw.json();

      console.log(data);
      sendResponse(data);
    } catch (error) {
      console.error(error);
    }

    return true;
  }

  return true;
});
