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
  background: ${palette.grey};
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

const Info = styled.div`
  display: grid;
  grid-gap: 4rem;
  grid-auto-flow: column;
  grid-template-columns: max-content auto;
  padding-top: 8rem;
  align-items: baseline;
  ${media.mobile`
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    padding-top: 3rem;
    grid-gap: 2rem;
  `};
`;

const Author = styled(Typography.Meta)`
  font-weight: 600;
`;

const AuthorInfo = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  grid-auto-columns: max-content;
  grid-auto-rows: min-content;
  > :last-child {
    margin-left: 2rem;
  }

  ${media.mobile`
    grid-auto-flow: row;
    > :last-child {
      margin-left: 0;
    }
  `};
`;

const Tabs = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  /* padding: 4rem;
  ${media.mobile`
    padding: 3rem;
    padding-bottom: 4rem;
  `}; */
`;

export default ({ push, type, options_candidate, options_client, value }) => {
  const options = type == Type.CLIENTS ? options_client : options_candidate;

  return (
    <React.Fragment>
      <Center cssOuter={cssOuter} cssInner={cssInner}>
        <Tabs>
          <Typography.Tab
            dark
            active={type == Type.CLIENTS}
            onClick={(_) =>
              push(
                `${route.services}/${Type.CLIENTS}/` +
                  toPostUrl({
                    title: options_client[0].label,
                  })
              )
            }
          >
            Clients
          </Typography.Tab>
          <Typography.Tab
            dark
            active={type == Type.CANDIDATES}
            onClick={(_) =>
              push(
                `${route.services}/${Type.CANDIDATES}/` +
                  toPostUrl({
                    title: options_candidate[0].label,
                  })
              )
            }
          >
            Candidates
          </Typography.Tab>
        </Tabs>
        <Select
          isMulti={false}
          value={value}
          options={options}
          onChange={(x) => {
            push(
              `${route.services}/${type}/` +
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
      <Links />
    </React.Fragment>
  );
};
