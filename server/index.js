/**
 * @format
 */

import { WebSocketServer } from 'ws';

import { WS_PORT } from '../common/contsnts.js';
import { TransportServer } from './transport.js';

const wss = new WebSocketServer({ port: WS_PORT });

wss.on('connection', ws => {
  const transport = new TransportServer(ws);
  ws.on('message', data => {
    transport.take({ data });
  });
});
