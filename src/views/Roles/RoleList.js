import React from "react";
import styled, { css } from "styled-components";
import { Center, palette, media, Typography } from "../../style";
import Markdown from "../../components/Markdown";
import RoleInfo from "./RoleInfo";
import { toPostUrl } from "../../utils";

import Links from "./Links";

const cssOuterSearch = css`
  background: ${palette.grey};
`;

const cssInnerSearch = css`
  display: grid;
  grid-gap: 4rem;
  padding: 8rem 3rem;
  ${media.mobile`
    padding: 4rem 3rem;
    padding-bottom: 6rem;
  `};
`;

const Md = styled.div`
  > div {
    margin-bottom: 0;
  }
`;

export default ({ params, services, history }) => {
  const toValue = (x) => ({
    value: x.body,
    label: x.title,
  });

  const getCurrentRole = (title_, xs) =>
    xs.find(({ label }) => toPostUrl({ title: label }) === title_) || {};

  let options = services.map(toValue);
  let value = getCurrentRole(params.service, options);

  return (
    <React.Fragment>
      <Center>
        <RoleInfo push={history.push} options={options} value={value} />
      </Center>
      <Links />
    </React.Fragment>
  );
};
