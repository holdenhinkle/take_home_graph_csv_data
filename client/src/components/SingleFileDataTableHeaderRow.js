import React from 'react';

export default function SingleFileDataTableHeaderRow(props) {
  const row = props.row.map((data, i) => {
    return (
      data.length <= 1
        ?
        <th key={i}>
          {data}
        </th>
        :
        <th key={i}>
          {data.slice(0, 1).toUpperCase() + data.slice(1)}
        </th>
    );
  });

  return (
    <tr>
      {row}
    </tr>
  );
}