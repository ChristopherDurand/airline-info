import React, { useState } from 'react';

const Table = ({ 
  className,  
  columns,
  rows, 
  format,
  perPage
}) => {
  const [page, setPage] = useState(1);
  const maxPages = Math.ceil(columns.length / perPage);
  const shownRows = rows.slice((page - 1) * perPage, page * perPage);
  return (
  <section>
    <table className={className}>
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
    <div className='pagination'>
      <p>Showing {(page-1) * perPage + 1}-{page*perPage} of {rows.length} routes.</p>
    </div>
   </section>
  )
}
export default Table;
