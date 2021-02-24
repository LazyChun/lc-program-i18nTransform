import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropButton from "./DropButton";
import useParseJsOrJsonToObj from "../hooks/useParseJsOrJsonToObj";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const useHeader = ({ onUpdateI18nConfig }) => {
  const [textFile, setTextFile] = useState(null);
  const { i18nConfig } = useParseJsOrJsonToObj(textFile);
  useEffect(() => {
    if (i18nConfig) {
      onUpdateI18nConfig(i18nConfig);
    }
  }, [i18nConfig]);
  console.log("i18nConfig_________________", i18nConfig);
  return { setTextFile, i18nConfig };
};

const Header = ({ onUpdateI18nConfig }) => {
  const { setTextFile } = useHeader({ onUpdateI18nConfig });
  return (
    <Container>
      <DropButton
        onUpdateFile={setTextFile}
        accept={[".json", ".js"]}
        text={"请上传json文件"}
      />
      <DropButton
        onUpdateFile={setTextFile}
        accept={".xlsx"}
        text={"请上传xlsx文件"}
      />
    </Container>
  );
};

export default Header;
