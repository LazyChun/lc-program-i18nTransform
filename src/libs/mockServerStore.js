import PersistStorage from "./PersistStorage";

export const CURRENT_FNC = {
  SAVE: "_current___$save$__",
  FIND: "_current___$find$__",
  FIND_ALL: "_current___$findAll$__"
};

const STORE_FNS = {
  SAVE: "__$save$__",
  FIND: "__$find$__",
  FIND_ALL: "__$findAll$__"
};

export const DATA_ITEMS = "items";

const getType = type => {
  if (!type) {
    return "defaultType";
  }
  return type;
};

const delayFnc = callback => {
  const timer = setTimeout(() => {
    callback && callback();
    clearTimeout(timer);
  }, 500);
};

const currentUser = { id: 1, username: "test", nickname: "测试用户" };

const findAll = ({ type, isOpened, offset, limit }) => {
  return new Promise((resolve, reject) => {
    const dataType = getType(type);
    delayFnc(() => {
      const items = PersistStorage.getItem(DATA_ITEMS) || [];
      const allItems = items.filter(
        i =>
          i.type === dataType &&
          (i.isOpened === isOpened || i?.creator?.id === currentUser.id)
      );
      let newItems = [];
      if (limit > allItems.length) {
        newItems = allItems.slice(offset);
      } else {
        newItems = allItems.slice(offset, limit + offset);
      }
      resolve(newItems.reverse());
    });
  });
};

const serverStore = {
  [STORE_FNS.SAVE]: ({ id, type, isLarge, data, isOpened }) => {
    return new Promise((resolve, reject) => {
      const dataType = getType(type);
      delayFnc(() => {
        let currentItem = {
          id: new Date().getTime() + Math.random().toString()
        };
        let currentItemExited = false;
        const items = PersistStorage.getItem(DATA_ITEMS) || [];
        if (id) {
          currentItem.id = id;
          currentItemExited = items.find(i => i.id === id);
          currentItem = currentItemExited || currentItem;
        }
        currentItem.isOpened = isOpened;
        currentItem.type = dataType;
        if (isLarge) {
          currentItem.largeData = data;
          currentItem.isLarge = true;
        } else {
          currentItem.data = data;
          currentItem.isLarge = false;
        }
        if (!currentItem.dateCreated) {
          currentItem.dateCreated = new Date();
        }
        currentItem.lastUpdated = new Date();
        if (currentItemExited) {
          currentItem.creator = currentUser;
          PersistStorage.setItem(DATA_ITEMS, items);
        } else {
          PersistStorage.setItem(DATA_ITEMS, [...items, currentItem]);
        }
        resolve(currentItem);
      });
    });
  },

  [STORE_FNS.FIND]: ({ id, type, isOpened, order }) => {
    return new Promise((resolve, reject) => {
      delayFnc(() => {
        findAll({
          type,
          isOpened,
          offset: 0,
          limit: Number.MAX_SAFE_INTEGER
        }).then(({ items, count }) => {
          if (id) {
            resolve(items.find(i => i.id === id));
          } else {
            if (order === "asc") {
              resolve(items[items.length - 1]);
            } else {
              resolve(items[0]);
            }
          }
        });
      });
    });
  },

  [STORE_FNS.FIND_ALL]: ({ type, isOpened, offset = 0, limit = 20 }) => {
    return findAll({ type, isOpened, offset, limit });
  }
};

export default serverStore;
