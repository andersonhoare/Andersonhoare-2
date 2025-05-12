import React from 'react';
import styled, { css } from 'styled-components';
import { Center, palette, media, Typography } from '../../style';
import { fetchImageContentful } from '../../utils';

const ImageHero = styled.img`
  width: 100%;
  height: 60rem;
  object-fit: cover;
  ${media.mobile`
    height: 20rem;
  `};
`;

const Spacer = styled.div`
  height: 14rem;
  ${media.mobile`
    height: 7rem;
  `};
`;

const Mover = styled.div`
  position: relative;
  top: 8rem;
  ${media.mobile`
    top: 4rem;
  `};
`;

const cssOuter = css`
  background: ${palette.primary};
`;

const cssInner = css`
  h4 {
    margin-bottom: 7rem;
  }
`;

export default ({ heroImage, title }) => {
  return (
    <React.Fragment>
      <Center cssInner={cssInner} cssOuter={cssOuter}>
        <Mover>
          <ImageHero src={fetchImageContentful(heroImage.file.url)} />
        </Mover>
      </Center>
      <Spacer />
      <Center cssInner={cssInner}>
        <Typography.H4>{title}</Typography.H4>
      </Center>
    </React.Fragment>
  );
};
