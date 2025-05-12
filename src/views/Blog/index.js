import React from 'react';
import { Route } from 'react-router-dom';
import { fetchBlogs } from '../../reducer';
import { route } from '../../routes';
import { getBlogTags, getCurrentBlog } from '../../utils';

import BlogList from './BlogList';
import BlogView from './BlogView';

export default ({ blog, blogs, dispatch }) => {
  React.useEffect(() => {
    if (!blogs.length) fetchBlogs(dispatch);
  }, []);

  const { heroBlog, blackBookBlog } = blog;
  const tags = getBlogTags(blogs);
  return (
    <React.Fragment>
      <Route
        exact
        path={route.blog}
        render={({ location }) => {
          return (
            <BlogList
              tags={tags}
              blogs={blogs}
              heroBlog={heroBlog}
              blackBookBlog={blackBookBlog}
            />
          );
        }}
      />
      <Route
        path={`${route.blog}/:id`}
        component={({ match: { params } }) => (
          <BlogView {...getCurrentBlog(params.id, blogs)} />
        )}
      />
    </React.Fragment>
  );
};
