import React from "react";
import Hero from "../Home/Hero";
import Instagram from "../Home/Instagram";
import SlideShow from "../Home/SlideShow";
import LatestBlogs from "../Home/LatestBlogs";
import Services from "../Home/Services";
import ClientsCandidates from "../Home/ClientsCandidates";
import PrivateJobs from "./PrivateJobs";

import { fetchContent, fetchInstagram } from "../../reducer";
import video_local from "../../assets/vid_private.mp4";
import video_cover from "../../assets/video_cover_private.jpg";
import styled, { css } from "styled-components";
import { palette, media } from "../../style";

const SpacerWhite = styled.div`
  background: white;
  height: ${(props) => props.height}rem;
  ${media.mobile`
    height: ${(props) => props.height}rem;
  `};
`;

export default ({
  dispatch,
  private: _private,
  home,
  services,
  instagrams,
}) => {
  const {
    title,
    titleSecondary,
    clients,
    candidates,
    jobs = [],
    testimonials = [],
    info,
    heroImage,
    companyQuote,
  } = _private;

  const { subtitle, blogs } = home;

  React.useEffect(async () => {
    if (!home) {
      await fetchContent(dispatch);
      await fetchInstagram(dispatch);
    }
  }, []);

  const filteredTestimonials = Array.isArray(testimonials)
    ? testimonials.filter(t => t && t.name && t.description && t.body)
    : testimonials;

  return (
    <React.Fragment>
      <SlideShow items={filteredTestimonials} heroImage={heroImage} />
      <Hero
        smallIntro
        video={video_local}
        cover={video_cover}
        title={titleSecondary}
      />
      <SpacerWhite height={26} />

      <ClientsCandidates clients={clients} candidates={candidates} />
      <PrivateJobs info={info} />
      <LatestBlogs blogIntro={subtitle} blogs={blogs} />
      <SpacerWhite height={10} />
      <Services services={services} />
      <Instagram instagrams={instagrams} />
    </React.Fragment>
  );
};
