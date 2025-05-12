import React from 'react';
import { useJobFilter } from '../hooks';
import Select from './Select';

export const Controls = ({
  filterType,
  filterSalary,
  setFilterType,
  setFilterSalary,
  optionsType,
  optionsSalary
}) => {
  return (
    <React.Fragment>
      <Select
        isMulti={false}
        value={filterType}
        onChange={setFilterType}
        options={optionsType}
        placeholder={'Job term'}
      />
      <Select
        isMulti={false}
        value={filterSalary}
        onChange={setFilterSalary}
        options={optionsSalary}
        placeholder={'Salary'}
      />
    </React.Fragment>
  );
};

export default ({ jobs, children }) => {
  const {
    filteredJobs,
    filterSalary,
    filterType,
    setFilterSalary,
    setFilterType
  } = useJobFilter({ jobs });
  return (
    <React.Fragment>
      <Controls
        filterType={filterType}
        filterSalary={filterSalary}
        setFilterType={setFilterType}
        setFilterSalary={setFilterSalary}
        optionsType={optionsType}
        optionsSalary={optionsSalary}
      />
      {children(filteredJobs)}
    </React.Fragment>
  );
};
