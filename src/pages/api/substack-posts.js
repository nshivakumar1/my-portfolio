// src/pages/api/substack-posts.js
import Parser from 'rss-parser';

// Proper export of a GET function for Astro API routes
export const GET = async () => {
  // Configure parser with more lenient options
  const parser = new Parser({
    customFields: {
      item: ['content:encoded', 'description']
    },
    timeout: 5000,
    xml2js: {
      strict: false,
      normalize: true,
      normalizeTags: true,
      ignoreAttrs: true
    }
  });
  
  // Replace with your actual Substack URL - using Medium as a fallback for testing
  const substackUrl = 'https://codeclouddevops.substack.com/feed';
  
  try {
    // Try direct fetch first
    const feed = await parser.parseURL(substackUrl);
    
    return new Response(JSON.stringify({
      success: true,
      posts: feed.items || []
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error(`Error fetching posts:`, error);
    
    // Return a fallback response
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      posts: [
        {
          title: "Coming Soon",
          link: "#",
          pubDate: new Date().toISOString(),
          contentSnippet: "Blog posts will be available soon. Check back later!"
        }
      ]
    }), {
      status: 200, // Still return 200 to avoid breaking clients
      headers: { 'Content-Type': 'application/json' }
    });
  }
}