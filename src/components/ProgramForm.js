import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import OperationsField from "./OperationsField";
import DataTable from "./DataTable";
const Container = styled.div`
  width: 900px;
`;

const useProgram = () => {
  const [tab, setTab] = useState("json");
  const [i18nData, setI18nData] = useState(null);
  return { i18nData, setI18nData, tab, setTab };
};

const ProgramForm = () => {
  const { i18nData, setI18nData, tab, setTab } = useProgram();
  return (
    <Container>
      <Header onUpdateI18nData={setI18nData} onUpdateTab={setTab} />
      <OperationsField tab={tab} listData={i18nData} />
      <DataTable listData={i18nData} />
    </Container>
  );
};

export default ProgramForm;
