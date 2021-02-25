import XLSX from "xlsx";
import { useState, useEffect } from "react";
import _map from "lodash/map";
import _omit from "lodash/omit";

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
              const items = XL_row_object;
              setData(_map(items, item => _omit(item, ["__rowNum__"])));
            }
          });
        }
      };
      reader.readAsBinaryString(xlsxFile);
    }
  }, [xlsxFile]);
  console.log("data_____________", data);
  return { languagesData: data };
};
