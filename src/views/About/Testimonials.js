import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Center, palette } from '../../style';
import { useGallery } from '../../hooks';
import pose from 'react-pose';

import Slider from '../../components/Slider';

const cssOuter = css`
  background: ${palette.grey};
`;

export default ({ testimonials }) => {
  return (
    <Center cssOuter={cssOuter} tagInner="ul">
      <Slider items={testimonials} noDots />
    </Center>
  );
};
