import React from 'react';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string; // contentSnippet is optional based on your description
}

interface BlogsProps {
  posts: BlogPost[];
}

const Blogs: React.FC<BlogsProps> = ({ posts }) => {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>{' '}
            - {new Date(post.pubDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;