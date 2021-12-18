/**
 * @format
 */

import { store } from './store.js';
import { genKey } from './utils.js';
import { formatData } from '../common/formatData.js';
import { Presentation } from '../common/presentation.js';

export const getKey = (ws, payload) => {
  // get
  let key = null;
  const presentation = store.findById(payload.id);

  // logic
  // обновляем существующий
  if (presentation !== undefined) {
    presentation.addClient(ws);
    key = presentation.key;
  }

  // создаем новый
  if (presentation === undefined) {
    store.removeById(payload.id);
    // key = genKey();
    key = '218831';
    const presentation = new Presentation({
      id: payload.id,
      key,
      title: payload.title,
      currentSlideId: payload.currentSlideId,
      slides: payload.slides
    });
    presentation.addClient(ws);
    store.add(presentation);
  }

  // send
  const msg = formatData('key', { key: key });
  ws.send(msg);
};

export const regKey = (ws, { key }) => {
  // get
  const presentation = store.findByKey(key);

  // logic
  if (presentation === undefined) {
    const msg = formatData('error', { text: 'not found key' }, 404);
    ws.send(msg);
    return;
  }
  presentation.addClient(ws);

  // send
  const msg = formatData('initPresentation', presentation.get());
  ws.send(msg);
};

export const updateSlide = (ws, { key, idSlide }) => {
  // get
  const presentation = store.findByKey(key);

  // logic
  if (presentation === undefined) {
    const msg = formatData('error', { text: 'not found key' }, 404);
    ws.send(msg);
    return;
  }
  presentation.currentSlideId = idSlide;
  const msg = formatData('updateSlide', { key, idSlide });

  // send
  presentation.clients.forEach(client => {
    if (ws !== client) {
      client.send(msg);
    }
  });
};

export const error = (ws, { text }) => {
  console.error(text);
};

export const actions = {
  getKey,
  regKey,
  updateSlide,
  error
};
