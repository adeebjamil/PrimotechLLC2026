'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';

export default function ConditionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdminPath = pathname?.startsWith('/admin');

    if (isAdminPath) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <Breadcrumbs />
            <main className="flex-grow">{children}</main>
            <Footer />
        </>
    );
}
