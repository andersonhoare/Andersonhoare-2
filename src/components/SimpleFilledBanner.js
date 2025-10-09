import React from 'react';
import styled from 'styled-components';
import { palette } from '../style';

const Banner = styled.div`
  background: ${palette.accent};
  color: ${palette.primary};
  text-align: center;
  padding: 1.5rem 0;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 6px;
  margin-bottom: 2rem;
`;

export default function SimpleFilledBanner() {
  return <Banner>This job has been filled</Banner>;
} 