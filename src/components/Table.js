import React, { useState } from 'react';

const Table = ({ 
  className,  
  columns,
  rows, 
  format 
}) => {
  const [page, setPage] = useState(1);
  const ENTRIES_PER_PAGE = 25;
  const maxPages = Math.ceil(columns.length / ENTRIES_PER_PAGE);
  const shownRows = rows.slice((page - 1) * ENTRIES_PER_PAGE, page * ENTRIES_PER_PAGE);
  return (
  <table className='routes-table'>
    <thead>
      <tr>
        {columns.map(column => 
          <th key={column.name}>{column.name}</th>
        )}
      </tr>
    </thead>
    <tbody>
      {shownRows.map(row =>
        <tr key={Object.values(row).join("-")}>
          {columns.map(({ property }) => 
            <td key={property}>{format(property, row[property])}</td>
          )}
        </tr>
      )}
    </tbody>
  </table>
  )
}
export default Table;
