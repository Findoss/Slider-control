/**
 * @format
 */

class Store {
  constructor() {
    this.store = [];
  }

  add(payload) {
    this.store.push(payload);
  }

  removeByIndex(index) {
    this.store.slice(index, index + 1);
  }

  removeByKey(key) {
    const index = this.findIndexByKey(key);
    if (index > -1) {
      this.removeByIndex(index);
    }
  }

  removeById(id) {
    const index = this.findIndexById(id);
    if (index > -1) {
      this.removeByIndex(index);
    }
  }

  findById(id) {
    return this.store.find(v => v.id === id);
  }

  findIndexById(id) {
    return this.store.find(v => v.id === id);
  }

  findByKey(key) {
    return this.store.find(v => v.key === key);
  }

  findIndexByKey(key) {
    return this.store.findIndex(v => v.key === key);
  }

  getAll() {
    return this.store;
  }
}

export const store = new Store();
