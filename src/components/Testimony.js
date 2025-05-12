import React from 'react';
import { Center, palette, QuoteMark, Typography } from '../style';
import styled, { css } from 'styled-components';
import QuoteMarkIcon from './icons/QuoteMark';

const Testomony = styled.div`
  display: grid;
  grid-gap: 3rem;
`;

export default ({ light, name, description, body }) => {
  if (!body || !name || !description) return null;
  return (
    <Testomony>
      <QuoteMarkIcon fill={palette.secondary} />
      <Typography.Quote light>{body}</Typography.Quote>
      <Typography.Meta light>
        {name} – {description}
      </Typography.Meta>
    </Testomony>
  );
};
