import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropButton from "./DropButton";
import useParseJsOrJsonToObj from "../hooks/useParseJsOrJsonToObj";
import { useReadXlsxFileToData } from "../hooks/useReadFile";
import { getDataByI18nConfig } from "../utils/dataUtils";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const useHeader = ({ onUpdateI18nData, fileName }) => {
  const [textFile, setTextFile] = useState(null);
  const [xlsxFile, setXlsxFile] = useState(null);
  const { i18nConfig } = useParseJsOrJsonToObj(textFile);
  const { languagesData } = useReadXlsxFileToData({ xlsxFile });
  useEffect(() => {
    if (i18nConfig) {
      const data = getDataByI18nConfig({ i18nConfig, fileName });
      onUpdateI18nData(data);
    }
  }, [i18nConfig]);
  useEffect(() => {
    onUpdateI18nData(languagesData);
  }, [languagesData]);
  return { setTextFile, i18nConfig, setXlsxFile };
};

const Header = ({
  onUpdateI18nData,
  onUpdateTab,
  setCurrentFileName,
  currentFileName
}) => {
  const { setTextFile, setXlsxFile } = useHeader({
    onUpdateI18nData,
    fileName: currentFileName
  });
  return (
    <Container>
      <DropButton
        onUpdateTab={() => onUpdateTab("json")}
        onUpdateFile={setTextFile}
        setCurrentFileName={setCurrentFileName}
        accept={[".json", ".js"]}
        text={<span>请点击或拖拽上传json文件</span>}
        exampleUrls={[
          "https://lazychunstatic.oss-cn-shanghai.aliyuncs.com/util_files/planet/programs/lc-program-i18nTransform/zh-CN.js",
          "https://lazychunstatic.oss-cn-shanghai.aliyuncs.com/util_files/planet/programs/lc-program-i18nTransform/zh-CN.json"
        ]}
      />
      <DropButton
        onUpdateTab={() => onUpdateTab("xlsx")}
        onUpdateFile={setXlsxFile}
        setCurrentFileName={setCurrentFileName}
        accept={".xlsx"}
        exampleUrls={[
          "https://lazychunstatic.oss-cn-shanghai.aliyuncs.com/util_files/planet/programs/lc-program-i18nTransform/zh_en.xlsx"
        ]}
        text={<span>请点击或拖拽上传xlsx文件</span>}
      />
    </Container>
  );
};

export default Header;
