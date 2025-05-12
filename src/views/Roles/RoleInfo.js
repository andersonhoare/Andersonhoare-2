import React from "react";
import styled, { css } from "styled-components";
import Helmet from "../../components/Helmet";
import { HeaderFullFlex } from "../../components/Header";
import { Tags } from "../../components/Blog";
import Markdown from "../../components/Markdown";
import { toPostUrl, fetchImageContentful, formatDateTime } from "../../utils";
import {
  Center,
  Typography,
  BodyCss,
  LinkCss,
  palette,
  media,
  sizes,
} from "../../style";
import { route } from "../../routes";
import Links from "./Links";
import Select from "../../components/Select";
import { withRouter } from "react-router-dom";

export const Type = {
  CANDIDATES: "candidates",
  CLIENTS: "clients",
};

const cssOuter = css`
  /* background: ${palette.grey}; */
`;

const cssInner = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  padding: 4rem 3rem;

  align-items: baseline;

  ${media.mobile`
    grid-template-columns: 1fr;
    padding: 0;
    grid-gap: 0;
  `};
`;

const Title = styled(Typography.Tab)`
  cursor: initial;
`;

export default ({ push, options, value }) => {
  return (
    <React.Fragment>
      <Center cssOuter={cssOuter} cssInner={cssInner}>
        <Title dark active={true}>
          Candidates
        </Title>
        <Select
          isMulti={false}
          value={value}
          options={options}
          onChange={(x) => {
            push(
              `${route.roles}/` +
                toPostUrl({
                  title: x.label,
                })
            );
          }}
        />
      </Center>
      <Center>
        <HeaderFullFlex type="none" title={value.label}>
          <Markdown source={value.value} />
        </HeaderFullFlex>
      </Center>
    </React.Fragment>
  );
};
