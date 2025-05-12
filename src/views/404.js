import React from 'react';
import styled from 'styled-components';
import { Typography, palette, Center } from '../style';

const Wrap = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  text-align: center;
  grid-gap: 4rem;
  padding-bottom: 9rem;
  padding-top: 9rem;
`;

export default class extends React.Component {
  render() {
    return (
      <Center>
        <Wrap>
          <Typography.H2>404</Typography.H2>
          <Typography.H4>Looks like something went wrong!</Typography.H4>
        </Wrap>
      </Center>
    );
  }
}
