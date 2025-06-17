import React from "react";
import {
  Center,
  palette,
  Typography,
  media,
  LinkCss,
  borderColorSecondary,
} from "../style";
import styled, { css } from "styled-components";
import FacebookIcon from "./icons/Facebook";
import LinkedinIcon from "./icons/Linkedin";
import InstagramIcon from "./icons/Instagram";
import TwitterIcon from "./icons/Twitter";
import { route } from "../routes";

const cssOuter = css`
  background: ${palette.primaryAccent};
  padding-bottom: 8rem;
  display: flex;
  flex: 1;
  ${media.mobile`
    padding-bottom: 0;
  `}
`;

const cssInner = css`
  display: grid;
  grid-template:
    "social address links" auto
    / 2fr 1fr 1fr;
  height: 24rem;
  ${media.mobile`
    height: auto;
    grid-template:
    'address' auto
    'links' auto
    'social' auto
    / 1fr;
    padding: 4rem 1rem;
    grid-gap: 2rem;
  `};
`;

const MetaType = styled(Typography.Body)`
  font-size: 1.4rem;
`;

const Link = styled.a`
  ${LinkCss};
`;

const Social = styled.section`
  grid-area: social;
  padding: 4rem 0;
  display: grid;
  grid-template-rows: repeat(1, min-content) auto;
  grid-gap: 0.4rem;
  color: white;

  > :last-child {
    display: grid;
    align-self: end;
  }

  ${media.mobile`
      grid-gap: 2rem;
      padding: 1rem;
  `}
`;

const Address = styled.section`
  grid-area: address;
  padding: 4rem 0;
  display: grid;
  grid-template-rows: repeat(1, min-content) auto;
  grid-gap: 0.4rem;
  color: white;
  > :last-child {
    display: grid;
    align-self: end;
  }
  address {
    white-space: pre-line;
    line-height: 2rem;
  }
  ${media.mobile`
      grid-gap: 2rem;
      padding: 1rem;
  `}
`;

const Links = styled.section`
  grid-area: links;
  padding: 4rem 0;
  /* display: grid; */
  /* grid-template-rows: repeat(3, min-content) auto; */
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 1rem;

  color: ${palette.accent};
  grid-gap: 0.4rem;
  > :last-child {
    display: grid;
    align-self: end;
  }
  ${media.mobile`
      grid-gap: 1.6rem;
      padding: 1rem;
  `}
`;

const SocialLinks = styled.ul`
  li {
    display: inline-block;
    margin-right: 2rem;
  }

  li:last-of-type {
    margin-right: 0;
  }

  ${media.mobile`
      li:not(:last-of-type) {
        margin-right: 2rem;
        margin-bottom: 2rem;
      }
  `};
`;

const SocialIcon = styled.a`
  border: 2px solid ${borderColorSecondary};
  padding: 1rem;
  display: grid;
  border-radius: 100%;
  svg {
    width: 3rem;
    height: 3rem;
  }
  :hover svg {
    fill: ${palette.accent};
  }
`;

const getIcon = (name) => {
  switch (name.toLowerCase()) {
    case "facebook":
      return <FacebookIcon fill={palette.secondary} />;
    case "linkedin":
      return <LinkedinIcon fill={palette.secondary} />;
    case "instagram":
      return <InstagramIcon fill={palette.secondary} />;
    case "twitter":
      return <TwitterIcon fill={palette.secondary} />;
    default:
      return null;
  }
};

export default ({
  address,
  phone,
  lookingToHireTitle,
  lookingToHireBody,
  emailEnquiries,
  emailConsultant,
  socialMedia,
}) => (
  <Center cssOuter={cssOuter} cssInner={cssInner} tagOuter="footer">
    <Social>
      <SocialLinks>
        {socialMedia.map(({ url, displayName }, key) => {
          return (
            <li>
              <SocialIcon href={url} alt={displayName} target="_blank">
                {getIcon(displayName)}
              </SocialIcon>
            </li>
          );
        })}
      </SocialLinks>
      <MetaType light>Copyright @2025 Anderson Hoare</MetaType>
    </Social>
    <Address>
      <MetaType light as="address">
        {address}
      </MetaType>
    </Address>
    <Links>
      <Typography.Link accent to={route.contact}>
        Get in touch
      </Typography.Link>
      <Typography.Link accent to={route.clients}>
        Looking to recruit?
      </Typography.Link>
      <Typography.Link accent to={route.privacy}>
        Privacy
      </Typography.Link>
    </Links>
  </Center>
);
