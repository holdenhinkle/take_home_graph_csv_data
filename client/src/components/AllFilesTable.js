import React from 'react';
import Table from 'react-bootstrap/Table';
import AllFilesTableRow from './AllFilesTableRow';

export default function AllFilesTable(props) {
  const rows = props.files.map((file, i) => (
    <AllFilesTableRow
      key={i}
      name={file.name}
      size={file.size}
      createdAt={file.createdAt}
      handleViewFile={props.handleViewFile}
    />
  ));

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Filename</th>
          <th>Size</th>
          <th>Created At</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  );
}