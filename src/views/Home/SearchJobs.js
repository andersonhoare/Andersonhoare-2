import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { ButtonPrimary } from "../../components/Button";
import { LinkCss, Center, palette, media, Typography } from "../../style";
import { useJobFilter } from "../../hooks";
import { Controls } from "../../components/JobFilter";
import { route } from "../../routes";

const cssOuter = css`
  background: ${palette.grey};
`;

const cssInner = css`
  display: grid;
  grid-gap: 4rem;
  padding: 10rem 3rem;
  margin-bottom: 16rem;
  text-align: center;
  a {
    justify-self: center;
  }
  ${media.mobile`
    padding: 6rem 3rem;
    margin-bottom: 6rem;
  `};
`;

const Email = styled.a`
  ${LinkCss}
  margin-left: 0.6rem;
`;

const Search = styled.div`
  display: grid;
  grid-gap: 4rem;
  /* grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 11rem;
  align-items: baseline;
  ${media.mobile`
    grid-template-columns: 1fr;
    grid-gap: 4rem;
    a {
      justify-self: flex-end;
    }
  `}; */
`;

export default () => {
  return (
    <Center cssOuter={cssOuter} cssInner={cssInner}>
      <Typography.H2> Join AH Insider </Typography.H2>
      <Search>
        <Typography.Body>
          AH Insider is our exclusive assistant community where we share our
          live jobs, brand affiliations, assistant advice and support and
          upcoming events. To request to join please email
          <Email href={`mailto:${"enquiries@andersonhoare.co.uk"}`}>
            enquiries@andersonhoare.co.uk
          </Email>
        </Typography.Body>
        <ButtonPrimary
          as={"a"}
          target="_blank"
          href={"https://www.linkedin.com/groups/12235255/"}
        >
          AH Insider
        </ButtonPrimary>
        {/* <Controls
          filterType={filterType}
          filterSalary={filterSalary}
          setFilterType={setFilterType}
          setFilterSalary={setFilterSalary}
          optionsType={optionsType}
          optionsSalary={optionsSalary}
        />*/}
      </Search>
    </Center>
  );
};
