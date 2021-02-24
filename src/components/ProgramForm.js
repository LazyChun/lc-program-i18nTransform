import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import OperationsField from "./OperationsField";
import DataTable from "./DataTable";
import { getDataByI18nConfig } from "../utils/dataUtils";
const Container = styled.div`
  width: 900px;
`;

const useProgram = () => {
  const [tab, setTab] = useState("json");
  const [i18nConfig, setI18nConfig] = useState(null);
  const [listData, setListData] = useState(null);
  useEffect(() => {
    if (i18nConfig) {
      const data = getDataByI18nConfig({ i18nConfig });
      setListData(data);
    }
  }, [i18nConfig]);
  return { i18nConfig, setI18nConfig, listData, tab };
};

const ProgramForm = () => {
  const { i18nConfig, setI18nConfig, listData, tab } = useProgram();
  return (
    <Container>
      <Header onUpdateI18nConfig={setI18nConfig} />
      <OperationsField tab={tab} i18nConfig={i18nConfig} listData={listData} />
      <DataTable i18nConfig={i18nConfig} />
    </Container>
  );
};

export default ProgramForm;
