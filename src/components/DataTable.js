import React, { useState } from "react";
import styled from "styled-components";
import _isEmpty from "lodash/isEmpty";
import _keysIn from "lodash/keysIn";
import _head from "lodash/head";
import _map from "lodash/map";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: white;
  table {
    width: 100%;
  }
  thead {
    background-color: whitesmoke;
    th {
      text-align: left;
      padding: 4px 10px;
    }
  }

  td {
    padding: 4px 10px;
  }
  tr {
    border-bottom: 1px solid #cecece;
  }
`;

const Empty = styled.div`
  display: flex;
  background-color: whitesmoke;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
`;

const useDataTable = ({ tab, listData }) => {
  let heads = _keysIn(_head(listData));
  return { heads };
};

const DataTable = ({ listData }) => {
  const { heads } = useDataTable({ listData });
  return (
    <Container>
      {_isEmpty(listData) ? (
        <Empty>
          <div>请先上您要转换的文件！</div>
        </Empty>
      ) : (
        <table>
          <thead>
            {_map(heads, headItem => {
              return <th key={headItem}>{headItem}</th>;
            })}
          </thead>
          <tbody>
            {_map(listData, (item, index) => {
              return (
                <tr key={"row" + index}>
                  {_map(heads, h => {
                    return <td key={Math.random()}>{item[h]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Container>
  );
};

export default DataTable;
