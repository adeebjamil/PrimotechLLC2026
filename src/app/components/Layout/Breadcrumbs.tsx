'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronRight, FaHome } from 'react-icons/fa';

const Breadcrumbs = () => {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter((v) => v);
  
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
    
    return { label, href };
  });

  // Structured Data (AEO/GEO)
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://primotech-llc.com"
      },
      ...breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": crumb.label,
        "item": `https://primotech-llc.com${crumb.href}`
      }))
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50/50 py-4 border-b border-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <ol className="flex items-center gap-3 text-sm font-medium text-gray-500">
          <li className="flex items-center">
            <Link href="/" className="hover:text-[#14C8D4] transition-colors flex items-center gap-2">
              <FaHome className="text-base" />
              <span className="hidden md:inline">Home</span>
            </Link>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-3">
              <FaChevronRight className="text-[10px] text-gray-300" />
              <Link
                href={crumb.href}
                className={`hover:text-[#14C8D4] transition-colors capitalize ${
                  index === breadcrumbs.length - 1 ? 'text-[#001F3F] font-bold pointer-events-none' : ''
                }`}
              >
                {crumb.label}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
