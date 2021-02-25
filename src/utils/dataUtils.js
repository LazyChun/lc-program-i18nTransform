import _each from "lodash/each";
import _set from "lodash/set";
import _keysIn from "lodash/keysIn";
import _xor from "lodash/xor";
import _get from "lodash/get";

export const getDataByI18nConfig = ({ i18nConfig,fileName }) => {
  let data = [];
  let index = 1;
  function insertKeyValue(obj, path) {
    Object.keys(obj).map(key => {
      const value = obj[key];
      if (typeof value === "string") {
        data.push({
          "#": index,
          key: path ? path + "." + key : key,
          [fileName?fileName:"lan"]: value
        });
        index++;
      } else if (typeof value === "object") {
        insertKeyValue(value, path ? path + "." + key : key);
      }
    });
  }
  insertKeyValue(i18nConfig);
  return data;
};

export const getLanguagesKeys = data => {
  const dataItem = _get(data, "[0]", {});
  const allKeys = _keysIn(dataItem);
  return _xor(allKeys, ["key", "#"]);
};

export const getDataToObjs = ({ data }) => {
  const languageKeys = getLanguagesKeys(data);
  let languagesData = {};
  for (const i of data) {
    _each(languageKeys, langKey => {
      _set(languagesData, langKey + "." + i.key, i[langKey]);
    });
  }
  return languagesData;
};
