import React from "react";
import styled, { css } from "styled-components";
import { fetchImageContentful, formatDateTime } from "../utils";
import { BodyCss, LinkCss, media } from "../style";
import Markdown from "react-markdown";

const BodyAlt = styled.div`
  > div {
    display: grid;
    grid-gap: 2rem;
    width: 100%;
    /* margin-bottom: 4rem; */
    white-space: pre-wrap;
    ${media.mobile`
      margin-bottom: 2rem;
    `};
    p {
      /* ${BodyCss}; */
    }

    img,
    video {
      width: 100%;
    }

    a {
      font-weight: 400;
      font-family: "Libre Baskerville";
      letter-spacing: initial;
      font-size: 2.1rem;
      padding-bottom: 0rem;
    }
  }
`;

const Body = styled.div`
  > div {
    display: grid;
    grid-gap: 2rem;
    width: 100%;
    margin-bottom: 4rem;
    white-space: pre-wrap;
    ${media.mobile`
      margin-bottom: 2rem;
    `};

    p {
      ${BodyCss};
    }

    img,
    video {
      width: 100%;
    }

    a {
      ${LinkCss};
      padding-bottom: 0rem;
    }
  }
`;

export const Alternative = ({ source, as }) => (
  <BodyAlt as={as} light={true}>
    <Markdown
      transformImageUri={(url) =>
        url.includes("//images.ctfassets") ? fetchImageContentful(url) : url
      }
      source={source}
    />
  </BodyAlt>
);

export default ({ source, as }) => (
  <Body as={as}>
    <Markdown
      transformImageUri={(url) =>
        url.includes("//images.ctfassets") ? fetchImageContentful(url) : url
      }
      source={source}
    />
  </Body>
);
