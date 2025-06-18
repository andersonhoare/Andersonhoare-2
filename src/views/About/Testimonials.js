import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Center, palette } from '../../style';
import { useGallery } from '../../hooks';
import pose from 'react-pose';

import Slider from '../../components/Slider';

const cssOuter = css`
  background: ${palette.grey};
`;

const AboutSliderWrap = styled.div`
  & > .slider {
    grid-template-columns: 0.3fr 2fr 0.5fr !important;
  }
`;

export default ({ testimonials }) => {
  return (
    <Center cssOuter={cssOuter} tagInner="ul">
      <AboutSliderWrap>
        <Slider items={testimonials} noDots />
      </AboutSliderWrap>
    </Center>
  );
};
