import React from "react";
import Hero from "./Hero";
import Instagram from "./Instagram";
import SlideShow from "./SlideShow";
import LatestBlogs from "./LatestBlogs";
import ClientsCandidates from "./ClientsCandidates";
import Services from "./Services";
import SearchJobs from "./SearchJobs";
import NYBanner from "./NYBanner";
import video_local from "../../assets/vid.mp4";
import video_cover from "../../assets/video_cover.png";
import styled, { css } from "styled-components";
import { palette, media } from "../../style";

import { pipe, transpose, flatten } from "ramda";

const shuffle = pipe(transpose, flatten);

const Spacer = styled.div`
  background: ${palette.grey};
  height: 16rem;
  ${media.mobile`
    height: 16rem;
  `};
`;

const SpacerWhite = styled.div`
  background: white;
  height: 16rem;
  ${media.mobile`
    height: 16rem;
  `};
`;

export default ({ home, services, instagrams }) => {
  const {
    title,
    titleSecondary,
    subtitle,
    clients,
    candidates,
    jobs = [],
    testimonials = [],
    companyQuote,
    blogs,
    heroImage,
  } = home;
  const items = shuffle([jobs, testimonials]);

  return (
    <React.Fragment>
      <SlideShow items={items} heroImage={heroImage} />
      <NYBanner />
      <Hero
        smallIntro
        video={video_local}
        cover={video_cover}
        title={titleSecondary}
      />
      <Spacer />
      <Services services={services} />
      <SpacerWhite />
      <ClientsCandidates clients={clients} candidates={candidates} />
      <SearchJobs />
      <LatestBlogs blogIntro={subtitle} blogs={blogs} />
      <Instagram instagrams={instagrams} />
    </React.Fragment>
  );
};
