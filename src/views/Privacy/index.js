import React from 'react';
import { css } from 'styled-components';
import { Center, Typography, palette } from '../../style';
import Markdown from '../../components/Markdown';

const cssOuter = css`
  background: ${palette.grey};
  height: 100%;
`;

const cssInner = css`
  padding-top: 8rem;
  padding-bottom: 8rem;
  h1 {
    padding-bottom: 8rem;
  }
`;

export default ({ privacy }) => {
  return (
    <React.Fragment>
      <Center cssOuter={cssOuter} cssInner={cssInner}>
        <Typography.H1>Privacy policy</Typography.H1>
        <Markdown source={privacy.body} />
      </Center>
    </React.Fragment>
  );
};
