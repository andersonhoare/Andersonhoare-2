import React from "react";
import { HeroFull } from "../../components/Hero";
import Info from "./Info";
import Links from "./Links";
import { palette } from "../../style";

import Blogs from "./Blogs";
import AHInsider from "./AHInsider";

import { fetchImageContentful } from "../../utils";

export default ({ candidate }) => {
  const {
    heroImage,
    subtitle,
    permanentHowWeWork,
    temporaryHowWeWork,
    testimonials,
    tempGuidelines,
    blogs,
  } = candidate;

  let fixedTermHowWeWork = `
  There are numerous reasons why you might be looking to work as a fixed term contact
  assistant. On successfully registering with us you will be assigned your own consultant who
  will work with you closely to assess exactly what kind of contract role would suit you best
  and match you with a company that fits your skill set and specific requirements.
  `;
  let virtualHowWeWork = `
  Virtual assistants are becoming increasingly popular and we have a range of clients that
  require assistants to work both full and part-time but do not require them to be in their office.
  With the current technology a virtual role can be just as fulfilling as an office based one and
  provide you with the flexibility and freedom that your personal life may require.
  `;

  return (
    <React.Fragment>
      <HeroFull
        background={palette.secondary}
        spacer={palette.primary}
        title="Candidates"
        subtitle={subtitle}
        imageSrc={fetchImageContentful(heroImage.file.url, {
          size: 1425,
          quality: 75,
        })}
      />
      <AHInsider />
      <Info
        virtualHowWeWork={virtualHowWeWork}
        fixedTermHowWeWork={fixedTermHowWeWork}
        temporaryHowWeWork={temporaryHowWeWork}
        permanentHowWeWork={permanentHowWeWork}
        tempGuidelines={tempGuidelines}
        testimonials={testimonials}
      />
      {blogs.length ? <Blogs blogs={blogs} /> : null}
      <Links />
    </React.Fragment>
  );
};
