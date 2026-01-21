import 'dotenv/config';
// import '@babel/polyfill';

import "promise-polyfill/src/polyfill";
import "url-search-params-polyfill";

import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { media, GlobalStyle } from "./style";
import styled from "styled-components";
import Routes from "./routes";
import { reducer, initialState, fetchContent, fetchServices, fetchJobs, fetchBlogs } from "./reducer"; // Ensure all are imported
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
    // --- FIX: The async function must be INSIDE the effect ---
    const loadData = async () => {
      try {
        await fetchContent(dispatch);
        await fetchServices(dispatch);
        await fetchJobs(dispatch);
        await fetchBlogs(dispatch);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    // --- Execute it immediately ---
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
