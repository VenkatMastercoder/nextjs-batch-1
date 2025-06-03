"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

const DocsDemo = () => {
  const params = useParams();
  
  // Parse the id parameter from the URL
  const segments = params?.id || [];
  
  // Example documentation structure
  const docSections = [
    { name: "Getting Started", path: "getting-started" },
    { name: "Components", path: "components" },
    { name: "Routing", path: "routing" },
    { name: "API Reference", path: "api" },
    { name: "Deployment", path: "deployment" },
  ];
  
  // Example subsections for each section
  const subSections = {
    "getting-started": ["Installation", "Project Structure", "Configuration"],
    "components": ["Server Components", "Client Components", "Shared Components"],
    "routing": ["File-based Routing", "Dynamic Routes", "Catch All Routes"],
    "api": ["Route Handlers", "Middleware", "Edge Functions"],
    "deployment": ["Vercel", "Netlify", "Docker"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Next.js Documentation
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Catch All Routes Demo - <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-blue-600 dark:text-blue-400 font-mono text-sm">[[...id]]</code>
            </p>
          </div>
          
          {/* Main content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Documentation</h2>
                <ul className="space-y-2">
                  {docSections.map((section) => (
                    <li key={section.path}>
                      <Link 
                        href={`/docs/${section.path}`}
                        className={`block px-3 py-2 rounded-lg ${
                          segments[0] === section.path 
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium" 
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {section.name}
                      </Link>
                      
                      {/* Show subsections if this section is active */}
                      {segments[0] === section.path && (
                        <ul className="mt-2 ml-4 space-y-1">
                          {subSections[section.path].map((subSection, index) => (
                            <li key={index}>
                              <Link 
                                href={`/docs/${section.path}/${subSection.toLowerCase().replace(/\s+/g, '-')}`}
                                className={`block px-3 py-1.5 rounded-lg text-sm ${
                                  segments[1] === subSection.toLowerCase().replace(/\s+/g, '-')
                                    ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium" 
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                }`}
                              >
                                {subSection}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Content area */}
            <div className="lg:w-2/3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                {segments.length === 0 ? (
                  <div className="text-center py-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Welcome to the Documentation
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Select a topic from the sidebar to learn more about Next.js
                    </p>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                        Catch All Routes Demo
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        This page demonstrates how to use Next.js Catch All Routes with the <code className="bg-blue-100 dark:bg-blue-800 px-1.5 py-0.5 rounded text-blue-700 dark:text-blue-300 font-mono">[[...id]]</code> syntax.
                        Try clicking on different sections and subsections to see how the URL and content change.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Current Path:
                      </div>
                      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                        <Link href="/docs" className="text-blue-600 dark:text-blue-400 hover:underline">docs</Link>
                        {segments.map((segment, index) => (
                          <div key={index} className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                            <Link 
                              href={`/docs/${segments.slice(0, index + 1).join('/')}`}
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              {segment}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      {segments.length >= 1 && segments[0].charAt(0).toUpperCase() + segments[0].slice(1).replace(/-/g, ' ')}
                      {segments.length >= 2 && ` › ${segments[1].charAt(0).toUpperCase() + segments[1].slice(1).replace(/-/g, ' ')}`}
                    </h2>
                    
                    <div className="prose dark:prose-invert max-w-none">
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg mb-6">
                        <h3 className="font-medium text-yellow-700 dark:text-yellow-300 mb-1">
                          URL Parameters
                        </h3>
                        <pre className="bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-md overflow-x-auto text-sm">
                          {JSON.stringify({ params: { id: segments } }, null, 2)}
                        </pre>
                      </div>
                      
                      <p>
                        This content is dynamically generated based on the URL parameters.
                        In a real application, you would fetch the appropriate content based on these parameters.
                      </p>
                      
                      <p>
                        Catch-all routes allow you to match dynamic segments of a URL and capture them as parameters.
                        The double bracket syntax <code>[[...id]]</code> makes the parameter optional.
                      </p>
                      
                      <h3>How it works:</h3>
                      <ul>
                        <li><code>/docs</code> - Shows the documentation homepage</li>
                        <li><code>/docs/routing</code> - Shows the routing section</li>
                        <li><code>/docs/routing/catch-all-routes</code> - Shows a specific subsection</li>
                        <li>And so on, with unlimited depth...</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Test links */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Test Different Routes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link 
                    href="/docs" 
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    /docs
                  </Link>
                  <Link 
                    href="/docs/routing" 
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    /docs/routing
                  </Link>
                  <Link 
                    href="/docs/routing/catch-all-routes" 
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    /docs/routing/catch-all-routes
                  </Link>
                  <Link 
                    href="/docs/api/route-handlers" 
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    /docs/api/route-handlers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsDemo;