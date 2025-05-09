// pages/api/substack-posts.js

import Parser from 'rss-parser';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const parser = new Parser({
      customFields: {
        item: [
          ['content:encoded', 'content'],
          ['media:content', 'media']
        ],
      }
    });
    
    // Replace with your actual Substack URL
    const substackURL = 'https://substack.com/@codeclouddevops/posts';
    
    const feed = await parser.parseURL(substackURL);
    
    // Transform the items to extract what we need
    const posts = feed.items.map(item => {
      // Try to extract a thumbnail from the content if available
      let thumbnail = null;
      
      // Look for image in media:content field
      if (item.media && item.media.$ && item.media.$.url) {
        thumbnail = item.media.$.url;
      } 
      // Fallback: try to extract first image from content
      else if (item.content) {
        const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch && imgMatch[1]) {
          thumbnail = imgMatch[1];
        }
      }
      
      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        contentSnippet: item.contentSnippet,
        content: item.content?.substring(0, 500), // Limit content to avoid large payload
        thumbnail,
      };
    });
    
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching Substack feed:', error);
    res.status(500).json({ message: 'Failed to fetch blog posts' });
  }
}