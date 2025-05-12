import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Center, Typography, sizes, media, palette } from "../style";
import styled, { css } from "styled-components";
import Menu from "./icons/Menu";
import Cross from "./icons/Cross";

const HeroFullWrap = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  height: 60rem;
  ${media.mobile`
    grid-template-columns: 1fr;
    height: auto;
    padding-bottom: 2rem;
    grid-gap: 2rem;
  `};
`;

const HeaderFullTitle = styled(Typography.H1)`
  margin-top: 8rem;
  margin-bottom: 4rem;
  ${media.mobile`
  margin-top: 4rem;
  `};
`;

const HeaderFullLeft = styled.div`
  padding-right: 8rem;
  ${media.mobile`
    padding-right: 0;
  `};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  height: 50rem;
  ${media.mobile`
    height: 20rem;
  `};
`;

const Spacer = styled.div`
  background: transparent;
  height: 20rem;
  ${media.mobile`
    display: none;
  `};
`;

const Mover = styled.div`
  margin-top: -20rem;
  ${media.mobile`
    margin-top: -8rem;
  `};
`;

export const HeroFull = ({
  title,
  light,
  subtitle,
  imageSrc,
  background,
  spacer,
  Container = HeroFullWrap,
  subtitleMeta,
}) => (
  <React.Fragment>
    <Center
      cssOuter={css`
        background: ${background};
      `}
    >
      <Container>
        <HeaderFullLeft>
          <HeaderFullTitle light={light}>{title}</HeaderFullTitle>
          <Typography.Body light={light}>{subtitle}</Typography.Body>
          {subtitleMeta || null}
        </HeaderFullLeft>
        <Image src={imageSrc} />
      </Container>
    </Center>
    <Mover>
      <Center
        cssOuter={css`
          background: ${spacer};
        `}
      >
        <Spacer />
      </Center>
    </Mover>
  </React.Fragment>
);
