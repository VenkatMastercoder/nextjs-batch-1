"use client";
import { signOut, useSession } from "next-auth/react";
import "./style.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  const classRoutes = [
    { name: "Blog", path: "/blog" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Products", path: "/products" },
    { name: "Restaurant", path: "/restaurant" },
    { name: "User", path: "/user" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
    { name: "Docs", path: "/docs" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-bold mb-12 text-white">
            Next.js <span className="text-purple-400">Class Session</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mb-16">
            Welcome to our interactive learning journey with Next.js App Router
          </p>
          
          {session ? (
            <div className="flex items-center gap-4 mb-8">
              {session.user?.image && (
                <Image 
                  src={session.user.image} 
                  alt={session.user.name || "User"} 
                  width={48} 
                  height={48} 
                  className="rounded-full"
                />
              )}
              <div className="text-left">
                <p className="font-medium">Welcome, {session.user?.name || "User"}!</p>
                <button 
                  onClick={() => signOut()} 
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => router.push("/api/auth/signin")}
              className="px-12 py-5 bg-purple-600 text-white text-2xl rounded-full hover:bg-purple-700 transition duration-300 shadow-lg"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Class Routes Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Class Routes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {classRoutes.map((route) => (
              <button
                key={route.path}
                onClick={() => router.push(route.path)}
                className="p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center border border-gray-700 hover:border-purple-500"
              >
                <span className="text-lg font-medium text-gray-200">{route.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-900/90 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-white">App Router</h3>
            <p className="text-gray-300 text-lg">Learn the new file-based routing system in Next.js 15+</p>
          </div>
          <div className="bg-gray-900/90 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-white">Server Components</h3>
            <p className="text-gray-300 text-lg">Understand React Server Components and their benefits</p>
          </div>
          <div className="bg-gray-900/90 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-white">Authentication</h3>
            <p className="text-gray-300 text-lg">Implement secure authentication with NextAuth.js</p>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-900/90 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-white">Next.js Render Pattern</h3>
            <p className="text-gray-300 text-lg">Explore the different rendering patterns in Next.js applications</p>
          </div>
          <div className="bg-gray-900/90 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-white">Styling</h3>
            <p className="text-gray-300 text-lg">Learn various styling approaches including CSS, Tailwind, and component libraries</p>
          </div>
          <div className="bg-gray-900/90 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-white">Performance</h3>
            <p className="text-gray-300 text-lg">Optimize your Next.js application for better user experience</p>
          </div>
        </div>

        {/* More Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-900/90 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-white">Deployment</h3>
            <p className="text-gray-300 text-lg">Deploy your Next.js applications to various hosting platforms</p>
          </div>
          <div className="bg-gray-900/90 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-white">Next Auth</h3>
            <p className="text-gray-300 text-lg">Implement authentication and authorization in your applications</p>
          </div>
          <div className="bg-gray-900/90 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-white">Component Libraries</h3>
            <p className="text-gray-300 text-lg">Integrate UI component libraries for faster development</p>
          </div>
        </div>
      </div>
    </div>
  );
}