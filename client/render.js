import { dom } from './dom.js';
const { $text, $title, $controlBox } = dom;

export const render = {
  renderTitle({ title, currentSlideIndex, totalSliders }) {
    $title.textContent = `${title} ${currentSlideIndex}/${totalSliders}`;
  },

  renderNotes(text) {
    $text.textContent = text;
  },

  renderError(text) {
    $text.textContent = '';
    $title.textContent = text;
  },

  toggleControls() {
    $controlBox.classList.toggle('hide');
  }
};
