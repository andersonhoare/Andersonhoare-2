import React from "react";
import styled, { css } from "styled-components";
import Markdown from "../../components/Markdown";
import { formatDateTime, formatSalary } from "../../utils";
import { withRouter } from "react-router-dom";
import { route } from "../../routes";
import { HeaderFullFlex } from "../../components/Header";
import { Center, palette, media, Typography } from "../../style";
import { ApplyNow } from "./Links";
import FilledJobBanner from "../../components/FilledJobBanner";
import SimpleFilledBanner from "../../components/SimpleFilledBanner";

const cssOuterIntro = css`
  background: ${palette.grey};
`;

const cssInnerIntro = css`
  display: grid;
  grid-gap: 4rem;
  padding: 8rem 3rem;
  margin-bottom: 6rem;
  grid-template-columns: 1fr 1fr;

  ${media.ie`
    > div {
      display: inline-block;
      width: 50%;
      vertical-align: top;
    }
  `};

  ${media.mobile`
    padding: 4rem 3rem;
    margin-bottom: 2rem;
    grid-template-columns: 1fr;
  `};
`;

const Panel = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: max-content auto;
  background: ${palette.primary};
  padding: 5rem;
  grid-gap: 1rem 4rem;

  ${media.mobile`
    padding: 2rem;
  `};

  span,
  p {
    color: ${palette.secondary};
  }

  ${media.ie`
    span, p {
      display: inline-block;
      vertical-align: top;
      margin-bottom: 1rem;
      width: 50%;
    }
    
  `};

  span {
    line-height: 1.94;
  }
`;

const Heading = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 4rem;
`;

const Skills = styled.div`
  padding-top: 6rem;
  font-weight: 600;
  line-height: 1.94;
  font-size: 14px;
  padding-bottom: 2rem;

  ${media.mobile`
    padding-top: 12rem;
  `};
`;

const cssOuterDesc = css`
  margin-top: -24rem;
  background: white;
  padding-top: 10rem;
`;

const cssInnerDesc = css``;

const MainContent = styled.div`
  position: relative;
`;

const Entry = ({ title, value }) => (
  <React.Fragment>
    <Typography.Meta>{title}</Typography.Meta>
    <Typography.Body>{value}</Typography.Body>
  </React.Fragment>
);

export default withRouter(
  ({
    id,
    createdAt,
    job_reference,
    job_title,
    job_type,
    job_start,
    job_startdate,
    job_duration,
    job_industry,
    salary_from,
    salary_to,
    salary_per,
    salary_benefits,
    job_skills,
    job_location,
    job_description,
    descriptionMeta,
    history,
  }) => {
    React.useEffect(() => {
      if (!id) history.replace("/404");

      let employmentType = () => {
        if (job_type == "contractor") return "CONTRACTOR";
        if (job_type == "permanent") return "FULL_TIME";
        return job_type;
      };

      let script = document.createElement("script");
      script.type = "application/ld+json";

      script.innerText = JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        title: job_title,
        description: `<p>${descriptionMeta}</p>`,
        identifier: {
          "@type": "PropertyValue",
          name: "Ref",
          value: job_reference,
        },
        datePosted: createdAt,
        employmentType: employmentType(),
        hiringOrganization: {
          "@type": "Organization",
          name: "Anderson Hoare",
          sameAs: "https://www.andersonhoare.co.uk",
          logo: "https://www.andersonhoare.co.uk/logo_full.png",
        },

        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job_location,
            addressCountry: "UK",
          },
        },
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "GBP",
          value: {
            "@type": "QuantitativeValue",
            minValue: Number(salary_from) * 1000,
            maxValue: Number(salary_to) * 1000,
            unitText: "YEAR",
          },
        },
      });

      document.head.appendChild(script);
    }, []);

    const salary = formatSalary(salary_from, salary_to, salary_per);
    const isFilled = (job_startdate || job_start) === "Already Filled";

    return (
      <React.Fragment>
        <MainContent>
          {isFilled && <SimpleFilledBanner />}
          <Center cssOuter={cssOuterIntro} cssInner={cssInnerIntro}>
            <Heading>
              <Typography.Link to={route.jobs}>
                {" "}
                Back to all jobs{" "}
              </Typography.Link>
              <Typography.H1>{job_title}</Typography.H1>
            </Heading>
            <Panel>
              <Entry title="Location" value={job_location} />
              <Entry title="Salary" value={salary} />
              <Entry
                title="Starts"
                value={job_startdate || job_start || "Already Filled"}
              />
              <Entry title="Industry" value={job_industry} />
              <Entry title="Date posted" value={formatDateTime(createdAt)} />
              <Entry title="Job ref" value={job_reference} />
            </Panel>
          </Center>
          <Center cssOuter={cssOuterDesc} cssInner={cssInnerDesc}>
            <Skills>{job_skills}</Skills>
            <HeaderFullFlex type="none" title={"Job description"}>
              <Markdown source={job_description} />
            </HeaderFullFlex>
          </Center>
        </MainContent>
        <ApplyNow
          title={job_title}
          createdAt={createdAt}
          job_reference={job_reference}
        />
      </React.Fragment>
    );
  }
);
