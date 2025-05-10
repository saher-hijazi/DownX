import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-300">
              &copy; {new Date().getFullYear()} DownX. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            <FooterLink href="/about" text="About" />
            <FooterLink href="/privacy" text="Privacy Policy" />
            <FooterLink href="/terms" text="Terms of Service" />
            <FooterLink href="/contact" text="Contact" />
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>DownX is not affiliated with any of the supported platforms.</p>
          <p className="mt-1">Please use this service responsibly and respect copyright laws.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
    >
      {text}
    </Link>
  );
}
