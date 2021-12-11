/**
 * @format
 */

import { WebSocketServer } from 'ws';

import { store } from './store.js';
import { genKey, formatData } from './utils.js';
import { deviceEnum } from '../common/enums.js';

const wss = new WebSocketServer({ port: 5010 });

wss.on('connection', ws => {
  ws.on('message', data => {
    console.log('→ ', JSON.parse(data));
    const { payload, action } = JSON.parse(data);
    actions[action](ws, payload);
  });
});

const actions = {
  getKey: (ws, payload) => {
    const data = store.findById(payload.id);
    let key = null;

    if (data !== undefined) {
      data.ext = ws;
      key = data.key;
    } else {
      store.removeById(payload.id);
      key = genKey();
      store.add({
        id: payload.id,
        key,
        ext: ws,
        clients: [],
        presentation: payload
      });

      console.log(store);
    }

    const msg = formatData('key', { key: key });
    console.log('← ', JSON.parse(msg));
    ws.send(msg);
  },
  regKey: (ws, { key }) => {
    const data = store.findByKey(key);

    if (data === undefined) {
      const msg = formatData('error', { text: 'not found key' }, 404);
      console.log('← ', JSON.parse(msg));
      ws.send(msg);
      return;
    }

    data.clients.push(ws);

    const msg = formatData('presentation', data.presentation);
    console.log('← ', JSON.parse(msg));
    ws.send(msg);
  },
  updateSlide: (ws, { key, type, idSlide }) => {
    const data = store.findByKey(key);

    if (data === undefined) {
      const msg = formatData('error', { text: 'not found key' }, 404);
      console.log('← ', JSON.parse(msg));
      ws.send(msg);
      return;
    }

    const msg = formatData('updateSlide', { text: 123 });

    if (type === deviceEnum.EXT) {
      // broadcast
      data.clients.forEach(client => {
        client.send(msg);
      });
    }

    if (type === deviceEnum.CLIENT) {
      // broadcast
      data.clients.forEach(client => {
        console.log('← ', JSON.parse(msg));
        if (ws !== client) {
          client.send(msg);
        }
        data.ext.send(msg);
      });
    }

    // const msg = formatData('presentation', data.presentation);
    // ws.send(msg);
  }
};
