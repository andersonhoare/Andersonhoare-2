import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Center, MetaLink, palette, sizes, media } from '../../style';
import { fetchImageContentful } from '../../utils';
import Slider from '../../components/Slider';

import { Link } from 'react-router-dom';

const cssOuter = css`
  background: ${palette.secondary};
  height: 40rem;
  width: 100%;
  min-width: 100%;
  ${media.mobile`
  display: none;
  `};
`;

const cssInner = css`
   display: grid; 
  grid-template-columns: repeat(2, 1fr); 
  /* grid-gap: 2rem; */
  height: 100%;
  display: flex;
  align-items: center;
  > * {
    width: 50% !important;
    display: inline-block;
  }
  ${media.mobile`
    grid-template-columns: 1fr;
    padding: 0;
  `};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${media.mobile`
    height: auto;
  `};
  ${media.desktop`
    height: 100%;
    object-fit: cover;
  `};
`;

export default ({ items, heroImage }) => {
  // Filter out incomplete testimonials if present
  const filteredItems = Array.isArray(items)
    ? items.filter(
        x => !x || (x.job_reference) || (x.name && x.description && x.body)
      )
    : items;
  return (
    <Center
      cssOuter={cssOuter}
      cssInner={cssInner}
      tagInner="ul"
      maxWidth={sizes.desktop_xl}
    >
      <div>
        <Slider loop={8000} orangeArrows items={filteredItems} noDots />
      </div>
      <Image src={fetchImageContentful(heroImage.file.url)} />
    </Center>
  );
};
