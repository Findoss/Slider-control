import { presentation } from './index.js';
import { render } from './render.js';

const { renderError } = render;

const initPresentation = (ws, { id, key, title, currentSlideId, slides }) => {
  presentation.id = id;
  presentation.key = key;
  presentation.slides = slides;
  presentation.title = title;
  presentation.currentSlideId = currentSlideId;
};

const updateSlide = (ws, { key, type, idSlide }) => {
  presentation.currentSlideId = idSlide;
};

const error = (ws, { text }) => {
  renderError(text);
};

export const actions = {
  initPresentation,
  updateSlide,
  error
};
