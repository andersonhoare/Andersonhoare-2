import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ButtonPrimary } from '../../components/Button';
import Markdown from '../../components/Markdown';
import { Center, palette, media, Typography } from '../../style';
import { useJobFilter } from '../../hooks';
import { Controls } from '../../components/JobFilter';
import { route } from '../../routes';

const cssOuter = css`
  background: ${palette.grey};
`;

const cssInner = css`
  display: grid;
  grid-gap: 4rem;
  padding: 10rem 3rem;
  margin-bottom: 16rem;
  div > div {
    margin: 0;
  }
  ${media.mobile`
    padding: 6rem 3rem;
    margin-bottom: 6rem;
  `};
`;

export default ({ info }) => {
  return (
    <Center cssOuter={cssOuter} cssInner={cssInner}>
      <Typography.H2> Private PA jobs </Typography.H2>
      <Markdown source={info} />
    </Center>
  );
};
