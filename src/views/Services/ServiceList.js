import axios from "axios";

import React from "react";
import styled, { css } from "styled-components";
import { HeroFull } from "../../components/Hero";

import Helmet from "../../components/Helmet";
import { HeaderFullFlex } from "../../components/Header";
import { Tags } from "../../components/Blog";
import Markdown from "../../components/Markdown";
import { toPostUrl, fetchImageContentful, formatDateTime } from "../../utils";
import {
  Center,
  Typography,
  BodyCss,
  LinkCss,
  palette,
  media,
  sizes,
} from "../../style";
import { route } from "../../routes";
import Links from "./Links";
import Select from "../../components/Select";
import { withRouter } from "react-router-dom";

export const Type = {
  CANDIDATES: "candidates",
  CLIENTS: "clients",
};

const cssOuter = css`
  background: ${palette.grey};
`;

const cssInner = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  padding: 4rem 3rem;

  align-items: baseline;

  ${media.mobile`
    grid-template-columns: 1fr;
    padding: 0;
    grid-gap: 0;
  `};
`;

const Circle = styled.div`
  width: 15rem;
  height: 15rem;
  background: ${palette.secondary};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;

  svg {
    width: 7rem;
    height: 7rem;
  }
  path {
    stroke: ${palette.primary};
    /* stroke-width: 1.6px; */
  }
`;

const Service = styled.div`
  display: grid;
  grid-template-rows: min-content min-content auto;
  text-align: center;
  grid-gap: 1rem;
  h2 {
    font-size: 28px;
    margin-top: 3rem;
    margin-bottom: 1rem;
    white-space: nowrap;
  }
`;

const Services = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12rem;
  padding-bottom: 8rem;
  ${media.mobile`
    grid-template-columns: 1fr;
    height: auto;
    padding-bottom: 2rem;
    grid-gap: 2rem;
  `};
`;

const HeroFullWrap = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  height: 82rem;

  img {
    height: 90%;
  }

  ${media.mobile`
    grid-template-columns: 1fr;
    height: auto;
    padding-bottom: 2rem;
    grid-gap: 2rem;


    img {
      height: 20rem;
    }
  `};
`;

const ServiceLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem 1rem;
  margin-top: 4rem;
  p {
    cursor: pointer;
    font-weight: 600;
    /* color: ${palette.secondary}; */
    white-space: nowrap;
  }
`;

const Icon = ({ url, setRef }) => {
  let [svg, setSvg] = React.useState(null);

  const myRef = React.useRef(null);

  React.useEffect(() => {
    if (myRef.current) {
      setRef(myRef.current);
    }
  }, [myRef.current]);

  React.useEffect(() => {
    axios.get("https:" + url).then((x) => setSvg((_) => x.data));
    return () => {};
  }, []);

  return <Circle ref={myRef} dangerouslySetInnerHTML={{ __html: svg }} />;
};

const SubtitleLinks = ({ offsets, services }) => {
  return (
    <ServiceLinks>
      {services.map((service) => (
        <Typography.Body
          light
          onClick={(_) =>
            window.scrollTo({
              top: offsets[toPostUrl({ title: service.title })] - 150,
              behavior: "smooth",
            })
          }
        >
          {service.title}
        </Typography.Body>
      ))}
    </ServiceLinks>
  );
};

export default ({ params, intro, image, services }) => {
  const [offsets, setOffsets] = React.useState(() => {});

  React.useEffect(() => {
    if (params && offsets) {
      window.scrollTo({
        top: offsets[params] - 150,
        behavior: "smooth",
      });
    }
  }, [offsets]);

  return (
    <React.Fragment>
      {!image || !image.file ? null : (
        <HeroFull
          light
          Container={HeroFullWrap}
          background={palette.primary}
          // spacer={palette.primary}
          spacer={"white"}
          title="Our Services"
          subtitle={intro}
          subtitleMeta={<SubtitleLinks offsets={offsets} services={services} />}
          imageSrc={fetchImageContentful(image.file.url, {
            size: 1425,
            quality: 75,
          })}
        />
      )}

      <Center>
        <Services>
          {services.map(({ body, title, image }) =>
            !image ? null : (
              <Service>
                <Icon
                  url={image.file.url}
                  setRef={(ref) => {
                    if (ref) {
                      setOffsets((x) => ({
                        ...x,
                        ...{ [toPostUrl({ title })]: ref.offsetTop },
                      }));
                    }
                  }}
                />
                <Typography.H2>{title}</Typography.H2>
                <Typography.Body>{body}</Typography.Body>
              </Service>
            )
          )}
        </Services>
      </Center>

      <Links />
    </React.Fragment>
  );
};
