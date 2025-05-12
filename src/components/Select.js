import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { palette, borderColorSecondary, borderColorPrimary } from '../style';

const StyledSelect = styled.div`
  .rs__control {
    font-size: 1.2rem;
    border: none;
    border-radius: 0.2rem;
    background: transparent;
    border-bottom: 1px solid ${borderColorPrimary};
    cursor: pointer;
  }

  .rs__control--is-focused {
    box-shadow: none;
  }

  .rs__control:hover,
  .rs__control--is-focused:hover {
    border-bottom: 1px solid ${borderColorPrimary};
  }

  .rs__input {
    font-size: 21px;
    color: ${palette.primary};
  }
  .rs__placeholder {
    font-size: 21px;
    opacity: 0.5;
    font-weight: 500;
  }
  .rs__indicator > svg {
    fill: ${palette.accent};
  }

  .rs__menu {
    margin-top: 0;
    border-radius: 0;
  }

  .rs__single-value {
    font-size: 21px;
  }

  .rs__indicator-separator {
    opacity: 0;
  }
  .rs__value-container {
    padding: 0 0.6rem;
    overflow: initial;
  }
  .rs__option {
    font-size: 21px;
  }
  .rs__option--is-focused {
    background: #ffffff1a;
  }
  .rs__option--is-selected {
    background: #a2bdff7d;
  }

  .rs__multi-value {
    background: ${palette.primary};
    padding: 0.2rem 0.3rem;
  }

  .rs__multi-value__label {
    font-size: 1.6rem;
    color: ${palette.secondary};
  }

  .rs__multi-value__remove:hover {
    background: ${palette.accent};
  }
  .rs__multi-value__remove svg {
    fill: ${palette.secondary};
  }
  .rs__multi-value__remove:hover svg {
    border-radius: 0;
    fill: ${palette.primary};
  }
`;

export default ({ placeholder, value, onChange, options, isMulti = true }) => (
  <StyledSelect
    classNamePrefix="rs"
    isSearchable={false}
    as={Select}
    isMulti={isMulti}
    value={value}
    onChange={onChange}
    options={options}
    placeholder={placeholder}
    isClearable={false}
    // menuIsOpen
  />
);
