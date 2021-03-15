import React from "react";
import styled from "styled-components";
import _split from "lodash/split";
import _last from "lodash/last";
import _map from "lodash/map";
import { downloadFile } from "../utils/commonUtils";

const Container = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

const Title = styled.div``;

const ExampleBox = styled.div`
  margin-bottom: 4px;
  color: dodgerblue;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: indianred;
  }
`;

const Example = ({ url }) => {
  const name = _last(_split(url, "/"));
  return (
    <ExampleBox
      onClick={() => downloadFile(url, name)}
      href={url}
      target={"_blank"}
      download
    >
      {name}
    </ExampleBox>
  );
};

const Examples = ({ exampleUrls = [] }) => {
  return (
    <Container>
      <Title>示例：</Title>
      {_map(exampleUrls, url => {
        return <Example key={url} url={url} />;
      })}
    </Container>
  );
};

export default Examples;
