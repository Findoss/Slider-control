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
    console.log('←', ...payload);
    this.ws.send(formatData(...payload));
  }

  take(event) {
    const data = JSON.parse(event.data);
    console.log('→', data);

    const { payload, action } = data;
    console.log(this);
    this[`take${action}`](payload);
  }
}
