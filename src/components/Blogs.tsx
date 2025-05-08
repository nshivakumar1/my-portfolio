import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Absolute Beginner DevOps Learning Roadmap",
      summary: "This Blog gives a comprehensive roadmap for absolute beginners to start their journey in DevOps, covering essential tools and practices.",
      date: "April 25, 2025",
      link: "https://codeclouddevops.substack.com/p/absolute-beginner-devops-learning?r=5g4py4",
      category: "Technology"
    },
    {
      id: 2,
      title: "Basic Foundations of DevOps",
      summary: "A deep dive into the fundamental concepts and practices that form the backbone of DevOps.",
      date: "April 29, 2025",
      link: "https://codeclouddevops.substack.com/p/basic-foundations-for-devops?r=5g4py4",
      category: "Technology"
    },
    {
      id: 3,
      title: "Infrastructure as Code: A Key Part of Modern DevOps",
      summary: "Explore the principles and practices of Infrastructure as Code (IaC) and its significance in modern DevOps.",
      date: "May 1, 2025",
      link: "https://codeclouddevops.substack.com/p/infrastructure-as-code-a-key-part?r=5g4py4",
      category: "Technology"
    }
  ];

  return (
    <section id="blogs" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">My Blog Posts</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thoughts, insights, and explorations on technology, development, and more. 
            Click on any post to read the full article on Substack.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.summary}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {post.date}
                  </span>
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
                  >
                    Read on Substack 
                    <FaArrowRight className="ml-2" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;