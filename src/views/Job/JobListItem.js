import React from "react";
import styled, { css } from "styled-components";
import {
  Center,
  palette,
  media,
  Typography,
  borderColorPrimary,
} from "../../style";
import { toPostUrl, formatSalary, truncate } from "../../utils";
import { route } from "../../routes";
import FilledJobBanner from "../../components/FilledJobBanner";
import SimpleFilledBanner from "../../components/SimpleFilledBanner";

const SmallBannerWrapper = styled.div`
  max-width: 180px;
  width: 100%;
  margin: 1rem 0;
`;

const Job = styled.li`
  border-bottom: 1px solid ${borderColorPrimary};
  padding: 3rem 0rem;
  display: grid;
  position: relative;

  grid-template:
    "start list end" auto
    / 4fr 2fr 2fr;

  grid-gap: 3rem;

  ${media.ie`

    > div {
      display: inline-block;
      margin-right: 3rem;
      width: 30%;
      vertical-align: top;
      > div:last-child {
        margin: 0;
        }
    }
  `};

  ${media.mobile`
  grid-template:
    'start start' auto
    'list end' auto
    / 1fr 1fr;

    padding: 0;
    padding-bottom: 4rem;
    margin-bottom: 2rem;
  `};
`;

const Start = styled.div`
  grid-area: start;
  > h4 {
    padding-bottom: 1rem;
    font-size: 25px;
  }
`;

const List = styled.div`
  grid-area: list;
  display: grid;
  grid-auto-rows: min-content;

  ${media.ie`

    > span  {
      display: block;
    }
  `};
`;

const End = styled.div`
  grid-area: end;
  > a {
    width: max-content;
  }

  > div {
    display: grid;
    grid-auto-flow: row;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BodySmall = styled(Typography.Body)`
  font-size: 1.4rem;
`;

export default (
  {
    id,
    createdAt,
    job_reference,
    job_title,
    job_type,
    job_start,
    job_startdate,
    job_duration,
    job_industry,
    salary_from,
    salary_to,
    salary_per,
    salary_benefits,
    job_skills,
    job_location,
    job_description,
  },
  key
) => {
  const salary = formatSalary(salary_from, salary_to, salary_per);

  // Check if job is older than 2 months
  const isOlderThan2Months = (() => {
    if (!createdAt) return false;
    const jobDate = new Date(createdAt);
    const now = new Date();
    const diffMonths =
      (now.getFullYear() - jobDate.getFullYear()) * 12 +
      (now.getMonth() - jobDate.getMonth());
    return diffMonths >= 2;
  })();

  const isFilled =
    (job_startdate || job_start) === "Already Filled" || isOlderThan2Months;

  return (
    <Job key={key}>
      <Start>
        <Typography.H4>{job_title}</Typography.H4>
        <BodySmall>{truncate(job_description, 165)}</BodySmall>
      </Start>
      <List>
        <Typography.Meta>{job_location}</Typography.Meta>
        <Typography.Meta>{"In the region of:"}</Typography.Meta>
        <Typography.Meta>{salary}</Typography.Meta>
        <Typography.Meta>{job_type}</Typography.Meta>
      </List>
      <End>
        {isFilled ? (
          <SmallBannerWrapper>
            <SimpleFilledBanner />
          </SmallBannerWrapper>
        ) : (
          <List>
            <Typography.Meta>Job starts:</Typography.Meta>
            <Typography.Meta>{job_startdate || job_start}</Typography.Meta>
          </List>
        )}
        <Typography.Link
          to={`${route.jobs}/${toPostUrl({
            title: job_title,
            createdAt,
            job_reference,
          })}`}
        >
          Job details
        </Typography.Link>
      </End>
    </Job>
  );
};
