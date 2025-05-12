import React from 'react';
import styled, { css } from 'styled-components';
import { Center, Typography, media, palette } from '../../style';
import { fetchImageContentful, toPostUrl } from '../../utils';
import { useBlogFilter } from '../../hooks';
import { route } from '../../routes';
import { CardComponent, Panel } from '../../components/ImageGrid';
import Blog, { Tags } from '../../components/Blog';
import Select from '../../components/Select';
import {
  sortBy,
  prop,
  defaultTo,
  pipe,
  filter as RFilter,
  splitAt,
  reverse
} from 'ramda';
import Links from './Links';

const cssOuter = css`
  background: ${palette.grey};
  padding-top: 8rem;
  margin-bottom: 8rem;
  ${media.mobile`
    padding-top: 4rem;
    padding-bottom: 4rem;
    margin-bottom: 4rem;
  `};
`;

const cssInner = css``;

const BlogList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 4rem;
  ${media.mobile`
    grid-template-columns: 1fr;
  `};
`;

const Card = styled(CardComponent)`
  background: ${palette.primary};
`;

const BlackBookTitle = styled(Typography.H4)`
  padding-bottom: 4rem;
  width: 80%;
`;

const SearchWrap = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding-bottom: 4rem;
  ${media.mobile`
    grid-gap: 2rem;
    grid-template-columns: 1fr;
  `};
`;

const NoResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0 6rem 4rem;
  ${media.mobile`
    padding: 0rem 0 5rem 0rem;  
  `};
`;

const BlackBook = ({ title, image, createdAt, tags }) => (
  <Panel src={fetchImageContentful(image.file.url)}>
    <br />
    <Card>
      <Tags tags={tags} />
      <BlackBookTitle light>{title}</BlackBookTitle>
      <Typography.Link
        light
        to={`${route.blog}/${toPostUrl({
          createdAt: createdAt,
          title: title
        })}`}
      >
        Read more
      </Typography.Link>
    </Card>
  </Panel>
);

const getAllBlogs = blackBookBlog =>
  pipe(
    sortBy(prop('createdAt')),
    reverse,
    RFilter(x => x.id !== (blackBookBlog ? blackBookBlog.id : null)),
    defaultTo([]),
    splitAt(4)
  );

export default ({ tags, blogs, heroBlog, blackBookBlog }) => {
  const { filter, setBlogFilter, filteredBlogs, options } = useBlogFilter({
    blogs,
    tags
  });
  const [top, bottom] = getAllBlogs(blackBookBlog)(filteredBlogs);
  const length = !top.length && !bottom.length;
  return (
    <React.Fragment>
      <Center cssOuter={cssOuter} cssInner={cssInner}>
        {heroBlog ? <Blog isHero {...heroBlog} /> : null}
      </Center>
      <Center>
        <SearchWrap>
          <Typography.H4> Filter blogs </Typography.H4>

          <Select
            onChange={setBlogFilter}
            value={filter}
            options={options}
            isMulti={false}
            placeholder={'Select tag'}
          />
        </SearchWrap>
        <NoResults>
          {!top.length && !bottom.length ? (
            <Typography.Input>
              No blog posts found that match your filter
            </Typography.Input>
          ) : (
            ''
          )}
        </NoResults>

        {top.length ? <BlogList>{top.map(Blog)}</BlogList> : null}
        {blackBookBlog ? <BlackBook {...blackBookBlog} /> : null}
        {bottom.length ? <BlogList>{bottom.map(Blog)}</BlogList> : null}
      </Center>
      <Links />
    </React.Fragment>
  );
};
