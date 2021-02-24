import React from "react";
import styled from "styled-components";
import Header from "./Header";
import OperationsField from "./OperationsField";
import DataTable from "./DataTable";
const Container = styled.div`
  width: 900px;
 
`;
const ProgramForm = () => {
  return (
    <Container>
      <Header />
      <OperationsField />
      <DataTable />
    </Container>
  );
};

export default ProgramForm;
