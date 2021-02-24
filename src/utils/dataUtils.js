export const getDataByI18nConfig = ({ i18nConfig }) => {
  let data = [];
  let index = 1;
  function insertKeyValue(obj, path) {
    Object.keys(obj).map(key => {
      const value = obj[key];
      if (typeof value === "string") {
        data.push({
          "#": index,
          key: path ? path + "." + key : key,
          zh: value
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
