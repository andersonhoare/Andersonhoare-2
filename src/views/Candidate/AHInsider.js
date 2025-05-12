import React from "react";
import styled, { css } from "styled-components";
import { LinkCss, Center, palette, media, Typography } from "../../style";
import { HeaderHalf, HeaderEmpty } from "../../components/Header";

const cssOuter = css`
  background: ${palette.primary};
  color: ${palette.secondary};
`;

const cssInner = css`
  display: grid;
  grid-gap: 4rem;
  padding: 0 3rem 10rem 3rem;

  ${media.mobile`
    padding: 6rem 3rem;
    margin-bottom: 6rem;
  `};
`;

const Body = styled.p`
  margin-bottom: 2rem;
`;

export default () => {
  return (
    <Center cssOuter={cssOuter} cssInner={cssInner}>
      <HeaderHalf type="dark" title="AH Insider">
        <Typography.Body light as={Body}>
          At Anderson Hoare pride ourselves on only working with the best
          candidates. This means that when you successfully register with us you
          will be welcomed into our team of ‘Insiders” and have access to a
          number of resources. These include our job board (which we don’t
          publish on our website), our team of coaches and mentors, discounts
          from affiliated brands, invites to our member events and access to a
          community of other assistants at the top of the industry.
        </Typography.Body>
      </HeaderHalf>
    </Center>
  );
};
