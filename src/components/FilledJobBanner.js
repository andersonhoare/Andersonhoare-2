import React from 'react';
import styled from 'styled-components';
import { palette, Typography } from '../style';

const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(29, 59, 62, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 4px;
`;

const BannerContent = styled.div`
  background: ${palette.accent};
  color: ${palette.primary};
  padding: 1.5rem 3rem;
  border-radius: 8px;
  text-align: center;
  transform: rotate(-3deg);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border: 3px solid ${palette.primary};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: ${palette.primary};
    border-radius: 8px;
    z-index: -1;
  }
`;

const BannerText = styled(Typography.H4)`
  margin: 0;
  color: ${palette.primary};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const FilledJobBanner = () => {
  return (
    <BannerOverlay>
      <BannerContent>
        <BannerText>
          Position Filled
        </BannerText>
      </BannerContent>
    </BannerOverlay>
  );
};

export default FilledJobBanner; 