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
    exportRaw(
      "export default " + obj2string(langsData[langKey]),
      `${langKey}.js`
    );
  });
};

const getButtonTextByTab = tab => {
  let text = "";
  switch (tab) {
    case "json":
      text = "xlsx";
      break;
    case "xlsx":
      text = "js";
      break;
  }
  return text;
};

const OperationsField = ({ listData, tab }) => {
  const isJson = tab === "json";

  return (
    <Container>
      <button
        disabled={!tab}
        onClick={() =>
          isJson
            ? exportToXlsx({ data: listData })
            : exportToJs({ data: listData })
        }
      >
        导出{getButtonTextByTab(tab)}
      </button>
    </Container>
  );
};

export default OperationsField;
