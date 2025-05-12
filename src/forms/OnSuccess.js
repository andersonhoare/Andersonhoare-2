import React from 'react';
import { palette, media, Typography } from '../style';
import styled from 'styled-components';
import TickIcon from '../components/icons/Tick';

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
  width: min-content;
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

export default ({ title, message }) => {
  return (
    <Wrap>
      <Typography.H2>{title}</Typography.H2>
      <Typography.H4>{message}</Typography.H4>
      <TickWrap>
        <TickIcon fill={palette.accent} />
      </TickWrap>
    </Wrap>
  );
};
