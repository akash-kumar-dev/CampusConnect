"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Campus Connect</h3>
            <p className="text-sm">
              A student marketplace connecting college communities.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Browse Products</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <p className="text-sm">
              Have questions? Reach out to us at<br />
              <a href="mailto:support@campusconnect.com" className="text-indigo-400 hover:text-indigo-300">
                support@campusconnect.com
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Campus Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}; 