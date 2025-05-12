import React from 'react';
import styled, { css } from 'styled-components';
import { Center, Typography, LinkCss, palette } from '../../style';
import { HeaderHalf } from '../../components/Header';
import RegisterCv from '../../forms/RegisterCv';
import { withRouter } from 'react-router-dom';

const cssOuter = css`
  background: ${palette.grey};
`;

const Link = styled.span`
  ${LinkCss};
  justify-self: end;
  display: table;
`;

const BackButton = withRouter(({ history }) => (
  <Link onClick={() => history.goBack()}> Back</Link>
));

export default () => {
  return (
    <Center cssOuter={cssOuter}>
      <HeaderHalf type="none" title="Register your CV">
        <BackButton />
      </HeaderHalf>
      <RegisterCv />
    </Center>
  );
};
