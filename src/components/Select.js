import React from 'react';

const Select = ({
  options, 
  valueKey,
  titleKey,
  allTitle, 
  value,
  onSelect
}) => {
  console.log(options);
  return (
    <select onChange={onSelect}>
      <option value={value}>{allTitle}</option>
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