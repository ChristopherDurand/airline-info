import React, { useState } from 'react';

const Table = ({ 
  className,  
  columns,
  rows, 
  format,
  perPage
}) => {
  const [page, setPage] = useState(1);
  const maxPages = Math.ceil(rows.length / perPage);
  const shownRows = rows.slice((page - 1) * perPage, page * perPage);
  const changePage = delta => e => {
    e.preventDefault();
    setPage(page + delta);
  }
  const lowerBound = (page - 1) * perPage + 1;
  const upperBound = Math.min(page*perPage, rows.length)
  
  return (
  <>
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
      <p>Showing {lowerBound}-{upperBound} of {rows.length} routes.</p>
      <p>
        <button disabled={page === 1} onClick={changePage(-1)}>
          Previous Page
        </button>
        <button disabled={page === maxPages} onClick={changePage(1)}>
          Next Page
        </button>
      </p>
    </div>
  </>
  )
}
export default Table;
