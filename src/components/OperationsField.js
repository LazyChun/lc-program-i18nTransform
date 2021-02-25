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
  margin-top: 30px;
  margin-bottom: 30px;
  .export_btn {
    background-color: ${props =>
      props.exportDisabled ? "darkgray" : "dodgerblue"};
    pointer-events: ${props => (props.exportDisabled ? "none" : "")};
    outline: none;
    font-size: 18px;
    color: ${props => (props.exportDisabled ? "whitesomke" : "white")};
    border-radius: 4px;
    padding: 6px 20px;
    border: none;
    cursor: pointer;
  }
`;

const exportToXlsx = ({ data, currentFileName, onCompleted }) => {
  var sheet = XLSX.utils.json_to_sheet(data);
  openDownloadDialog(
    sheet2blob(sheet),
    `${currentFileName || "default"}.xlsx`,
    onCompleted
  );
};

const exportToJs = ({ data, onCompleted }) => {
  const langKeys = getLanguagesKeys(data);
  const langsData = getDataToObjs({ data });
  _each(langKeys, langKey => {
    exportRaw(
      "export default " + obj2string(langsData[langKey]),
      `${langKey}.js`
    );
  });
  onCompleted();
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

const LoadingText = styled.span`
  color: white;
`;

const OperationsField = ({
  listData,
  tab,
  currentFileName,
  exportLoading,
  setExportLoading
}) => {
  const isJson = tab === "json";

  return (
    <Container exportDisabled={!tab || exportLoading}>
      <button
        className={"export_btn"}
        disabled={!tab || exportLoading}
        onClick={() => {
          setExportLoading(true);
          isJson
            ? exportToXlsx({
                data: listData,
                currentFileName,
                onCompleted: () => null
              })
            : exportToJs({
                data: listData,
                onCompleted: () => null
              });
          setTimeout(() => {
            setExportLoading(false);
          }, 1500);
        }}
      >
        {exportLoading ? (
          <LoadingText>正在导出中</LoadingText>
        ) : (
          <span>导出{getButtonTextByTab(tab)}</span>
        )}
      </button>
    </Container>
  );
};

export default OperationsField;
