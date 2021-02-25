import React from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import _isEmpty from "lodash/isEmpty";
import _head from "lodash/head";
import _split from "lodash/split";

const Container = styled.div`
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 0px 14px;

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

const DropButton = ({
  text,
  accept,
  onUpdateFile,
  onUpdateTab,
  setCurrentFileName
}) => {
  return (
    <Container>
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
              <p>{text}</p>
            </InputBox>
          </section>
        )}
      </Dropzone>
    </Container>
  );
};

export default DropButton;
