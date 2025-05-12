import React from "react";
import { Dot, Typography, media, Center, palette } from "../style";

import styled, { css } from "styled-components";

const PanelComp = styled.div`
  width: 100%;
  /* min-height: 40rem; */
  background-image: url(${({ src }) => src});
  background-position: center;
  background-size: cover;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 6rem;
  padding: 6rem;
  margin-bottom: 8rem;
  ${media.mobile`
    grid-template-columns: 1fr;
    padding: 2rem;
    grid-gap: 2rem;
    margin-bottom: 3rem;
    br {
      display: none;
    }

  `};
`;

export const CardComponent = styled.div`
  background: ${palette.grey};
  padding: 4rem;
  display: grid;
  grid-gap: 3rem;
  grid-auto-flow: row;
  grid-auto-rows: min-content;
  ${media.mobile`
    padding: 2rem;
  `};
`;

export const Card = ({ title, body, renderBottom }) => (
  <CardComponent>
    <Typography.H4>{title}</Typography.H4>
    <Typography.Body>{body}</Typography.Body>
    {renderBottom}
  </CardComponent>
);

export const Panel = ({ src, children }) => (
  <PanelComp src={src}>{children}</PanelComp>
);
