// import React from 'react';
import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { palette, LinkCss } from '../style';

const defaultAttr = {
  type: 'button'
};

const base = css`
  ${LinkCss};
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  width: fit-content;
  border-radius: 10rem;
  padding: 1.4rem 5rem;
`;

export const ButtonPrimary = styled.button.attrs(defaultAttr)`
  ${base};
  background: transparent;
  border: ${palette.accent} 1px solid;
`;
