/**
 * @format
 */

import { store } from './store.js';
import { genKey, formatData } from './utils.js';
import { deviceEnum } from '../common/enums.js';
import { Presentation } from './presentation.js';

export const getKey = (ws, payload) => {
  // get
  let key = null;
  const presentation = store.findById(payload.id);

  // logic
  // обновляем существующий
  if (presentation !== undefined) {
    presentation.ext = ws;
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
      slides: payload.slides,
      ext: ws
    });
    store.add(presentation);
  }

  // send
  const msg = formatData('key', { key: key });
  console.log('← ', JSON.parse(msg));
  ws.send(msg);
};

export const regKey = (ws, { key }) => {
  // get
  const presentation = store.findByKey(key);

  // logic
  if (presentation === undefined) {
    const msg = formatData('error', { text: 'not found key' }, 404);
    console.log('← ', JSON.parse(msg));
    ws.send(msg);
    return;
  }
  presentation.clients.push(ws);

  // send
  const msg = formatData('presentation', presentation.get());
  console.log('← ', JSON.parse(msg));
  ws.send(msg);
};

export const updateSlide = (ws, { key, type, idSlide }) => {
  // get
  const presentation = store.findByKey(key);

  // logic
  if (presentation === undefined) {
    const msg = formatData('error', { text: 'not found key' }, 404);
    console.log('← ', JSON.parse(msg));
    ws.send(msg);
    return;
  }
  presentation.currentSlideId = idSlide;
  const msg = formatData('updateSlide', { key, type, idSlide });
  console.log('← ', JSON.parse(msg));

  // send
  if (type === deviceEnum.EXT) {
    presentation.clients.forEach(client => {
      client.send(msg);
    });
  }

  if (type === deviceEnum.CLIENT) {
    presentation.clients.forEach(client => {
      if (ws !== client) {
        client.send(msg);
      }
    });
    try {
      presentation.ext.send(msg);
    } catch (error) {
      console.log(error);
    }
  }
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
