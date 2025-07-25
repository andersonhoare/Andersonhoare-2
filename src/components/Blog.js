import React from 'react';
import styled from 'styled-components';
import { fetchImageContentful, formatDateTime, toPostUrl } from '../utils';
import { Center, media, Typography, palette } from '../style';

const BOX_WIDTH = 16;

const Main = styled.li`
  position: relative;
`;

const Card = styled.div`
  background: ${palette.primary};
  padding: 2rem;
  width: ${BOX_WIDTH}rem;
  min-height: ${BOX_WIDTH}rem;
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-self: flex-end;

  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateY(40%);

  > div {
    display: grid;
    grid-auto-flow: row;
  }

  ${media.mobile`
      display: none;
  `};
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center;
  height: ${({ isHero }) => (isHero ? 45 : 32)}rem;
  ${media.mobile`
    height: 20rem;  
  `};
`;

const Bottom = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: auto ${BOX_WIDTH}rem;
  ${media.mobile`
     grid-template-columns: 1fr;
  `};
`;

const Body = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-auto-rows: min-content;
  /* grid-gap: 0.6rem; */
  padding-bottom: 6rem;
  h4 {
    padding-bottom: 1.6rem;
    padding-top: 1rem;
  }
  ${media.mobile`
    padding-bottom: 2rem;
  `};
`;

const TagWrap = styled.ul`
  li:last-child {
    border: none;
  }
`;

const Tag = styled.li`
  color: ${palette.accent};
  border-right: 1px solid ${palette.accent};
  padding-right: 0.8rem;
  margin-right: 0.7rem;
  margin-bottom: 0.6rem;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ImageWrap = styled.div`
  position: relative;
`;

export const Tags = ({ tags, as = TagWrap }) =>
  tags && tags.length ? (
    <TagWrap as={as}>
      {tags.map(({ tagName }, key) => (
        <Tag key={tagName || key}>{tagName}</Tag>
      ))}
    </TagWrap>
  ) : null;

export default (
  { image, author, jobTitle, createdAt, title, light, tags, isHero },
  key
) => {
  return (
    <Main key={key}>
      <ImageWrap>
        {image && image.file ? (
          <Image
            isHero={isHero}
            src={fetchImageContentful(image.file.url)}
            alt={image.file.title}
          />
        ) : null}
        <Card>
          <div>
            <Typography.Meta light>{author}</Typography.Meta>
            <Typography.Meta light>{jobTitle}</Typography.Meta>
          </div>
          <Typography.Meta light>{formatDateTime(createdAt)}</Typography.Meta>
        </Card>
      </ImageWrap>
      <Bottom>
        <Body>
          <Tags tags={tags} />
          <Typography.H4 light={light}>{title}</Typography.H4>
          <Typography.Link
            light={light}
            to={`/blog/${toPostUrl({ createdAt, title })}`}
          >
            Read more
          </Typography.Link>
        </Body>
      </Bottom>
    </Main>
  );
};
