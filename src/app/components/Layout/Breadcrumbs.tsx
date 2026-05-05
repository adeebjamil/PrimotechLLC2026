import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="w-full max-w-4xl mx-auto px-4 py-4 md:py-6 flex items-center text-sm font-medium text-gray-500 overflow-x-auto">
      <ol className="flex items-center space-x-2 whitespace-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                // Current Page
                <span className="text-gray-900 font-semibold" aria-current="page">
                  {item.label}
                </span>
              ) : (
                // Links to previous pages
                <>
                  <Link
                    href={item.href}
                    className="hover:text-[#21b392] transition-colors duration-200 cursor-pointer"
                  >
                    {item.label}
                  </Link>
                  {/* Chevron separator */}
                  <svg
                    className="w-4 h-4 text-gray-400 mx-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
