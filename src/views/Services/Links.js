import React from "react";
import { Center, palette, Typography } from "../../style";
import { route } from "../../routes";
import { toPostUrl } from "../../utils";
import FooterLink from "../../components/FooterLink";
import styled, { css } from "styled-components";

const Main = styled.div`
  display: grid;
  grid-gap: 4rem;
`;

export default () => {
  return (
    <FooterLink>
      <Main>
        <Typography.H3>
          For more information on any of these services please do not hesitate
          to get in touch with us
        </Typography.H3>
        <Typography.LinkLarge to={route.contact}>
          Get in touch
        </Typography.LinkLarge>
      </Main>
    </FooterLink>
  );
};
