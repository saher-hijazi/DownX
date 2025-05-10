import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p>
              At DownX, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our service.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p>
              DownX does not collect or store any personal information about our users. We do not require you to create an account or provide any personal details to use our service.
            </p>
            <p>
              When you use DownX to download videos or audio, we temporarily process the URL you provide to extract the content. This URL is not stored permanently on our servers and is deleted once your download is complete.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies and Local Storage</h2>
            <p>
              DownX uses browser local storage to temporarily store information about your current download session. This information is stored only on your device and is not transmitted to our servers. We do not use tracking cookies or any other tracking technologies.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Downloaded Content</h2>
            <p>
              The content you download using DownX is temporarily stored on our servers to facilitate the download process. This content is automatically deleted after a short period (typically 1 hour) and is not accessible to other users.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
            <p>
              DownX does not share any information with third parties. We do not use third-party analytics or advertising services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@downx.example.com.
            </p>
            
            <div className="mt-8 text-center">
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
