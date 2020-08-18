import React from 'react';

export default function SingleFileDataTableDataRow(props) {
  const row = props.row.map((data, i) => {
    if (props.stateIdx && data === '') {
      data = 'BLANK';
    }

    return (
      <td key={i}>
        {data}
      </td>);
  });

  return (
    <tr>
      {row}
    </tr>
  );
}