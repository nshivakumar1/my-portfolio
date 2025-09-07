import React from 'react';
import type { BlogPost } from '../types';
import styles from '../styles/Blogs.module.css';

interface BlogsProps {
  posts: BlogPost[];
}

const Blogs: React.FC<BlogsProps> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Blog Posts</h1>
      {posts.length === 0 ? (
        <div className={styles.empty}>No posts available right now.</div>
      ) : (
        <ul className={styles.list}>
          {posts.map((post, index) => (
            <li key={index} className={styles.item}>
              <a className={styles.link} href={post.link} target="_blank" rel="noopener noreferrer">
                {post.title}
              </a>
              {post.pubDate && (
                <span className={styles.date}>{new Date(post.pubDate).toLocaleDateString()}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Blogs;