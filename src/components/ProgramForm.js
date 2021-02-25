import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import OperationsField from "./OperationsField";
import DataTable from "./DataTable";
const Container = styled.div`
  max-width: 1300px;
  background-color: white;
  padding: 10px;
`;

const useProgram = () => {
  const [tab, setTab] = useState("");
  const [i18nData, setI18nData] = useState(null);
  const [currentFileName, setCurrentFileName] = useState("");
  const [exportLoading, setExportLoading] = useState(false);
  return {
    i18nData,
    setI18nData,
    tab,
    setTab,
    currentFileName,
    setCurrentFileName,
    exportLoading,
    setExportLoading
  };
};

const ProgramForm = () => {
  const {
    i18nData,
    setI18nData,
    tab,
    setTab,
    currentFileName,
    setCurrentFileName,
    exportLoading,
    setExportLoading
  } = useProgram();
  return (
    <Container>
      <Header
        onUpdateI18nData={setI18nData}
        onUpdateTab={setTab}
        setCurrentFileName={setCurrentFileName}
        currentFileName={currentFileName}
      />
      <OperationsField
        tab={tab}
        listData={i18nData}
        currentFileName={currentFileName}
        exportLoading={exportLoading}
        setExportLoading={setExportLoading}
      />
      <DataTable listData={i18nData} />
    </Container>
  );
};

export default ProgramForm;
