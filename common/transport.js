/**
 * @format
 */

import { formatData } from './formatData.js';

export class Transport {
  constructor(ws) {
    this.ws = ws;
    this.take = this.take.bind(this);
    this.send = this.send.bind(this);
  }

  send(...payload) {
    const msg = formatData(...payload);
    console.log('←', JSON.parse(msg));

    this.ws.send(msg);
  }

  take(raw) {
    const data = JSON.parse(raw.data);
    console.log('→', data);

    const { payload, action } = data;
    if (typeof this[`take${action}`] === 'function') {
      this[`take${action}`](payload);
    }
  }
}
