/**
 * @format
 */

import { Transport } from '../common/transport.js';
import { WS_API } from '../common/contsnts.js';

import { presentation } from './index.js';

export class TransportClient extends Transport {
  constructor(ws) {
    super(ws);
  }

  takeError({ text }) {
    presentation.error = text;
  }

  takeUpdateSlide({ key, idSlide }) {
    presentation.currentSlideId = idSlide;
  }

  takeInitPresentation({ id, key, title, currentSlideId, slides }) {
    presentation.id = id;
    presentation.key = key;
    presentation.slides = slides;
    presentation.title = title;
    presentation.currentSlideId = currentSlideId;
  }

  sendUpdateSlide(id) {
    this.send('UpdateSlide', {
      key: presentation.key,
      idSlide: id
    });
  }

  sendRegKey(key) {
    this.send('RegKey', { key: key });
  }
}

const ws = new WebSocket(WS_API);
export const transport = new TransportClient(ws);
ws.onmessage = transport.take;
