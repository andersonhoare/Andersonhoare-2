import React from 'react';
import { Center, palette, media, LinkCss, Typography } from '../../style';
import { HeaderHalf, HeaderEmpty } from '../../components/Header';
import { Card, Panel } from '../../components/ImageGrid';
import Testimony from '../../components/Testimony';
import styled, { css } from 'styled-components';
import { route } from '../../routes';
import { isNotIe, fetchImageContentful } from '../../utils';

const cssOuter = css`
  background: ${palette.primary};
  color: ${palette.secondary};
  ${media.mobile`
  > div {
    padding-top: 8rem;
  }`}
`;

const Meta = styled.div`
  width: fit-content;
`;

const Body = styled.p`
  margin-bottom: 2rem;
`;

const Email = styled.a`
  ${LinkCss}
`;

export default ({
  howWeWork,
  rolesWeRecruitFor,
  needAPerm,
  needATemp,
  needAPermEmail,
  needATempEmail,
  testimonial,
  panelImage
}) => {
  return (
    <Center cssOuter={cssOuter}>
      <HeaderHalf type="dark" title="Hire an Assistant in London">
        <Typography.Body light as={Body}>
          {rolesWeRecruitFor}
        </Typography.Body>
      </HeaderHalf>
      <HeaderHalf type="dark" title="How we work">
        <Typography.Body light as={Body}>
          {howWeWork}
        </Typography.Body>
      </HeaderHalf>
      <Panel src={fetchImageContentful(panelImage.file.url)}>
        <Card
          title="Need a perm?"
          body={needAPerm}
          renderBottom={
            <Email
              onClick={_ =>
                isNotIe() && gtag('event', `client_email_needAPerm`, {})
              }
              href={`mailto:${needAPermEmail}`}
            >
              Contact enquiries
            </Email>
          }
        />
        <Card
          title="Need a temp?"
          body={needATemp}
          renderBottom={
            <Email
              onClick={_ =>
                isNotIe() && gtag('event', `client_email_needATemp`, {})
              }
              href={`mailto:${needATempEmail}`}
            >
              Contact us
            </Email>
          }
        />
      </Panel>
      {testimonial && testimonial.name && testimonial.description && testimonial.body ? (
        <HeaderEmpty type="dark">
          <Testimony
            name={testimonial.name}
            description={testimonial.description}
            body={testimonial.body}
          />
        </HeaderEmpty>
      ) : null}
    </Center>
  );
};
