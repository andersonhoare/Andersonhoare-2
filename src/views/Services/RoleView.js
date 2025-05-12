import React from "react";
import styled, { css } from "styled-components";
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

const cssOuter = css`
  background: ${palette.grey};
`;

const cssInner = css`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 2rem;
  ${media.mobile`
    grid-template-columns: 1fr;
    padding: 0;
    grid-gap: 0;
  `};
`;

const Info = styled.div`
  display: grid;
  grid-gap: 4rem;
  grid-auto-flow: column;
  grid-template-columns: max-content auto;
  padding-top: 8rem;
  align-items: baseline;
  ${media.mobile`
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    padding-top: 3rem;
    grid-gap: 2rem;
  `};
`;

const Author = styled(Typography.Meta)`
  font-weight: 600;
`;

const AuthorInfo = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  grid-auto-columns: max-content;
  > :last-child {
    margin-left: 2rem;
  }

  ${media.mobile`
    grid-auto-flow: row;
    > :last-child {
      margin-left: 0;
    }
  `};
`;

const Back = styled.div`
  padding: 4rem;
  ${media.mobile`
    padding: 3rem;
    padding-bottom: 4rem;
  `};
`;

const ImageHero = styled.img`
  width: 100%;
  height: 40rem;
  object-fit: cover;
  ${media.mobile`
    height: 20rem;
  `};
`;

export default withRouter(
  ({
    image,
    author,
    jobTitle,
    body,
    createdAt,
    date,
    id,
    title,
    updatedAt,
    tags,
    push,
    roleOptions,
    history,
    ...rest
  }) => {
    React.useEffect(() => {
      if (!id) history.replace("/404");
    }, []);

    return (
      <React.Fragment>
        <Helmet title={title} />
        <Center
          maxWidth={sizes.desktop_xl}
          cssOuter={cssOuter}
          cssInner={cssInner}
        >
          {image && image.file ? (
            <ImageHero
              src={fetchImageContentful(image.file.url)}
              alt={image.file.title}
            />
          ) : (
            <div />
          )}
          <Back>
            <Select
              isMulti={false}
              value={{
                value: id,
                label: title,
              }}
              onChange={(x) => {
                push(
                  `${route.services}/` +
                    toPostUrl({
                      title: x.label,
                    })
                );
              }}
              options={roleOptions}
              placeholder={"Role"}
            />
          </Back>
        </Center>
        <Center>
          <Info>
            <AuthorInfo>
              {author ? <Author>{author}</Author> : null}
              {jobTitle ? <Typography.Meta>{jobTitle}</Typography.Meta> : null}
            </AuthorInfo>
          </Info>
          <HeaderFullFlex type="none" title={title}>
            <Markdown source={body} />
          </HeaderFullFlex>
        </Center>
        <Links />
      </React.Fragment>
    );
  }
);
