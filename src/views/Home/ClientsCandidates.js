import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Center, media, palette, sizes, Typography } from '../../style';
import { route } from '../../routes';
import Markdown from '../../components/Markdown';

const cssOuter = css`
  padding-bottom: 16rem;
  ${media.mobile`
    padding-bottom: 8rem;
  `};
`;

const cssInner = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 4rem;
  ${media.mobile`
    grid-template-columns: 1fr;
    grid-gap: 8rem;
  `};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    padding-bottom: 4rem;
    ${media.mobile`
      padding-bottom: 2rem;
    `};
  }

  p {
    padding-right: 9rem;
  }

  a {
    margin-right: 3rem;
  }

  strong {
    padding-bottom: 0.4rem;
  }

  ${media.mobile`
    p {
      padding-right: 0;
    }
  `};
`;

export default ({ clients, candidates }) => {
  return (
    <Center cssOuter={cssOuter} cssInner={cssInner}>
      <Section>
        <div>
          <Typography.H2>Clients</Typography.H2>
          <Markdown source={clients} />
        </div>
        <Typography.Link to={route.clients}>How we work</Typography.Link>
      </Section>
      <Section>
        <div>
          <Typography.H2>Candidates</Typography.H2>
          <Markdown source={candidates} />
        </div>
        <Typography.Link to={route.candidates}>What we offer</Typography.Link>
      </Section>
    </Center>
  );
};
