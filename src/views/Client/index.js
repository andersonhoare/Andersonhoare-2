import React from "react";
import { Center, palette } from "../../style";
import { HeroFull } from "../../components/Hero";
import Info from "./Info";
import Links from "./Links";
import { fetchImageContentful } from "../../utils";

export default ({ client, services }) => {
  const {
    heroImage,
    subtitle,
    howWeWork,
    rolesWeRecruitFor,
    needAPerm,
    needATemp,
    needAPermEmail,
    needATempEmail,
    panelImage,
    testimonials,
  } = client;

  return (
    <React.Fragment>
      <HeroFull
        background={palette.grey}
        spacer={palette.primary}
        title="Clients"
        subtitle={subtitle}
        imageSrc={fetchImageContentful(heroImage.file.url, {
          size: 1425,
          quality: 75,
        })}
      />
      <Info
        howWeWork={howWeWork}
        rolesWeRecruitFor={rolesWeRecruitFor}
        needAVa={`Our readily available team of Virtual Assistants are quick to hire, have all the technology
          they need to work remotely and are highly skilled in all traditional PA/EA skills. We’ll work
          closely with you to find your perfect remote assistant.`}
        needAContractor={`Whether it’s cover for maternity leave, a sabbatical, or a specific project, we’ll work closely
        with you to match you with a contract assistant quickly and efficiently.`}
        needAPerm={needAPerm}
        needATemp={needATemp}
        needAPermEmail={"diana@andersonhoare.co.uk"}
        needATempEmail={"zoe@andersonhoare.co.uk"}
        needAVaEmail={"diana@andersonhoare.co.uk"}
        needAContractorEmail={"zoe@andersonhoare.co.uk"}
        testimonial={testimonials.length ? testimonials[0] : null}
        panelImage={panelImage}
        services={services}
      />
      <Links />
    </React.Fragment>
  );
};
