import React from 'react';
import { palette, Typography } from '../style';
import styled from 'styled-components';
import TickIcon from '../components/icons/Tick';

const PopupBanner = styled.div`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: ${palette.accent};
  color: ${palette.primary};
  padding: 1.5rem 4rem;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  font-size: 1.6rem;
  min-width: 420px;
  text-align: center;
  z-index: 9999;
`;


const Wrap = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  text-align: center;
  grid-gap: 4rem;
  padding-bottom: 9rem;
  padding-top: 5rem;
`;

const TickWrap = styled.div`
  border: 1px solid ${palette.accent};
  width: 7rem;
  height: 7rem;
  border-radius: 10rem;
  display: grid;
  justify-content: center;
  align-items: center;
  svg {
    width: 3rem;
    height: 3rem;
  }
`;

export default function OnSuccess({ title = "Application Submitted", message = "Thank you for your application!" }) {
  return (
    <Wrap>
      <PopupBanner>Thank you for your application</PopupBanner>
      <Typography.H2>{title}</Typography.H2>
      <Typography.H4>{message}</Typography.H4>
      <TickWrap>
        <TickIcon fill={palette.accent} />
      </TickWrap>
    </Wrap>
  );
}
