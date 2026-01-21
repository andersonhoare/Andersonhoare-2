import 'dotenv/config';
import "promise-polyfill/src/polyfill";
import "url-search-params-polyfill";

import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { media, GlobalStyle } from "./style";
import styled from "styled-components";
import Routes from "./routes";
import { reducer, initialState, fetchContent, fetchServices, fetchJobs, fetchBlogs } from "./reducer"; 
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

window.gtag = window.gtag || console.log;

const Main = styled.main`
  padding-top: 12rem;
  display: block;
  position: relative;
  ${media.mobile` padding-top: 10rem; `};
`;

const Root = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    // --- NON-BLOCKING LOAD: Prevents 502/504 Timeouts ---
    const loadData = () => {
       fetchContent(dispatch);
       fetchServices(dispatch);
       fetchJobs(dispatch);
       fetchBlogs(dispatch);
    };

    loadData();
  }, []);

  return (
    <React.Fragment>
      <GlobalStyle />
      <BrowserRouter>
        <React.Fragment>
          <Banner />
          <Nav />
          <Main>
            <Routes
              {...state}
              dispatch={dispatch}
            />
          </Main>
          <Footer {...state.content.contact} />
        </React.Fragment>
      </BrowserRouter>
    </React.Fragment>
  );
};

const rootElement = document.getElementById("app");

if (rootElement.hasChildNodes()) {
  hydrate(<Root />, rootElement);
} else {
  render(<Root />, rootElement);
}
