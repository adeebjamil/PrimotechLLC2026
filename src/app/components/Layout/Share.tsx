import React from 'react';
import Link from 'next/link';

interface ShareProps {
  url?: string;
  title?: string;
}

const Share: React.FC<ShareProps> = ({
  url = "https://www.primotech-llc.com",
  title = "Check out this article!"
}) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const emailUrl = `mailto:?subject=${encodedTitle}&body=I thought you might find this interesting: ${encodedUrl}`;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 border-t border-gray-200 mt-12 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <h4 className="text-lg font-semibold text-gray-900 tracking-tight">
        Share this article:
      </h4>

      <div className="flex items-center gap-4">
        {/* Email */}
        <Link
          href={emailUrl}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-[#21b392] hover:text-white text-gray-600 transition-all duration-300"
          aria-label="Share via Email"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Share;

