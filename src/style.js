import React from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { transparentize } from "polished";

export const palette = {
  primary: "#1D3B3E",
  primaryAccent: "#152c2f",
  secondary: "#FDEAE4",
  secondaryAccent: "#DB7A75",
  accent: "#ffb366",
  grey: "#f8f8f6",
};

export const sizes = {
  desktop_xl: 1480,
  desktop: 980,
  mobile: 768,
  mobile_small: 500,
};

export const borderColorSecondary = transparentize(0.95, palette.secondary);
export const borderColorPrimary = transparentize(0.8, palette.primary);

export const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
 
  html {
    font-size: 10px;
  }

  body {
    height: 100vh;
    font-family: 'Montserrat';
    font-size: 1.6rem;
    color: ${palette.primary};
  }

  body #app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  ul, li {
    list-style: none;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }
 
`;

const ie = {
  ie: (...style) => css`
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      ${css(...style)}
    }
  `,
};

const media_ = Object.keys(sizes).reduce((acc, label) => {
  const emSize = sizes[label];
  acc[label] = (...args) => css`
    @media (max-width: ${emSize}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export const media = { ...media_, ...ie };

const Outer = styled.section`
  ${({ css }) => css};
`;

const Inner = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth}px;
  padding: 0 3rem;
  ${({ css }) => css};
`;

export const Center = ({
  cssInner,
  cssOuter,
  tagInner,
  tagOuter,
  maxWidth = sizes.desktop,
  children,
}) => (
  <Outer css={cssOuter} as={tagOuter}>
    <Inner css={cssInner} as={tagInner} maxWidth={maxWidth}>
      {children}
    </Inner>
  </Outer>
);

export const MetaLink = styled.div`
  color: ${palette.accent};
  border-bottom: 1px solid ${palette.accent};
`;

export const Heading = styled.h2`
  border-bottom: 1px solid ${palette.accent};
`;

export const Dot = styled.span`
  width: 0.8rem;
  height: 0.8rem;
  background: ${palette.accent};
  border-radius: 10rem;
  display: none;
`;

export const QuoteMark = styled.figure`
  font-size: 12rem;
  font-family: "Libre Baskerville";
  height: 6.4rem;
`;

const H1 = styled.h1`
  font-family: "Libre Baskerville";
  font-size: 50px;
  line-height: 1.06;
  letter-spacing: -0.5px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  color: ${({ light }) => (!light ? palette.primary : palette.secondary)};
  ${media.mobile`
  font-size: 35px;
  `}
`;

const H2 = styled.h2`
  font-family: "Libre Baskerville";
  font-size: 35px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.29;
  letter-spacing: -0.7px;
  color: ${({ light }) => (!light ? palette.primary : palette.secondary)};
  ${media.mobile`
  font-size: 28px;
  `}
`;

const H3Css = css`
  font-family: "Libre Baskerville";
  font-size: 30px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: -0.8px;
  color: #ffe4dc;
  ${media.mobile`
  font-size: 18px;
  `}
`;

const H3 = styled.h3`
  ${H3Css};
`;

const H4 = styled.h4`
  font-family: "Libre Baskerville";
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.56;
  letter-spacing: -0.3px;
  color: ${({ light }) => (!light ? palette.primary : palette.secondary)};
  ${media.mobile`
  font-size: 16px;
  `}
`;

export const LinkCss = css`
  font-family: "Montserrat";
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  font-weight: 600;
  font-size: 14px;
  color: ${({ light }) => (!light ? palette.primary : palette.secondary)};
  border-bottom: 2px solid ${palette.accent};
  padding-bottom: 0.3rem;
  width: fit-content;
  cursor: pointer;
  ${({ accent }) =>
    accent
      ? css`
          border: none;
          padding-bottom: 0;
          color: ${palette.accent};
        `
      : ""};

  :hover {
    color: ${palette.accent};
  }
`;
const Link = styled(RouterLink)`
  ${LinkCss};
`;

const LinkLarge = styled(RouterLink)`
  font-family: "Montserrat";
  font-size: 25px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.3px;
  text-align: center;
  color: ${palette.secondary};
  border-bottom: 1px solid ${palette.accent};
  width: fit-content;
  padding-bottom: 0.4rem;
  margin-bottom: 0.4rem;
  cursor: pointer;
  :hover {
    color: ${palette.accent};
  }

  ${media.mobile`
    font-size: 18px;
  `}
`;

export const BodyCss = css`
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: normal;
  color: ${({ light }) => (!light ? palette.primary : palette.secondary)};
  ${media.mobile`
  font-size: 14px;
  /* line-height: 2.1; */
  `}
`;

const Body = styled.p`
  ${BodyCss};
`;

export const InputCss = css`
  font-family: "Montserrat";
  font-size: 21px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.48;
  letter-spacing: 0.5px;
  color: ${({ light }) => (!light ? palette.primary : palette.secondary)};
`;

const Input = styled.span`
  ${InputCss};
`;

export const MetaCss = css`
  font-family: "Libre Baskerville";
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.64;
  letter-spacing: normal;
  color: ${({ light }) => (!light ? palette.primary : palette.secondary)};
`;

const Meta = styled.span`
  ${MetaCss}
`;

const Quote = styled.p`
  font-family: "Libre Baskerville";
  font-size: 25px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.52;
  letter-spacing: -0.7px;
  color: ${({ light }) => (!light ? palette.primary : palette.secondary)};
  ${media.mobile`
    font-size: 21px;
  `}
`;

const Tab = styled.span`
  font-family: "Montserrat";
  font-size: 20px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.12;
  letter-spacing: normal;
  color: ${({ dark }) => (dark ? palette.primary : palette.accent)};
  border-bottom: 2px solid
    ${({ dark }) => (dark ? palette.primary : palette.accent)};
  padding-bottom: 0.4rem;
  cursor: pointer;
  width: fit-content;
  ${({ active }) =>
    active
      ? ""
      : css`
          opacity: 0.75;
          border-color: transparent;
        `};
`;

const Testimonial = styled.p`
  font-family: "Libre Baskerville";
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: -0.5px;
  color: ${({ light }) => (!light ? palette.primary : palette.secondary)};
`;

export const Typography = {
  H1,
  H2,
  H3,
  H4,
  Body,
  Testimonial,
  Input,
  Link,
  LinkLarge,
  Meta,
  Quote,
  Tab,
};
