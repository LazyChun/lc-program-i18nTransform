import XLSX from "xlsx";
import { useState, useEffect } from "react";
import _set from "lodash/set";
import _each from "lodash/each";

export const useReadFileToText = ({ file }) => {
  const [text, setText] = useState("");
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = function() {
        if (reader.result) {
          setText(reader.result);
        }
      };
      reader.readAsText(file);
    }
  }, [file]);
  return { text };
};

export const useReadXlsxFileToData = ({ xlsxFile }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let languagesData = {};
    const languageKeys = ["ZH", "EN"];
    if (xlsxFile) {
      const reader = new FileReader();
      reader.onload = function(event) {
        if (reader.result) {
          var data = event.target.result;
          var workbook = XLSX.read(data, {
            type: "binary"
          });
          workbook.SheetNames.forEach(function(sheetName) {
            var XL_row_object = XLSX.utils.sheet_to_row_object_array(
              workbook.Sheets[sheetName]
            );
            if (XL_row_object.length > 0) {
              //console.log(XL_row_object);
              const items = XL_row_object;
              for (const i of items) {
                _each(languageKeys, langKey => {
                  _set(languagesData[langKey], i.key, i[langKey]);
                });
              }
              setData(languagesData);
            }
          });
        }
      };
      reader.readAsBinaryString(xlsxFile);
    }
  }, [xlsxFile]);
  return { languagesData: data };
};
