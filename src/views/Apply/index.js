import React from "react";
import styled, { css } from "styled-components";
import { Center, Typography, LinkCss, palette } from "../../style";
import { HeaderHalf } from "../../components/Header";
import ApplyForJob from "../../forms/ApplyForJob";
import ApplyBroadbean from "../../forms/ApplyBroadbean";
import { withRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { getCurrentJob } from "../../utils";
import { route } from "../../routes";
import { fetchJobs } from "../../reducer";

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

export default ({ jobs, dispatch }) => {
  React.useEffect(() => {
    if (!jobs.length) fetchJobs(dispatch);
  }, []);

  return (
    <Center cssOuter={cssOuter}>
      <Route
        path={`${route.apply}/:id`}
        component={({ match: { params } }) => {
          let currentJob = getCurrentJob(params.id, jobs);
          console.log(currentJob);
          return (
            <React.Fragment>
              <HeaderHalf
                type="none"
                title={"Apply to " + currentJob.job_title}
              >
                <BackButton />
              </HeaderHalf>
              {currentJob.application_email ? (
                <ApplyBroadbean {...currentJob} />
              ) : (
                <ApplyForJob {...currentJob} />
              )}
            </React.Fragment>
          );
        }}
      />
    </Center>
  );
};
