import { Presentation } from '../common/Presentation.js';

import { render } from './render.js';
import { dom } from './dom.js';
import { transport } from './transport.js';

const { renderNotes, renderTitle, renderError } = render;
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

    if (property === 'error') {
      updateError(target, property, value);
    }
    return (target[property] = value);
  }
});

$btnConnect.addEventListener('click', () => {
  transport.sendRegKey($inputKey.value);
});

$btnPre.addEventListener('click', () => {
  newIdSlide(-1);
});

$btnNext.addEventListener('click', () => {
  newIdSlide(+1);
});

const nextSlide = v => {
  const currentSlideIndex = presentation.getSlideIndexById(presentation.currentSlideId);
  const slideIndex = currentSlideIndex + v;

  if (slideIndex < 0 || slideIndex >= presentation.slides.length) {
    return null;
  }

  const newSlideId = presentation.slides[slideIndex].id;
  presentation.currentSlideId = newSlideId;
  return newSlideId;
};

const newIdSlide = v => {
  const id = nextSlide(v);
  if (id !== null) {
    transport.sendUpdateSlide(id);
  }
};

const updateSlideId = (target, property, value) => {
  const currentSlideIndex = target.getSlideIndexById(value);
  const textNotice = target.slides[currentSlideIndex].text;

  renderNotes(textNotice);
  renderTitle({
    title: target.title,
    currentSlideIndex: currentSlideIndex + 1,
    totalSliders: target.slides.length
  });
};

const updateError = (target, property, value) => {
  renderError(value);
};
