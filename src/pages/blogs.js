// pages/blogs.js (for Pages Router)
// If using App Router, place in app/blogs/page.js and modify accordingly

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Blogs.module.css'; // Create this CSS module

// Function to parse date to a readable format
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Fetch the Substack posts
    async function fetchSubstackPosts() {
      try {
        // Replace 'your-substack-name' with your actual Substack name
        const response = await fetch('/api/substack-posts');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Substack posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    }
    
    fetchSubstackPosts();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>My Blog Posts | NakulFolio</title>
        <meta name="description" content="Read my latest blog posts from Substack" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Blog Posts</h1>
        
        {loading && <p className={styles.loading}>Loading posts...</p>}
        
        {error && <p className={styles.error}>{error}</p>}
        
        <div className={styles.postsGrid}>
          {posts.map((post) => (
            <div key={post.link} className={styles.postCard}>
              {post.thumbnail && (
                <div className={styles.thumbnailContainer}>
                  <img 
                    src={post.thumbnail} 
                    alt={post.title} 
                    className={styles.thumbnail}
                  />
                </div>
              )}
              <div className={styles.postContent}>
                <h2 className={styles.postTitle}>
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </h2>
                <p className={styles.postDate}>{formatDate(post.pubDate)}</p>
                <div 
                  className={styles.postExcerpt}
                  dangerouslySetInnerHTML={{ __html: post.contentSnippet || post.content?.substring(0, 150) + '...' }}
                />
                <a 
                  href={post.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.readMore}
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {!loading && !error && posts.length === 0 && (
          <p className={styles.noPosts}>No posts found.</p>
        )}
      </main>
    </div>
  );
}