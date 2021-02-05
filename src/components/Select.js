import React from 'react';

const Select = ({
  options, 
  valueKey,
  titleKey,
  allTitle, 
  value,
  onSelect
}) => {
  const handleSelect = e => {
    e.preventDefault();
    onSelect(e.target.value);
  }
  return (
    <select value={value} onChange={handleSelect}>
      <option value='all'>{allTitle}</option>
      {options.map(option => 
        <option 
          disabled={option.disabled}
          key={option[valueKey]} 
          value={option[valueKey]}
        >{option[titleKey]}</option>
      )}
    </select>
  );
};

export default Select;