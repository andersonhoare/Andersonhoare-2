import React from "react";
import { Route } from "react-router-dom";
import { fetchServices } from "../../reducer";
import { route } from "../../routes";
import { toPostUrl, getCurrentRole } from "../../utils";
import { withRouter } from "react-router";
import ServiceList from "./ServiceList";

export default withRouter(({ content, history, servicesClient, dispatch }) => {
  React.useEffect(() => {
    if (!servicesClient.length) {
      fetchServices(dispatch);
    }
  }, [servicesClient.length]);

  return (
    <React.Fragment>
      <Route
        path={`${route.services}/:service`}
        component={({ match: { params } }) => {
          return (
            <ServiceList
              params={params.service}
              image={content.hero}
              intro={content.intro}
              services={servicesClient}
            />
          );
        }}
      />
      <Route
        exact
        path={`${route.services}`}
        component={({ match: { params } }) => {
          return (
            <ServiceList
              image={content.hero}
              intro={content.intro}
              services={servicesClient}
            />
          );
        }}
      />
    </React.Fragment>
  );
});
