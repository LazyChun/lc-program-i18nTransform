import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import OperationsField from "./OperationsField";
import DataTable from "./DataTable";
const Container = styled.div`
  width: 900px;
`;

const useProgram = () => {
  const [tab, setTab] = useState("");
  const [i18nData, setI18nData] = useState(null);
  const [currentFileName, setCurrentFileName] = useState("");
  return {
    i18nData,
    setI18nData,
    tab,
    setTab,
    currentFileName,
    setCurrentFileName
  };
};

const ProgramForm = () => {
  const {
    i18nData,
    setI18nData,
    tab,
    setTab,
    currentFileName,
    setCurrentFileName
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
      />
      <DataTable listData={i18nData} />
    </Container>
  );
};

export default ProgramForm;
