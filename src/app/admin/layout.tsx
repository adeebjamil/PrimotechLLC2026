"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FaTachometerAlt,
    FaBox,
    FaEnvelope,
    FaLayerGroup,
    FaMailBulk,
    FaHeadset,
    FaSignOutAlt,
    FaSearch,
    FaUserCircle,
    FaChevronRight,
    FaSync
} from 'react-icons/fa';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const [isChecking, setIsChecking] = React.useState(true);

    React.useEffect(() => {
        // Skip auth check on the login page itself
        if (pathname === '/admin' || pathname === '/admin/') {
            setIsChecking(false);
            return;
        }

        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth');
                if (!res.ok) {
                    window.location.href = '/admin';
                } else {
                    setIsChecking(false);
                }
            } catch (error) {
                window.location.href = '/admin';
            }
        };
        checkAuth();
    }, [pathname]);

    const handleSignOut = async () => {
        try {
            await fetch('/api/auth', { method: 'DELETE' });
            window.location.href = '/admin';
        } catch (error) {
            window.location.href = '/admin';
        }
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        // For now, we'll redirect to products page with search query
        window.location.href = `/admin/products?search=${encodeURIComponent(searchQuery)}`;
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt />, href: '/admin/dashboard' },
        { id: 'categories', label: 'Categories', icon: <FaLayerGroup />, href: '/admin/categories' },
        { id: 'products', label: 'Products', icon: <FaBox />, href: '/admin/products' },
        { id: 'enquiry', label: 'Enquiries', icon: <FaEnvelope />, href: '/admin/enquiry' },
        { id: 'newsletter', label: 'Newsletter', icon: <FaMailBulk />, href: '/admin/newsletter' },
        { id: 'contact', label: 'Contact', icon: <FaHeadset />, href: '/admin/contact' },
    ];

    // If it's the login page, don't show the nav
    if (pathname === '/admin' || pathname === '/admin/') {
        return <>{children}</>;
    }

    if (isChecking) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#14C8D4] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Verifying Session...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-[#F8FAFC] flex overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 bg-[#001F3F] text-white h-screen fixed left-0 top-0 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.1)]">
                {/* Logo Section */}
                <div className="p-8">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14C8D4] to-[#0D949D] flex items-center justify-center shadow-lg shadow-[#14C8D4]/20 group-hover:scale-110 transition-transform duration-300">
                            <FaLayerGroup className="text-white text-lg" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tight leading-none">PRIMOTECH</span>
                            <span className="text-[10px] font-bold text-[#14C8D4] tracking-[0.2em] uppercase mt-1">Admin Portal</span>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                    <div className="px-4 mb-4">
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Main Menu</p>
                    </div>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                                    isActive 
                                    ? 'bg-[#14C8D4] text-[#001F3F] shadow-lg shadow-[#14C8D4]/20' 
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <div className="flex items-center gap-3.5">
                                    <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="font-bold text-sm tracking-wide">{item.label}</span>
                                </div>
                                {isActive && <FaChevronRight className="text-[10px]" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer - User & Logout */}
                <div className="p-6 mt-auto border-t border-white/5">
                    <div className="bg-white/5 rounded-2xl p-4 mb-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#14C8D4]/10 flex items-center justify-center text-[#14C8D4]">
                                <FaUserCircle className="text-2xl" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold truncate">Administrator</span>
                                <span className="text-[10px] font-medium text-white/40 truncate">admin@primotech.com</span>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-300 font-bold text-xs"
                        >
                            <FaSignOutAlt />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 lg:ml-72 overflow-hidden relative">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
                    {/* Left: Search Bar Placeholder */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-md relative hidden md:block">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                        <input 
                            type="text" 
                            placeholder="Search everything..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-100 border-none rounded-2xl py-2.5 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-[#14C8D4]/50 transition-all"
                        />
                    </form>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-6 ml-auto">
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handleRefresh}
                                className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#14C8D4]/10 hover:text-[#14C8D4] transition-all relative group"
                                title="Refresh Page Data"
                            >
                                <FaSync className="text-sm group-hover:rotate-180 transition-transform duration-500" />
                            </button>
                        </div>
                        <div className="h-8 w-px bg-slate-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black text-slate-900 uppercase tracking-wider leading-none">Manager</p>
                                <p className="text-[10px] font-bold text-[#14C8D4] mt-1">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center text-slate-400">
                                <FaUserCircle className="text-2xl" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8 relative">
                    {/* Background Decorative Glows */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#14C8D4]/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#14C8D4]/5 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none"></div>
                    
                    <div className="relative z-10 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Navigation - Only visible on small screens */}
            <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[100]">
                <nav className="bg-[#001F3F]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-2 flex items-center justify-around shadow-2xl">
                    {navItems.slice(0, 5).map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`p-4 rounded-2xl transition-all ${isActive ? 'bg-[#14C8D4] text-[#001F3F]' : 'text-white/60'}`}
                            >
                                <span className="text-xl">{item.icon}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
