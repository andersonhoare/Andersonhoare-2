import React from "react";
import styled, { css } from "styled-components";
import Testimony from "../../components/Testimony";
import MarkdownAlternative from "../../components/Markdown";
import { Center, palette, media, sizes, Typography } from "../../style";
import { toPostUrl } from "../../utils";
import { route } from "../../routes";

const cssOuter = css`
  background: ${palette.grey};
  padding-top: 8rem;
  padding-bottom: 14rem;
`;

const cssInner = css`
  * {
    color: ${palette.primary};
    fill: ${palette.primary};
    justify-self: center;
  }
  display: grid;
  grid-gap: 5rem;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Links = styled.div`
  display: grid;
  justify-self: center;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 4rem;
  white-space: nowrap;

  ${media.desktop`
    grid-template-columns: repeat(3, 1fr);
  `};

  ${media.mobile`
    white-space: normal;
    grid-template-columns: repeat(2, 1fr);
  `};
`;

export default class extends React.Component {
  render() {
    const { services } = this.props;
    return (
      <Center cssOuter={cssOuter} cssInner={cssInner}>
        <Typography.H2>Services we offer</Typography.H2>
        <Links>
          {services.map(({ title }) => (
            <Typography.Link
              to={`${route.services}/${toPostUrl({
                title: title,
              })}`}
            >
              {title}
            </Typography.Link>
          ))}
        </Links>
      </Center>
    );
  }
}
