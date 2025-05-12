import React from "react";
import { Center, media, palette } from "../../style";
import { HeroFull } from "../../components/Hero";
import { HeaderHalf, HeaderEmpty } from "../../components/Header";
import Markdown from "../../components/Markdown";
import styled, { css } from "styled-components";

import Course from "./Course";
import Links from "./Links";
import { fetchImageContentful } from "../../utils";

const HeroFullWrap = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  height: 70rem;

  img {
    height: 60rem;
  }

  ${media.mobile`
    grid-template-columns: 1fr;
    height: auto;
    padding-bottom: 2rem;
    grid-gap: 2rem;
  `};
`;

export default ({ yourPotential }) => {
  const {
    heroImage,
    courseImage,
    courseInfo,
    subtitle,
    stepsToWork,
    unlockCode,
    careerCoaching,
    rightForMe,
  } = yourPotential;

  return (
    <React.Fragment>
      <HeroFull
        Container={HeroFullWrap}
        background={palette.grey}
        spacer={palette.primary}
        title="Maximise your potential"
        subtitle={subtitle}
        imageSrc={fetchImageContentful(heroImage.file.url, {
          size: 1425,
          quality: 75,
        })}
      />
      <Course
        unlockCode={unlockCode}
        courseInfo={courseInfo}
        courseImage={courseImage}
      />
      <Center
        cssOuter={css`
          background: ${palette.secondary};
          padding: 10rem 0;
        `}
      >
        <HeaderHalf title="What is 5 Steps to Work? ">
          <Markdown source={stepsToWork} />
        </HeaderHalf>

        <HeaderHalf title="Is this course right for me?">
          <Markdown source={rightForMe} />
        </HeaderHalf>
      </Center>
      <Center
        cssOuter={css`
          background: ${palette.grey};
          padding: 10rem 0;
        `}
      >
        <HeaderHalf title="Enhanced, one-on-one career coaching.">
          <Markdown source={careerCoaching} />
        </HeaderHalf>
      </Center>

      <Links />
    </React.Fragment>
  );
};
