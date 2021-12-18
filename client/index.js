import { formatData } from '../common/formatData.js';
import { Presentation } from '../common/Presentation.js';
import { WS_API } from '../common/contsnts.js';
import { actions } from './actions.js';
import { render } from './render.js';
import { dom } from './dom.js';

const { renderNotes, renderTitle } = render;
const { $btnConnect, $inputKey, $btnNext, $btnPre } = dom;

const initPresentation = new Presentation({
  id: null,
  key: null,
  title: null,
  currentSlideId: null,
  slides: []
});

export const presentation = new Proxy(initPresentation, {
  set: function (target, property, value) {
    if (property === 'currentSlideId') {
      updateSlideId(target, property, value);
    }
    return (target[property] = value);
  }
});

const ws = new WebSocket(WS_API);

ws.onmessage = event => {
  const data = JSON.parse(event.data);
  const { payload, action } = data;
  actions[action](ws, payload);
};

$btnConnect.addEventListener('click', () => {
  ws.send(formatData('regKey', { key: $inputKey.value }));
});

$btnPre.addEventListener('click', () => {
  sendNewIdSlide(-1);
});

$btnNext.addEventListener('click', () => {
  sendNewIdSlide(+1);
});

const nextSlide = v => {
  const currentSlideIndex = presentation.slides.findIndex(slide => {
    return slide.id === presentation.currentSlideId;
  });

  if (currentSlideIndex + v >= presentation.slides.length) {
    return null;
  }

  if (currentSlideIndex + v <= -1) {
    return null;
  }

  const newSlideId = presentation.slides[currentSlideIndex + v].id;
  presentation.currentSlideId = newSlideId;
  return newSlideId;
};

const sendNewIdSlide = v => {
  const id = nextSlide(v);
  if (id !== null) {
    ws.send(
      formatData('updateSlide', {
        key: presentation.key,
        idSlide: id
      })
    );
  }
};

const updateSlideId = (target, property, value) => {
  const currentSlideIndex = target.slides.findIndex(slide => slide.id === value);
  const textNotice = target.slides[currentSlideIndex].text;

  renderNotes(textNotice);
  renderTitle({
    title: target.title,
    currentSlideIndex: currentSlideIndex + 1,
    totalSliders: target.slides.length
  });
};
