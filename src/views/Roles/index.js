import React from "react";
import { Route } from "react-router-dom";
import { route } from "../../routes";

import RoleList from "./RoleList";

import { withRouter } from "react-router";
import { fetchServices } from "../../reducer";
import { toPostUrl } from "../../utils";

export default withRouter(({ history, servicesCandidate, dispatch }) => {
  React.useEffect(() => {
    if (!servicesCandidate.length) {
      fetchServices(dispatch);
    } else if (history.location.pathname == route.roles) {
      const service = servicesCandidate[0];
      history.push(
        `${route.roles}/` +
          toPostUrl({
            title: service.title,
          })
      );
    }
  }, [servicesCandidate.length, history.location.pathname == route.roles]);

  return (
    <React.Fragment>
      <Route
        exact
        path={`${route.roles}/:service`}
        render={({ match: { params }, location, history }) => {
          return (
            <RoleList
              params={params}
              history={history}
              services={servicesCandidate}
            />
          );
        }}
      />
    </React.Fragment>
  );
});
