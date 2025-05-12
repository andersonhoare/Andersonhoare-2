import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Center, Typography, LinkCss, media, palette } from '../../style';

const fade = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const cssOuter = css`
  background: white;
  padding: 12rem 0;
  /* height: 40rem; */
  /* align-items: center; */
  ${media.mobile`
    padding-top: 0rem;
    padding-bottom: 7rem;
  `};
`;

const cssInner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: min-content;
  grid-gap: 2rem;
  padding: 6rem 0;

  ${media.mobile`
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
  `};
`;

const Thumbnail = styled.img`
  height: 100%;
  width: 100%;
  max-height: 20rem;
  max-width: 20rem;
  object-fit: cover;
  object-position: center;
  ${media.mobile`
    max-height: 20rem;
    max-width: 20rem;
  `};
`;

const Link = styled.a`
  ${LinkCss};
`;

const List = styled.li``;

export default ({ instagrams }) => (
  <Center cssOuter={cssOuter} cssInner={cssInner} tagInner="ul">
    <Typography.H4>@anderson_hoare</Typography.H4>
    <Grid>
      {instagrams.slice(0, 8).map(({ src, caption, link }, key) => (
        <List key={key}>
          <a href={link}>
            <Thumbnail src={src} alt={caption} />
          </a>
        </List>
      ))}
    </Grid>
    <Link target="_blank" href="https://www.instagram.com/anderson_hoare/">
      Follow us on Instagram
    </Link>
  </Center>
);
