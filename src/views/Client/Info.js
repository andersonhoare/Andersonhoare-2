import React from "react";
import { Center, palette, media, LinkCss, Typography } from "../../style";
import { HeaderHalf, HeaderEmpty } from "../../components/Header";
import { Card, Panel } from "../../components/ImageGrid";
import Testimony from "../../components/Testimony";
import styled, { css } from "styled-components";
import { route } from "../../routes";
import { fetchImageContentful, isNotIe } from "../../utils";
import { toPostUrl } from "../../utils";

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

const Links = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem 0rem;
  white-space: nowrap;

  ${media.mobile`
    white-space: normal;
   `};
`;

export default ({
  services,
  howWeWork,
  rolesWeRecruitFor,
  needAPerm,
  needATemp,
  needAVa,
  needAContractor,
  needAVaEmail,
  needAContractorEmail,
  needAPermEmail,
  needATempEmail,
  testimonial,
  panelImage,
}) => {
  return (
    <Center cssOuter={cssOuter}>
      <HeaderHalf type="dark" title="Looking to hire an assistant?">
        <Typography.Body light as={Body}>
          {rolesWeRecruitFor}
        </Typography.Body>
      </HeaderHalf>
      <HeaderHalf type="dark" title="How we work">
        <Typography.Body light as={Body}>
          {howWeWork}
        </Typography.Body>
        <Links>
          {services.map(({ title }) => (
            <Typography.Link
              light
              to={`${route.services}/${toPostUrl({
                title: title,
              })}`}
            >
              {title}
            </Typography.Link>
          ))}
        </Links>
      </HeaderHalf>
      <Panel src={fetchImageContentful(panelImage.file.url)}>
        <Card
          title="Need a perm?"
          body={needAPerm}
          renderBottom={
            <Email
              onClick={(_) => {
                isNotIe() && gtag("event", `client_email_needAPerm`, {});
              }}
              href={`mailto:${needAPermEmail}`}
            >
              Contact us
            </Email>
          }
        />
        <Card
          title="Need a temp?"
          body={needATemp}
          renderBottom={
            <Email
              onClick={(_) =>
                isNotIe() && gtag("event", `client_email_needATemp`, {})
              }
              href={`mailto:${needATempEmail}`}
            >
              Contact us
            </Email>
          }
        />
        <Card
          title="Need a VA?"
          body={needAVa}
          renderBottom={
            <Email
              onClick={(_) => {
                isNotIe() && gtag("event", `client_email_needAVA`, {});
              }}
              href={`mailto:${needAVaEmail}`}
            >
              Contact us
            </Email>
          }
        />
        <Card
          title="Need a contractor?"
          body={needAContractor}
          renderBottom={
            <Email
              onClick={(_) =>
                isNotIe() && gtag("event", `client_email_needAContractor`, {})
              }
              href={`mailto:${needAContractorEmail}`}
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
