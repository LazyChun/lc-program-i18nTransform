/**
 * 该存储工具类为服务端存储，给需要服务端存取数据的工具使用
 */
import { CURRENT_FNC } from "./mockServerStore";

class DataStore {
  static serverStore(storeType, params) {
    const testCode = window.config?.testCode;
    const storeFunc = window.serverStore[storeType.slice(9)];
    return storeFunc({ ...params, testCode });
  }

  /**
   * 通过id保存数据，建议data数据量较小时使用
   * @param id  数据的唯一性id,可据此存取数据
   * @param data 保存的数据
   * @param isOpened 数据是否公开，即其他登录用户（非该数据的创建者） 是否可以使用该数据
   */
  static saveById(id, data, isOpened = true) {
    if (!id) {
      console.error("请输入id");
      return;
    }
    if (!data) {
      console.error("保存数据不能为空");
      return;
    }
    return this.serverStore(CURRENT_FNC.SAVE, {
      id,
      data,
      isOpened,
      isLarge: false
    });
  }

  /**
   * 通过id保存数据，建议data数据量较大时使用
   * @param id 数据的唯一性id,可据此存取数据
   * @param data 保存的数据
   * @param isOpened 数据是否公开，即其他登录用户（非该数据的创建者） 是否可以使用该数据
   */
  static saveLargeDataById(id, data, isOpened = true) {
    if (!id) {
      console.error("请输入id");
      return;
    }
    if (!data) {
      console.error("data 保存数据不能为空");
      return;
    }
    return this.serverStore(CURRENT_FNC.SAVE, {
      id,
      data,
      isLarge: true,
      isOpened
    });
  }

  /**
   * 通过type(数据自定义类型，如 type="dog" 等 ) 保存数据，建议data数据量较小时使用
   * @param type 数据自定义类型  如：dog、cat、apple 等
   * @param data 保存的数据
   * @param isOpened 数据是否公开，即其他登录用户（非该数据的创建者） 是否可以使用该数据
   */
  static saveByType(type, data, isOpened = true) {
    if (!type) {
      console.error("type 请输入类型");
      return;
    }
    if (!data) {
      console.error("data 保存数据不能为空");
      return;
    }
    return this.serverStore(CURRENT_FNC.SAVE, {
      type,
      data,
      isOpened,
      isLarge: false
    });
  }

  /**
   * 通过type(数据自定义类型，如 type="dog" 等 ) 保存数据，建议data数据量较大时使用
   * @param type 数据自定义类型  如：dog、cat、apple 等
   * @param data 保存的数据
   * @param isOpened 数据是否公开，即其他登录用户（非该数据的创建者） 是否可以使用该数据
   */
  static saveLargeDataByType(type, data, isOpened = true) {
    if (!type) {
      console.error("type 请输入类型");
      return;
    }
    if (!data) {
      console.error("data 保存数据不能为空");
      return;
    }
    return this.serverStore(CURRENT_FNC.SAVE, {
      type,
      data,
      isLarge: true,
      isOpened
    });
  }

  /**
   * 通过type与id 保存数据 建议data数据量较小时使用
   * @param type 数据自定义类型  如：dog、cat、apple 等
   * @param id 数据的唯一性id
   * @param data 保存的数据
   * @param isOpened 据是否公开，即其他登录用户（非该数据的创建者） 是否可以使用该数据
   */
  static saveByTypeAndId(type, id, data, isOpened = true) {
    if (!id) {
      console.error("请输入id");
      return;
    }
    if (!type) {
      console.error("type 请输入类型");
      return;
    }
    if (!data) {
      console.error("data 保存数据不能为空");
      return;
    }
    return this.serverStore(CURRENT_FNC.SAVE, {
      id,
      type,
      data,
      isOpened,
      isLarge: false
    });
  }

  /**
   * 通过type与id 保存数据 建议data数据量较大时使用
   * @param type 数据自定义类型  如：dog、cat、apple 等
   * @param id 数据的唯一性id
   * @param data 保存的数据
   * @param isOpened 据是否公开，即其他登录用户（非该数据的创建者） 是否可以使用该数据
   */
  static saveLargeDataByTypeAndId(type, id, data, isOpened = true) {
    if (!id) {
      console.error("请输入id");
      return;
    }
    if (!type) {
      console.error("type 请输入类型");
      return;
    }
    if (!data) {
      console.error("data 保存数据不能为空");
      return;
    }
    return this.serverStore(CURRENT_FNC.SAVE, {
      id,
      type,
      data,
      isLarge: true,
      isOpened
    });
  }

  /**
   * 通过id查找数据
   * @param id
   * @param isOpened 是否是公开数据 为true时表示从所有公开的数据和当前登录用户保存的数据中查找， 为false表示只从当前登录用户保存的数据中查找
   */
  static findById(id, isOpened = true) {
    if (!id) {
      console.error("请输入id");
      return;
    }
    return this.serverStore(CURRENT_FNC.FIND, { id, isOpened });
  }

  /**
   * 通过type(类型)查找数据  查找最近的一个
   * @param type
   * @param isOpened 是否是公开数据 为true时表示从所有公开的数据和当前登录用户保存的数据中查找， 为false表示只从当前登录用户保存的数据中查找
   */
  static findByType(type, isOpened = true) {
    if (!type) {
      console.error("type 请输入类型");
      return;
    }
    return this.serverStore(CURRENT_FNC.FIND, {
      type,
      isOpened,
      order: "desc"
    });
  }

  /**
   * 通过type(类型)查找数据  查找最早的一个
   * @param type
   * @param isOpened 是否是公开数据 为true时表示从所有公开的数据和当前登录用户保存的数据中查找， 为false表示只从当前登录用户保存的数据中查找
   */
  static findLastByType(type, isOpened = true) {
    if (!type) {
      console.error("type 请输入类型");
      return;
    }
    return this.serverStore(CURRENT_FNC.FIND, { type, isOpened, order: "asc" });
  }

  /**
   * 通过type(类型)查找所有数据  查找最早的一个
   * @param type
   * @param isOpened 否是公开数据 为true时表示从所有公开的数据和当前登录用户保存的数据中查找， 为false表示只从当前登录用户保存的数据中查找
   */
  static findAllByType(type, isOpened = true, offset = 0, limit = 20) {
    if (!type) {
      console.error("type 请输入类型");
      return;
    }
    return this.serverStore(CURRENT_FNC.FIND_ALL, {
      type,
      isOpened,
      offset,
      limit
    });
  }
}
export default DataStore;
