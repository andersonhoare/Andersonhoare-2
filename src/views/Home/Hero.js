import React from "react";
import styled, { css } from "styled-components";
import Video from "../../components/Video";
import { Alternative as MarkdownAlternative } from "../../components/Markdown";
import { Center, palette, media, sizes, Typography } from "../../style";

const cssOuter = css`
  background: ${palette.primary};
`;

const cssInner = css``;

const Intro = styled(Typography.H3)`
  padding: 10rem 0;
  white-space: pre-wrap;
  ${({ smallIntro }) => smallIntro && `font-size: 21px`};

  ${media.mobile`
  padding: 4rem 0;
  max-width: 100%;
  `};
`;

const Mover = styled.div`
  position: relative;
  top: 12rem;
  margin-top: -12rem;
`;

export default class extends React.Component {
  render() {
    const { smallIntro, title, video, cover } = this.props;
    return (
      <Center cssOuter={cssOuter} cssInner={cssInner}>
        <Intro smallIntro={smallIntro} as="h1">
          <MarkdownAlternative source={title} />
        </Intro>
        <Mover>
          <Video src={video} poster={cover} />
        </Mover>
      </Center>
    );
  }
}
