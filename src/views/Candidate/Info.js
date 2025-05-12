import React from "react";

import { Typography, Center, LinkCss, palette, media } from "../../style";
import { HeaderHalf, HeaderEmpty } from "../../components/Header";
import styled, { css } from "styled-components";
import Testimony from "../../components/Testimony";
import DownloadIcon from "../../components/icons/Download";

const cssOuter = css`
  background: ${palette.primary};
  color: ${palette.secondary};
`;

const cssInner = css`
  display: grid;
  grid-auto-flow: column;
  padding-bottom: 6rem;
  ${media.mobile`
    grid-auto-flow: row
    grid-gap: 4rem;
    padding: 6rem 3rem 4rem 3rem;
  `};
`;

const LinkWrap = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 3rem;
`;

const Body = styled.p`
  margin-bottom: 2rem;
`;
const Download = styled.a`
  ${LinkCss}
`;

export default ({
  virtualHowWeWork,
  fixedTermHowWeWork,
  temporaryHowWeWork,
  permanentHowWeWork,
  tempGuidelines,
  testimonials,
}) => {
  const [tab, setTab] = React.useState(0);

  const data = [
    {
      title: "Permanent Roles",
      intro: (
        <Typography.Body light as={Body}>
          {permanentHowWeWork}
        </Typography.Body>
      ),
    },
    {
      title: "Temporary Roles",
      intro: (
        <React.Fragment>
          <Typography.Body light as={Body}>
            {temporaryHowWeWork}
          </Typography.Body>
          <LinkWrap>
            <Download
              href={`https:${tempGuidelines.file.url}`}
              light
              download
              target="_blank"
            >
              Download guidelines
            </Download>
          </LinkWrap>
        </React.Fragment>
      ),
    },
    {
      title: "Fixed Term Contracts",
      intro: (
        <Typography.Body light as={Body}>
          {fixedTermHowWeWork}
        </Typography.Body>
      ),
    },
    {
      title: "Virtual Roles",
      intro: (
        <Typography.Body light as={Body}>
          {virtualHowWeWork}
        </Typography.Body>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Center cssOuter={cssOuter} cssInner={cssInner}>
        {data.map(({ title }, index) => (
          <Typography.Tab active={tab == index} onClick={() => setTab(index)}>
            {title}
          </Typography.Tab>
        ))}
      </Center>

      <Center cssOuter={cssOuter}>
        <HeaderHalf type="dark" title="How we work">
          {data[tab].intro}
        </HeaderHalf>
        <HeaderEmpty type="dark">
          {testimonials && testimonials.length
            ? testimonials
                .filter(t => t.name && t.description && t.body)
                .map(({ name, description, body }, key) => (
                  <Testimony
                    key={key}
                    name={name}
                    description={description}
                    body={body}
                  />
                ))
            : null}
        </HeaderEmpty>
      </Center>
    </React.Fragment>
  );
};
