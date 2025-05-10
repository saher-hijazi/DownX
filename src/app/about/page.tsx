import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

// Feature item component
function FeatureItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <li className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm transition-transform hover:scale-105">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </li>
  );
}

// Future feature item component
function FutureFeatureItem({ title, description }: { title: string, description: string }) {
  return (
    <div className="p-4 border border-dashed border-amber-300 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-amber-900/20">
      <h3 className="font-medium flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-3xl">DX</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About DownX
          </h1>

          <div className="space-y-8 text-gray-700 dark:text-gray-300">
            {/* Introduction Section */}
            <section className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Introduction
              </h2>
              <p className="text-lg leading-relaxed">
                DownX is a fast, user-friendly video and audio downloader designed for platforms like YouTube, Vimeo, Dailymotion, Facebook, and SoundCloud. We've created a tool that prioritizes simplicity and performance, allowing you to quickly download your favorite content in the format that works best for you.
              </p>
            </section>

            {/* What Makes DownX Special Section */}
            <section className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                What Makes DownX Special?
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FeatureItem
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  }
                  title="Modern UI with dark mode"
                  description="Clean, intuitive interface that's easy on the eyes day or night"
                />
                <FeatureItem
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  }
                  title="Multiple formats"
                  description="Download in MP4, MP3, 4K, and more to suit your needs"
                />
                <FeatureItem
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  }
                  title="Playlist support"
                  description="Download entire collections with a single click"
                />
                <FeatureItem
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                  title="Fast performance"
                  description="Optimized for speed with parallel downloads"
                />
                <FeatureItem
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                  title="Smart fallback thumbnails"
                  description="Never see a broken image with our placeholder system"
                />
                <FeatureItem
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  }
                  title="No ads or popups"
                  description="Clean experience without interruptions"
                />
              </ul>
            </section>

            {/* Respect & Responsibility Section */}
            <section className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Respect & Responsibility
              </h2>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-500">
                <p className="leading-relaxed">
                  At DownX, we believe in the ethical use of technology. Our tool is designed for personal use only, and we encourage all users to respect copyright laws and the terms of service of content platforms. We do not host or distribute any copyrighted content, and we're committed to supporting creators by promoting responsible downloading practices.
                </p>
              </div>
            </section>

            {/* What's Coming Next Section */}
            <section className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                What's Coming Next
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FutureFeatureItem
                  title="User accounts"
                  description="Save your download history and preferences"
                />
                <FutureFeatureItem
                  title="More platform support"
                  description="Expanding to additional video and audio sources"
                />
                <FutureFeatureItem
                  title="Offline downloads"
                  description="Queue downloads for later when you're offline"
                />
                <FutureFeatureItem
                  title="Mobile app version (PWA)"
                  description="Take DownX with you on your mobile devices"
                />
              </div>
            </section>

            {/* Contact Info Section */}
            <section className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </h2>
              <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
                <p className="text-lg mb-2">Have questions or suggestions?</p>
                <a href="mailto:support@downx.io" className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  support@downx.io
                </a>
                <p className="text-sm mt-4 text-gray-500 dark:text-gray-400">
                  We typically respond within 24 hours
                </p>
              </div>
            </section>

            <div className="mt-10 text-center">
              <Link
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform hover:scale-105"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
