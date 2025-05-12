import React from "react";
import styled, { css } from "styled-components";
import { Center, palette, media, Typography } from "../../style";
import { Controls } from "../../components/JobFilter";
import Markdown from "../../components/Markdown";
import { useJobFilter } from "../../hooks";

import JobListItem from "./JobListItem";
import Links from "./Links";

const cssOuterSearch = css`
  background: ${palette.grey};
`;

const cssInnerSearch = css`
  display: grid;
  grid-gap: 4rem;
  padding: 8rem 3rem;
  margin-bottom: 6rem;
  ${media.mobile`
    padding: 4rem 3rem;
    padding-bottom: 6rem;
    margin-bottom: 4rem;
  `};
`;

const cssOuterList = css`
  background: "white";
`;

const cssInnerList = css``;

const JobList = styled.ul`
  display: grid;
  grid-auto-rows: min-content;
  padding-bottom: 10rem;
  ${media.mobile`
    padding-bottom: 6rem;
  `};
`;

const Search = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 11rem;
  align-items: baseline; */
  padding-bottom: 5rem;
  > div {
    display: inline-block;
    width: 33%;
  }
  > div:first-child {
    margin-right: 11rem;
  }
  ${media.mobile`
  > div {
    width: 100%;
  }
  > div:first-child {
    margin-right: 0;
    margin-bottom: 4rem;
  }
  `};
`;

const NoResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0 8rem 4rem;
  ${media.mobile`
    padding: 0rem 0 5rem 0rem;  
  `};
`;

const Md = styled.div`
  > div {
    margin-bottom: 0;
  }
`;

const sortByDate = (a, b) => {
  try {
    return new Date(b.createdAt) - new Date(a.createdAt);
  } catch (e) {
    return 0;
  }
};

export default ({
  intro,
  jobs,
  updateParams,
  defaultSalaryFilter,
  defaultTypeFilter,
}) => {
  const {
    filteredJobs,
    optionsSalary,
    optionsType,
    filterSalary,
    filterType,
    setFilterSalary,
    setFilterType,
  } = useJobFilter({ jobs, defaultSalaryFilter, defaultTypeFilter });

  React.useEffect(() => {
    updateParams(
      filterSalary ? filterSalary.value : null,
      filterType ? filterType.value : null
    );
  }, [filterSalary, filterType]);

  return (
    <React.Fragment>
      <Center cssOuter={cssOuterSearch} cssInner={cssInnerSearch}>
        <Typography.H1> Live jobs </Typography.H1>
        <Markdown as={Md} source={intro} />
      </Center>
      <Center cssOuter={cssOuterList} cssInner={cssInnerList}>
        <Search>
          <Controls
            filterType={filterType}
            filterSalary={filterSalary}
            setFilterType={setFilterType}
            setFilterSalary={setFilterSalary}
            optionsType={optionsType}
            optionsSalary={optionsSalary}
          />
        </Search>
        {!filteredJobs.length ? (
          <NoResults>
            <Typography.Input>
              No job posts found that match your filter
            </Typography.Input>
          </NoResults>
        ) : (
          <JobList>{filteredJobs.sort(sortByDate).map(JobListItem)}</JobList>
        )}
      </Center>
      <Links />
    </React.Fragment>
  );
};
