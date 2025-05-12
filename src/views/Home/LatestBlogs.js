import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Center, Typography, media, palette } from '../../style';
import { Link } from 'react-router-dom';
import Blog from '../../components/Blog';
import { route } from '../../routes';

const cssOuter = css`
  background: white;
`;

const cssInner = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 6rem;

  li:nth-child(3) {
    bottom: 30rem;
  }

  li:nth-child(4) {
    bottom: -5rem;
  }

  ${media.mobile`
    grid-gap: 6rem;
    grid-template-columns: 1fr;

    li:nth-child(3) {
      bottom: initial;
    }
  
    li:nth-child(4) {
      bottom: initial;
    }

    ${media.mobile`
      margin-bottom: 6rem;
    `};

  `};
`;

const Intro = styled.li`
  h2 {
    padding-bottom: 3rem;
  }
  p {
    padding-bottom: 3rem;
    width: 75%;
  }
`;

export default ({ blogIntro, blogs }) => (
  <Center cssOuter={cssOuter} cssInner={cssInner} tagInner="ul">
    <Intro>
      <Typography.H2> Our blog </Typography.H2>
      <Typography.Body>{blogIntro}</Typography.Body>
      <Typography.Link to={route.blog}>View all latest</Typography.Link>
    </Intro>
    {blogs.length ? blogs.map(Blog) : null}
  </Center>
);
