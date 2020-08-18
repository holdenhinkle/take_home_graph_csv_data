import React from 'react';
import Table from 'react-bootstrap/Table';
import SingleFileDataTableHeaderRow from './SingleFileDataTableHeaderRow';
import SingleFileDataTableDataRow from './SingleFileDataTableDataRow';
import DataPagination from './DataPagination';

export default function SingleFileDataTable(props) {
  const tableHeaderData = [...props.tableHeaderData[0]];
  tableHeaderData.unshift('#');
  const stateIdx = tableHeaderData.indexOf('state');

  const headRow = [tableHeaderData].map((row, i) => {
    return (
      <SingleFileDataTableHeaderRow
        key={i}
        row={row}
      />
    );
  });

  const bodyRows = props.tableBodyData.map((row, i) => (
    <SingleFileDataTableDataRow
      key={i}
      row={[...[props.offset + i], ...row]}
      stateIdx={stateIdx}
    />
  ));

  return (
    <div>
      <div>
        <DataPagination
          offset={props.offset}
          limit={props.limit}
          length={props.length}
          handlePreviousPage={props.handlePreviousPage}
          handleNextPage={props.handleNextPage}
        />
      </div>
      <div>
        <Table striped bordered hover variant="dark" className="data">
          <thead>
            {headRow}
          </thead>
          <tbody>
            {bodyRows}
          </tbody>
        </Table>
      </div>
      <div>
        <DataPagination
          offset={props.offset}
          limit={props.limit}
          length={props.length}
          handlePreviousPage={props.handlePreviousPage}
          handleNextPage={props.handleNextPage}
        />
      </div>
    </div>
  );
}