/**
 * @format
 */

import { WebSocketServer } from 'ws';

import { actions } from './actions.js';

const wss = new WebSocketServer({ port: 5010 });

wss.on('connection', ws => {
  ws.on('message', data => {
    console.log('→ ', JSON.parse(data));
    const { payload, action } = JSON.parse(data);
    actions[action](ws, payload);
  });
});
