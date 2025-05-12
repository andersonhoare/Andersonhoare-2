import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Helmet from "./components/Helmet";

import Home from "./views/Home";
import About from "./views/About";
import Client from "./views/Client";
import Candidate from "./views/Candidate";
import Job from "./views/Job";
import Services from "./views/Services";
import Blog from "./views/Blog";
import College from "./views/College";
import Contact from "./views/Contact";
import Register from "./views/Register";
import Privacy from "./views/Privacy";
import PrivatePA from "./views/PrivatePA";
import Roles from "./views/Roles";
import Apply from "./views/Apply";
import YourPotential from "./views/YourPotential";

import FourOhFour from "./views/404";

export const route = {
  home: "/",
  about: "/about",
  clients: "/clients",
  candidates: "/candidates",
  colleges: "/colleges",
  jobs: "/jobs",
  services: "/services",
  roles: "/roles",
  yourPotential: "/your-potential",
  blog: "/blog",
  register: "/register",
  apply: "/apply",
  private: "/private",
  contact: "/contact",
  privacy: "/privacy",
};

const ScrollToTop = withRouter(({ location, children }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return children;
});

export default ({
  servicesClient,
  servicesCandidate,
  content,
  instagrams,
  blogs,
  jobs,
  roles,
  dispatch,
}) => (
  <ScrollToTop>
    <Switch>
      <Route
        exact
        path={route.home}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.home.metaTitle}
              description={content.home.metaDescription}
            />
            <Home
              home={content.home}
              services={servicesClient}
              instagrams={instagrams}
            />
          </React.Fragment>
        )}
      />
      <Route
        exact
        path={route.about}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.about.metaTitle}
              description={content.about.metaDescription}
            />
            <About about={content.about} />
          </React.Fragment>
        )}
      />
      <Route
        exact
        path={route.clients}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.client.metaTitle}
              description={content.client.metaDescription}
            />
            <Client client={content.client} services={servicesClient} />
          </React.Fragment>
        )}
      />
      <Route
        exact
        path={route.candidates}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.candidate.metaTitle}
              description={content.candidate.metaDescription}
            />
            <Candidate candidate={content.candidate} />
          </React.Fragment>
        )}
      />
      <Route
        path={route.jobs}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.job.metaTitle}
              description={content.job.metaDescription}
            />
            <Job dispatch={dispatch} jobs={jobs} job={content.job} />
          </React.Fragment>
        )}
      />
      <Route
        path={route.blog}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.blog.metaTitle}
              description={content.blog.metaDescription}
            />
            <Blog blog={content.blog} dispatch={dispatch} blogs={blogs} />
          </React.Fragment>
        )}
      />
      <Route
        path={route.colleges}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.college.metaTitle}
              description={content.college.metaDescription}
            />
            <College college={content.college} />
          </React.Fragment>
        )}
      />
      <Route
        path={route.register}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.job.metaTitle}
              description={content.job.metaDescription}
            />
            <Register />
          </React.Fragment>
        )}
      />
      <Route
        path={route.services}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.role.metaTitle}
              description={content.role.metaDescription}
            />
            <Services
              servicesClient={servicesClient}
              servicesCandidate={servicesCandidate}
              content={content.role}
              // role={content.role}
              dispatch={dispatch}
            />
          </React.Fragment>
        )}
      />
      <Route
        path={route.apply}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.job.metaTitle}
              description={content.job.metaDescription}
            />
            <Apply dispatch={dispatch} jobs={jobs} />
          </React.Fragment>
        )}
      />
      <Route
        path={route.roles}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.job.metaTitle}
              description={content.job.metaDescription}
            />
            <Roles servicesCandidate={servicesCandidate} dispatch={dispatch} />
          </React.Fragment>
        )}
      />
      <Route
        exact
        path={route.contact}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.contact.metaTitle}
              description={content.contact.metaDescription}
            />
            <Contact contact={content.contact} />
          </React.Fragment>
        )}
      />
      <Route
        exact
        path={route.private}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.private.metaTitle}
              description={content.private.metaDescription}
            />
            <PrivatePA
              dispatch={dispatch}
              home={content.home}
              private={content.private}
              services={servicesClient}
              instagrams={instagrams}
            />
          </React.Fragment>
        )}
      />
      <Route
        exact
        path={route.privacy}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.privacy.metaTitle}
              description={content.privacy.metaDescription}
            />
            <Privacy privacy={content.privacy} />
          </React.Fragment>
        )}
      />

      <Route
        path={route.yourPotential}
        render={() => (
          <React.Fragment>
            <Helmet
              title={content.yourPotential.metaTitle}
              description={content.yourPotential.metaDescription}
            />
            <YourPotential yourPotential={content.yourPotential} />
          </React.Fragment>
        )}
      />
      <Redirect from="*" to={route.home} />
    </Switch>
  </ScrollToTop>
);
