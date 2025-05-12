import React from 'react';
import styled, { css } from 'styled-components';
import { Center, Dot, Typography, LinkCss, media, palette } from '../../style';
import { isNotIe } from '../../utils';

const cssOuter = css`
  background: ${palette.primary};
`;

const cssInner = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 8rem 0;

  ${media.ie`
    > * {
      width: 50%;
      display: inline-block;
      vertical-align: top;
    }
  `};
  ${media.mobile`
    grid-template-columns: 1fr;
    grid-gap: 4rem;
    padding: 4rem 3rem;
  `};
}
`;

const Main = styled.div`
  display: grid;
  grid-gap: 2rem;
  padding-bottom: 2rem;

  ${media.ie`
    > * {
      margin-bottom: 4rem;
    }
  `};

  ${media.mobile`
    padding: 0;
  `};
`;

const Link = styled.a`
  ${LinkCss};
`;

const LookingToHire = styled.div`
  display: grid;
  grid-gap: 3rem;
`;

const Address = styled(Typography.H4)`
  white-space: pre-line;
`;

const Phone = styled(Typography.H4)``;

const Enquire = styled(Typography.H4)``;

const Section = styled.div`
  display: grid;
  grid-auto-flow: rows;
`;

const DotComp = styled(Dot)`
  margin-bottom: 4rem;
`;

export default ({ contact }) => {
  const {
    address,
    phone,
    lookingToHire,
    lookingToHireEmail,
    enquiriesEmail,
    socialMedia
  } = contact;
  return (
    <Center cssOuter={cssOuter} cssInner={cssInner}>
      <Typography.H1 light>Get in touch</Typography.H1>
      <Main>
        <Address light as="address">
          {address}
        </Address>
        <Section>
          <Phone light as={isNotIe() ? 'a' : 'div'} href={`tel:${phone}`}>
            {phone}
          </Phone>
          <Enquire
            light
            href={`mailto:${enquiriesEmail}`}
            as="a"
            onClick={_ =>
              isNotIe() && gtag('event', `contact_email_enquiries`, {})
            }
          >
            {enquiriesEmail}
          </Enquire>
        </Section>
        <DotComp />

        <LookingToHire>
          <Typography.H4 light>Looking to hire?</Typography.H4>
          <Typography.Body light>{lookingToHire}</Typography.Body>
          <Link
            light
            href={`mailto:${lookingToHireEmail}`}
            onClick={_ =>
              isNotIe() && gtag('event', `contact_email_lookingToHire`, {})
            }
          >
            Contact enquiries
          </Link>
        </LookingToHire>
      </Main>
    </Center>
  );
};
