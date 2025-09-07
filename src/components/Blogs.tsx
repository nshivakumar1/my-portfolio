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
        <div className={styles.grid}>
          {posts.map((post, index) => (
            <a key={index} className={styles.card} href={post.link} target="_blank" rel="noopener noreferrer">
              <div className={styles.thumbWrapper}>
                {post.imageUrl ? (
                  <img className={styles.thumb} src={post.imageUrl} alt={post.title} loading="lazy" />
                ) : (
                  <div className={styles.thumbPlaceholder}>📝</div>
                )}
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                {post.excerpt && <p className={styles.cardExcerpt}>{post.excerpt}</p>}
                {post.pubDate && (
                  <span className={styles.cardDate}>{new Date(post.pubDate).toLocaleDateString()}</span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;