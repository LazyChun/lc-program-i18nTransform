import React from "react";
import styled from "styled-components";

import XLSX from "xlsx";
import { openDownloadDialog, sheet2blob } from "../commonUtils";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const exportToXlsx = ({ data }) => {
  var sheet = XLSX.utils.json_to_sheet(data);
  openDownloadDialog(sheet2blob(sheet), "platform_i18n.xlsx");
};
const OperationsField = ({ listData, tab }) => {
  return (
    <Container>
      <button
        onClick={() =>
          tab === "json" ? exportToXlsx({ data: listData }) : null
        }
      >
        导出
      </button>
    </Container>
  );
};

export default OperationsField;
