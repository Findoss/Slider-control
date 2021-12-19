/**
 * @format
 */

import { Transport } from '../common/transport.js';
import { Presentation } from '../common/Presentation.js';

import { store } from './store.js';

export class TransportServer extends Transport {
  constructor(ws) {
    super(ws);
  }

  takeGetKey(payload) {
    // get
    let key = null;
    const presentation = store.findById(payload.id);

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
      store.add(presentation);
      presentation.addClient(this);
    }

    // send
    this.sendKey(key);
  }

  takeError({ text }) {
    console.error(text);
  }

  takeRegKey({ key }) {
    console.log(store.store);
    const presentation = store.findByKey(key);

    // logic
    if (presentation === undefined) {
      this.sendError('not found key', 404);
      return;
    }
    presentation.addClient(this);

    // send
    this.sendInitPresentation(presentation.get());
  }

  takeUpdateSlide({ key, idSlide }) {
    const presentation = store.findByKey(key);

    // logic
    if (presentation === undefined) {
      this.sendError('not found key', 404);
      return;
    }
    presentation.currentSlideId = idSlide;

    // send
    this.broadcastUpdateSlide({ key, idSlide });
  }

  sendError(error, code) {
    this.send('Error', { text: error }, code);
  }

  sendKey(key) {
    this.send('Key', { key: key });
  }

  sendInitPresentation(payload) {
    this.send('InitPresentation', payload);
  }

  broadcastUpdateSlide({ key, idSlide }) {
    const presentation = store.findByKey(key);

    presentation.clients.forEach(client => {
      if (this.ws !== client.ws) {
        client.send('UpdateSlide', { key, idSlide });
      }
    });
  }
}
