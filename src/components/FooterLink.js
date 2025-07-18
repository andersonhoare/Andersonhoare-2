import React from 'react';
import { Center, media, palette, borderColorSecondary } from '../style';
import styled, { css } from 'styled-components';

const cssOuter = css`
  background: ${palette.primary};
  border-top: 2px solid ${borderColorSecondary};
`;

const cssInner = css`
  display: grid;
  grid-template-columns: repeat(${x => x.children.length}, 1fr);
  justify-items: center;
  ${media.mobile`
    grid-template-columns: 1fr;
    grid-gap: 4rem;
    padding: 6rem 2rem;
  `};
`;

const Wrap = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  padding: 8rem 4rem 8rem 4rem;
  ${media.mobile`
    padding: 0;
  `};
  ${({ len }) =>
    len > 1
      ? css`
          :first-of-type {
            border-right: 2px solid ${borderColorSecondary};
          }
        `
      : ''}

  ${media.mobile`
:first-of-type {
            border-right: none;
          }
  `};
`;

export default ({ children }) => (
  <Center cssOuter={cssOuter} cssInner={cssInner}>
    {React.Children.map(children, (child, idx) => (
      <Wrap key={idx} len={children.length}>{child}</Wrap>
    ))}
  </Center>
);
