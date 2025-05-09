import React from 'react';
import type { BlogPost } from '../types';

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
            {post.pubDate && (
              <span>- {new Date(post.pubDate).toLocaleDateString()}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;