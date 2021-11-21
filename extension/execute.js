// console.log(window.viewerData);

const data = {
  googleDataView: {
    title: window.viewerData.title,
    slides: window.viewerData.docData[1].map(item => {
      return { index: item[1], slide: item[0], text: item[9] };
    })
  }
};

const eventLoadData = new CustomEvent('init-slide-control', {
  detail: data
});

document.body.dispatchEvent(eventLoadData);
