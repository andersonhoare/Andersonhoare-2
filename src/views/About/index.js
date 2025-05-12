import React from "react";
import Hero from "./Hero";
import Team from "./Team";
import Testimonials from "./Testimonials";
import AboutUs from "./AboutUs";
import Links from "./Links";

export default ({ about }) => {
  const { footer, heroImage, team, testimonials, title } = about;
  return (
    <React.Fragment>
      <Hero title={title} heroImage={heroImage} />
      <Team team={team} />
      <Testimonials testimonials={testimonials} />
      {/* <AboutUs footer={footer} /> */}
      <Links />
    </React.Fragment>
  );
};
