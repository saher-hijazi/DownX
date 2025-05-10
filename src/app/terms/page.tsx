import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p>
              By using DownX, you agree to these Terms of Service. Please read them carefully.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using DownX, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
            <p>
              DownX grants you a limited, non-exclusive, non-transferable, revocable license to use the service for personal, non-commercial purposes.
            </p>
            <p>
              You may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use DownX for any illegal purpose or to download content that infringes on intellectual property rights.</li>
              <li>Attempt to decompile or reverse engineer any software contained on DownX's servers.</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
            <p>
              DownX is provided on an "as is" basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations</h2>
            <p>
              In no event shall DownX or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use DownX, even if DownX or a DownX authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Copyright and Intellectual Property</h2>
            <p>
              DownX respects the intellectual property rights of others and expects users to do the same. You should only download content that you have the legal right to download. DownX is not responsible for any copyright infringement that may occur as a result of using our service.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Terms</h2>
            <p>
              DownX reserves the right to modify these terms of service at any time. We will notify users of any changes by posting the new Terms of Service on this page.
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
