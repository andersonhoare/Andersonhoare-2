import React from 'react';
import styled, { css } from 'styled-components';
import { Center, borderColorSecondary, media, palette } from '../../style';
import Blog from '../../components/Blog';

const cssOuter = css`
  background: ${palette.primary};
`;

const cssInner = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: column;
  grid-gap: 4rem;
  border-top: 2px solid ${borderColorSecondary};
  padding-top: 6rem;
  ${media.mobile`
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    padding-bottom: 6rem;
  `};
`;

export default ({ blogs }) => (
  <Center cssOuter={cssOuter} cssInner={cssInner}>
    {blogs.map((props, key) => (
      <Blog key={props.id || key} light {...props} />
    ))}
  </Center>
);
