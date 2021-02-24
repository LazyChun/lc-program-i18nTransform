import store from "storejs";

/**
 * 本地存储工具类，可用于工具的本地存储
 */
class PersistStorage {
  static getItem(key) {
    return store.get(key);
  }

  static getItemRO(key) {
    return this.getItem(key) || {};
  }

  static setItem(key, data) {
    store.set(key, data);
    return data;
  }

  static removeItem(key) {
    const data = this.getItem(key);
    store.remove(key);
    return data;
  }
}

export default PersistStorage;
