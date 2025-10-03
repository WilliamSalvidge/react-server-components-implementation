import React from 'react';

const Loading = () => React.createElement('h4', {}, 'Loading');

const Post = async ({ blogPath }) => {

  const BlogPost = (await import(`../posts/components/${blogPath}`)).default;

  return React.createElement(BlogPost, {}, null)
}

const Blog = ({ blogPath }) => {
  return (
    React.createElement(React.Suspense, { fallback: React.createElement(Loading, {}, null) }, React.createElement(Post, { blogPath: blogPath }, null))
  )
}

export default Blog;
