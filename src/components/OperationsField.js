import React from "react";
import styled from "styled-components";

import XLSX from "xlsx";
import {
  exportRaw,
  obj2string,
  openDownloadDialog,
  sheet2blob
} from "../utils/commonUtils";
import { getDataToObjs, getLanguagesKeys } from "../utils/dataUtils";
import _each from "lodash/each";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const exportToXlsx = ({ data }) => {
  var sheet = XLSX.utils.json_to_sheet(data);
  openDownloadDialog(sheet2blob(sheet), "platform_i18n.xlsx");
};

const exportToJs = ({ data }) => {
  const langKeys = getLanguagesKeys(data);
  const langsData = getDataToObjs({ data });
  _each(langKeys, langKey => {
    exportRaw(obj2string(langsData[langKey]), `${langKey}.js`);
  });
};

const OperationsField = ({ listData, tab }) => {
  console.log("listData_____________________", listData);
  const isJson = tab === "json";
  return (
    <Container>
      <button
        onClick={() =>
          isJson
            ? exportToXlsx({ data: listData })
            : exportToJs({ data: listData })
        }
      >
        导出
      </button>
    </Container>
  );
};

export default OperationsField;
