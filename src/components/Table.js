import React from 'react';

const Table = ({ 
  className,  
  columns,
  rows, 
  format 
}) => {
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
      {rows.map(row =>
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
