import React from 'react';
import Button from 'react-bootstrap/Button';

export default function DataPagination(props) {
  const { offset, limit, length, handlePreviousPage, handleNextPage } = props;
  const pageNumber = Math.floor(offset / limit) + 1;
  const lastPage = length / limit;
  const disablePreviousPage = pageNumber < 2;
  const disableNextPage = pageNumber > lastPage;

  return (
    <div>
      {`Page ${pageNumber} of ${Math.ceil(length / limit)}`}
      <div>
        <Button variant="secondary" size="sm" disabled={disablePreviousPage} onClick={handlePreviousPage}>&#60; Previous</Button>
        <Button variant="secondary" size="sm" disabled={disableNextPage} onClick={handleNextPage}>Next &#62;</Button>
      </div>
    </div>
  );
}