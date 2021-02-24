import React, { useState } from "react";
import styled from "styled-components";
import DropButton from "./DropButton";
import useParseJsOrJsonToObj from "../hooks/useParseJsOrJsonToObj";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const useHeader = () => {
  const [textFile, setTextFile] = useState(null);
  const { i18nConfig } = useParseJsOrJsonToObj(textFile);
  console.log("i18nConfig_________________", i18nConfig);
  return { setTextFile };
};

const Header = () => {
  const { setTextFile } = useHeader();
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
