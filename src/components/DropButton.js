import React from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import _isEmpty from "lodash/isEmpty";
import _head from "lodash/head";
import _split from "lodash/split";
import Examples from "./Examples";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const BtnContainer = styled.div`
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 0px 24px;
  border: 1px dashed darkgray;
  .file_input {
  }
`;

const InputBox = styled.div`
  border: none !important;
  &:focus {
    outline: none !important;
  }
  cursor: pointer;
`;

const Add = styled.div`
  font-size: 40px;
  padding-bottom: 6px;
`;

const Text = styled.p`
  display: flex;
  align-items: center;
`;

const DropButton = ({
  text,
  accept,
  onUpdateFile,
  onUpdateTab,
  setCurrentFileName,
  exampleUrls
}) => {
  return (
    <Container>
      <Examples exampleUrls={exampleUrls} />{" "}
      <BtnContainer>
        <Dropzone
          accept={accept}
          maxFiles={1}
          onDrop={acceptedFiles => {
            if (!_isEmpty(acceptedFiles)) {
              const file = _head(acceptedFiles);
              onUpdateFile(file);
              onUpdateTab();
              const fileName = file.name;
              setCurrentFileName(_head(_split(fileName, ".")));
            }
            console.log(acceptedFiles);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <InputBox {...getRootProps()}>
                <input className={"file_input"} {...getInputProps()} />
                <Text>
                  <Add>+</Add>
                  <div>{text}</div>
                </Text>
              </InputBox>
            </section>
          )}
        </Dropzone>
      </BtnContainer>
    </Container>
  );
};

export default DropButton;
