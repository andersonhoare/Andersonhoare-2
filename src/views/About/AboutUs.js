import React from 'react';
import styled, { css } from 'styled-components';
import { Center, Typography, media, Heading } from '../../style';
import { HeaderHalf } from '../../components/Header';

const cssOuter = css`
  padding-top: 9rem;
  padding-bottom: 5rem;
  ${media.mobile`
    padding-top: 4rem;
    padding-bottom: 0;
  `}
`;

export default ({ footer }) => {
  return (
    <Center cssOuter={cssOuter}>
      <HeaderHalf type="none" title="Who we work with">
        <Typography.Body>{footer}</Typography.Body>
      </HeaderHalf>
    </Center>
  );
};
