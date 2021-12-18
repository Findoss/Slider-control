/**
 * @format
 */

import { WebSocketServer } from 'ws';

import { WS_PORT } from '../common/contsnts.js';
import { actions } from './actions.js';

const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', ws => {
  ws.on('message', data => {
    console.log('→ ', JSON.parse(data));
    const { payload, action } = JSON.parse(data);
    actions[action](ws, payload);
  });
});
