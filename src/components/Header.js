import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropButton from "./DropButton";
import useParseJsOrJsonToObj from "../hooks/useParseJsOrJsonToObj";
import { useReadXlsxFileToData } from "../hooks/useReadFile";
import { getDataByI18nConfig } from "../utils/dataUtils";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const useHeader = ({ onUpdateI18nData }) => {
  const [textFile, setTextFile] = useState(null);
  const [xlsxFile, setXlsxFile] = useState(null);
  const { i18nConfig } = useParseJsOrJsonToObj(textFile);
  const { languagesData } = useReadXlsxFileToData({ xlsxFile });
  useEffect(() => {
    if (i18nConfig) {
      const data = getDataByI18nConfig({ i18nConfig });
      onUpdateI18nData(data);
    }
  }, [i18nConfig]);
  useEffect(() => {}, [xlsxFile]);
  return { setTextFile, i18nConfig, setXlsxFile };
};

const Header = ({ onUpdateI18nData }) => {
  const { setTextFile, setXlsxFile } = useHeader({ onUpdateI18nData });
  return (
    <Container>
      <DropButton
        onUpdateFile={setTextFile}
        accept={[".json", ".js"]}
        text={"请上传json文件"}
      />
      <DropButton
        onUpdateFile={setXlsxFile}
        accept={".xlsx"}
        text={"请上传xlsx文件"}
      />
    </Container>
  );
};

export default Header;
