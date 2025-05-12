import React from "react";
import { Route } from "react-router-dom";
import { route } from "../../routes";
import Helmet from "../../components/Helmet";

import JobList from "./JobList";
import JobView from "./JobView";

import { fetchJobs } from "../../reducer";
import { getCurrentJob } from "../../utils";
import { withRouter } from "react-router";
import { fetchServices } from "../../reducer";
import { toPostUrl } from "../../utils";

const getParam = (params, key) => {
  const p = params.get(key);
  if (!p || !p.length) return [];
  return p.split(",").filter((x) => x.length);
};

export default withRouter(({ job, jobs, dispatch }) => {
  React.useEffect(() => {
    if (!jobs.length) fetchJobs(dispatch);
  }, []);
  return (
    <React.Fragment>
      <Route
        exact
        path={route.jobs}
        render={({ location, history }) => {
          let params = new URLSearchParams(location.search);
          const defaultSalaryFilter = getParam(params, "salary");
          const defaultTypeFilter = getParam(params, "type");
          return (
            <JobList
              intro={job.intro}
              updateParams={(salary, type) => {
                history.replace({
                  pathname: location.pathname,
                  search: `salary=${salary}&type=${type}`,
                });
              }}
              defaultSalaryFilter={defaultSalaryFilter}
              defaultTypeFilter={defaultTypeFilter}
              jobs={jobs}
            />
          );
        }}
      />
      <Route
        path={`${route.jobs}/:id`}
        render={({ match: { params } }) => {
          if (!jobs.length) return null;
          const current = getCurrentJob(params.id, jobs);
          const descriptionMeta =
            current.job_description && current.job_description.length
              ? `${current.job_description.slice(0, 160)}...`
              : "";
          return (
            <React.Fragment>
              <Helmet title={current.job_title} description={descriptionMeta} />
              <JobView {...current} descriptionMeta={descriptionMeta} />
            </React.Fragment>
          );
        }}
      />
    </React.Fragment>
  );
});
