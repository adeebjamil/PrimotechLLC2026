'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { FaChevronRight } from 'react-icons/fa';

interface Technology {
    title: string;
    icon: string;
    description: string;
}

interface CategoryData {
    _id: string;
    name: string;
    slug: string;
    description1: string;
    description2: string;
    image1: string;
    image2: string;
    status: 'published' | 'draft';
    order: number;
    technologies: Technology[];
}

interface SubCategoryData {
    _id: string;
    name: string;
    slug: string;
    parentCategory: string;
    image?: string;
    status: 'published' | 'draft';
}

interface ProductData {
    _id: string;
    name: string;
    slug: string;
    category: string;
    description: string;
    images: string[];
    status: 'published' | 'draft';
}

interface ProductCategoryMenuItem {
    title: string;
    slug: string;
    icon: string;
    image?: string;
    description: string;
    items: SubCategoryData[];
}

interface SupportMenuItem {
    title: string;
    icon: string;
    shortTitle: string;
    description: string;
    href: string;
}

interface NavItem {
    label: string;
    href: string;
    submenu?: ProductCategoryMenuItem[] | SupportMenuItem[];
    kind?: 'products' | 'support';
}

interface MobileHistoryItem {
    level: 'main' | 'submenu' | 'products';
    label: string;
    category?: ProductCategoryMenuItem;
}

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [mobileMenuLevel, setMobileMenuLevel] = useState<'main' | 'submenu' | 'products'>('main');
    const [mobileMenuHistory, setMobileMenuHistory] = useState<MobileHistoryItem[]>([]);
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [products, setProducts] = useState<ProductData[]>([]);
    const [subcategories, setSubcategories] = useState<SubCategoryData[]>([]);
    const [loadingMenuData, setLoadingMenuData] = useState(true);
    const [menuDataError, setMenuDataError] = useState(false);
    const [activeProductCategorySlug, setActiveProductCategorySlug] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    // Refs for stable dropdown behavior
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isHoveringRef = useRef<boolean>(false);
    const lastInteractionTimeRef = useRef<number>(Date.now());

    const supportMenuItems: SupportMenuItem[] = [
        {
            title: 'Knowledge Base & FAQ',
            icon: '❓',
            shortTitle: 'FAQ',
            description: 'Find instant answers to common security questions and setup guides.',
            href: '/support/faq',
        },
        {
            title: 'Technical Video Library',
            icon: '🎬',
            shortTitle: 'Video',
            description: 'Watch step-by-step visual demonstrations for system configuration.',
            href: '/support/video',
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchMenuData = async () => {
            try {
                setLoadingMenuData(true);
                setMenuDataError(false);

                const [categoriesResponse, productsResponse, subcategoriesResponse] = await Promise.all([
                    fetch('/api/categories'),
                    fetch('/api/products'),
                    fetch('/api/subcategories'),
                ]);

                const [categoriesData, productsData, subcategoriesData] = await Promise.all([
                    categoriesResponse.json(),
                    productsResponse.json(),
                    subcategoriesResponse.json(),
                ]);

                if (!isMounted) {
                    return;
                }

                if (categoriesData.success) {
                    setCategories(categoriesData.data ?? []);
                }

                if (productsData.success) {
                    setProducts(productsData.data ?? []);
                }

                if (subcategoriesData.success) {
                    setSubcategories(subcategoriesData.data ?? []);
                }
            } catch (error) {
                console.error('Error loading navigation data:', error);
                if (isMounted) {
                    setMenuDataError(true);
                }
            } finally {
                if (isMounted) {
                    setLoadingMenuData(false);
                }
            }
        };

        fetchMenuData();

        return () => {
            isMounted = false;
        };
    }, []);

    const visibleCategories = categories.filter((category) => category.status === 'published');
    const visibleProducts = products.filter((product) => product.status === 'published');

    const visibleSubcategories = subcategories.filter((sub) => sub.status === 'published');

    const productMenuItems: ProductCategoryMenuItem[] = visibleCategories.map((category) => ({
        title: category.name,
        slug: category.slug,
        icon: category.technologies?.[0]?.icon || 'fa-camera',
        image: category.image1 || '',
        description: category.description1 || category.description2 || 'Explore our high-quality solutions.',
        items: visibleSubcategories.filter((sub) => sub.parentCategory === category.name).slice(0, 6),
    }));

    useEffect(() => {
        if (!productMenuItems.length) {
            setActiveProductCategorySlug(null);
            return;
        }

        const hasActiveCategory = productMenuItems.some((category) => category.slug === activeProductCategorySlug);
        if (!hasActiveCategory) {
            setActiveProductCategorySlug(productMenuItems[0].slug);
        }
    }, [activeProductCategorySlug, productMenuItems]);

    const navItems: NavItem[] = [
        {
            label: 'Products',
            href: '/products',
            kind: 'products',
            submenu: productMenuItems,
        },
        {
            label: 'Support',
            href: '/support',
            kind: 'support',
            submenu: supportMenuItems,
        },
        {
            label: 'Partner',
            href: '/partner',
        },
        {
            label: 'Tips & Guides',
            href: '/tips',
        },
    ];

    const activeProductCategory = productMenuItems.find((category) => category.slug === activeProductCategorySlug) || productMenuItems[0];

    // Timeout management helpers
    const clearDropdownTimeout = useCallback(() => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
            dropdownTimeoutRef.current = null;
        }
    }, []);

    const setDropdownTimeout = useCallback((callback: () => void, delay: number) => {
        clearDropdownTimeout();
        dropdownTimeoutRef.current = setTimeout(() => {
            callback();
            dropdownTimeoutRef.current = null;
        }, delay);
    }, [clearDropdownTimeout]);

    // Stable hover handlers
    const handleMouseEnter = useCallback((index: number) => {
        const now = Date.now();
        const timeSinceLastInteraction = now - lastInteractionTimeRef.current;

        if (timeSinceLastInteraction < 50) {
            return;
        }

        lastInteractionTimeRef.current = now;
        isHoveringRef.current = true;
        clearDropdownTimeout();
        setActiveDropdown(index);

        if (navItems[index]?.kind === 'products' && productMenuItems.length > 0) {
            setActiveProductCategorySlug((current) => current || productMenuItems[0].slug);
        }
    }, [clearDropdownTimeout, navItems, productMenuItems]);

    const handleMouseLeave = useCallback(() => {
        isHoveringRef.current = false;

        setDropdownTimeout(() => {
            if (!isHoveringRef.current) {
                setActiveDropdown(null);
            }
        }, 300);
    }, [setDropdownTimeout]);

    const handleDropdownMouseEnter = useCallback(() => {
        isHoveringRef.current = true;
        lastInteractionTimeRef.current = Date.now();
        clearDropdownTimeout();
    }, [clearDropdownTimeout]);

    const handleDropdownMouseLeave = useCallback(() => {
        isHoveringRef.current = false;

        setDropdownTimeout(() => {
            if (!isHoveringRef.current) {
                setActiveDropdown(null);
            }
        }, 400);
    }, [setDropdownTimeout]);

    // Mobile menu handlers
    const openMobileMenu = () => {
        setIsMobileMenuOpen(true);
        setMobileMenuLevel('main');
        setMobileMenuHistory([]);
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setMobileMenuLevel('main');
        setMobileMenuHistory([]);
        document.body.style.overflow = 'unset';
    };

    const navigateToSubmenu = (item: NavItem, index: number) => {
        setMobileMenuHistory([...mobileMenuHistory, { level: mobileMenuLevel, label: item.label }]);
        setActiveDropdown(index);
        setMobileMenuLevel('submenu');

        if (item.kind === 'products' && productMenuItems.length > 0) {
            setActiveProductCategorySlug(productMenuItems[0].slug);
        }
    };

    const navigateToProductCategory = (category: ProductCategoryMenuItem) => {
        setMobileMenuHistory([...mobileMenuHistory, { level: mobileMenuLevel, label: category.title, category }]);
        setActiveProductCategorySlug(category.slug);
        setMobileMenuLevel('products');
    };

    const goBack = () => {
        if (mobileMenuHistory.length > 0) {
            const previous = mobileMenuHistory[mobileMenuHistory.length - 1];
            setMobileMenuLevel(previous.level as 'main' | 'submenu' | 'products');
            setMobileMenuHistory(mobileMenuHistory.slice(0, -1));

            if (previous.category) {
                setActiveProductCategorySlug(previous.category.slug);
            }
        } else {
            setMobileMenuLevel('main');
        }
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            clearDropdownTimeout();
        };
    }, [clearDropdownTimeout]);

    return (
        <>
            {/* Top Announcement Bar - Two Tone Design */}
            <div className="fixed top-0 left-0 right-0 z-[101] flex items-stretch h-[36px] overflow-hidden">
                {/* Left Side: Deep Blue Branding */}
                <div className="bg-[#001F3F] flex-grow flex items-center relative overflow-hidden">
                    <div className="flex items-center gap-12 whitespace-nowrap animate-marquee-rtl py-2">
                        {/* Group 1 */}
                        <div className="flex items-center gap-12">
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                #1 CCTV Supplier in Middle East
                            </span>
                            <span className="text-[#14C8D4]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                #1 Uniarch Products
                            </span>
                            <span className="text-[#14C8D4]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                UAE's Most Trusted Security Partner
                            </span>
                            <span className="text-[#14C8D4]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                24/7 Advanced Surveillance Technology
                            </span>
                            <span className="text-[#14C8D4]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                Authorized Hikvision & Uniarch Dealer
                            </span>
                            <span className="text-[#14C8D4]/30 font-bold">/</span>
                        </div>
                        {/* Group 2 (Duplicate for seamless loop) */}
                        <div className="flex items-center gap-12">
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                #1 CCTV Supplier in Middle East
                            </span>
                            <span className="text-[#14C8D4]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                #1 Uniarch Products
                            </span>
                            <span className="text-[#14C8D4]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                UAE's Most Trusted Security Partner
                            </span>
                            <span className="text-[#14C8D4]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                24/7 Advanced Surveillance Technology
                            </span>
                            <span className="text-[#14C8D4]/30 font-bold">/</span>
                            <span className="text-white text-sm font-semibold tracking-wide flex items-center gap-2.5">
                                <Image src="/greentick.png" alt="tick" width={18} height={18} className="object-contain shrink-0" style={{ height: 'auto' }} />
                                Authorized Hikvision & Uniarch Dealer
                            </span>
                            <span className="text-[#14C8D4]/30 font-bold">/</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Yellow Contact Info */}
                <div className="bg-[#FFD700] flex items-center px-4 md:px-8 relative shrink-0 z-20 h-full ml-[-12px] [clip-path:polygon(12px_0,100%_0,100%_100%,0%_100%)]">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-6 relative z-20 whitespace-nowrap pl-2">
                        <a href="mailto:sales@primotech-llc.com" className="flex text-[#001F3F] text-[8px] md:text-[13px] font-black hover:text-black transition-colors duration-200 items-center gap-1 md:gap-2 leading-none md:leading-normal">
                            <svg className="w-2.5 h-2.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            sales@primotech-llc.com
                        </a>
                        <span className="hidden lg:block text-[#001F3F]/20 font-black">/</span>

                        <a href="tel:+971528796664" className="flex text-[#001F3F] text-[9px] md:text-[13px] font-black hover:text-black transition-colors duration-200 items-center gap-1 md:gap-2 leading-none md:leading-normal">
                            <svg className="w-2.5 h-2.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +971 52 879 6664
                        </a>
                    </div>
                </div>
            </div>

            {/* Desktop Navbar */}
            <nav className={`hidden md:flex items-center justify-between w-full px-8 lg:px-20 py-4 transition-all duration-300 fixed left-0 right-0 z-[100] mt-[36px] ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-white shadow-sm'}`}>
                {/* Logo - Left Side */}
                <div 
                    className="flex items-center space-x-3 flex-shrink-0 cursor-pointer group" 
                    onClick={() => window.location.href = '/'}
                >
                    <div className="relative w-48 h-12 transition-transform duration-300 group-hover:scale-105">
                        <Image 
                            src="/logo.png" 
                            alt="Primo Tech Logo" 
                            fill 
                            sizes="(max-width: 768px) 144px, 192px"
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Navigation Items - Centered */}
                <div className="flex items-center space-x-10 lg:space-x-14">
                    {navItems.map((item, index) => (
                        <div
                            key={index}
                            className="relative"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <a
                                href={item.href}
                                className={`text-[16px] font-bold transition-all duration-300 py-4 flex items-center gap-1.5 ${activeDropdown === index ? 'text-[#14C8D4]' : 'text-[#001F3F] hover:text-[#14C8D4]'
                                    }`}
                                onClick={(e) => {
                                    if (item.submenu) e.preventDefault();
                                }}
                            >
                                {item.label}
                                {item.submenu && (
                                    <svg className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#14C8D4] transition-all duration-300 ${activeDropdown === index ? 'w-full' : 'group-hover:w-1/2'}`}></span>
                            </a>

                            {/* Mega Menus */}
                            {item.submenu && activeDropdown === index && (
                                <div
                                    ref={dropdownRef}
                                    className={`absolute left-1/2 -translate-x-1/2 top-[calc(100%-10px)] ${item.label === 'Support' ? 'w-[800px]' : 'w-[1000px] lg:w-[1050px]'} rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.15)] animate-fadeInUp z-[100] overflow-hidden before:content-[''] before:absolute before:-top-10 before:left-0 before:right-0 before:h-10 before:bg-transparent`}
                                    onMouseEnter={handleDropdownMouseEnter}
                                    onMouseLeave={handleDropdownMouseLeave}
                                >
                                        {item.label === 'Products' ? (
                                            loadingMenuData ? (
                                                <div className="flex min-h-[400px] items-center justify-center">
                                                    <div className="w-12 h-12 border-4 border-[#14C8D4] border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            ) : (
                                                <div className="flex w-full min-h-[500px] bg-white">
                                                    {/* Left Sidebar - Categories */}
                                                    <div className="w-[320px] flex-shrink-0 bg-gray-50/50 border-r border-gray-100 p-6 shadow-[inset_-20px_0_40px_rgba(0,0,0,0.01)]">
                                                        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 px-2">Solutions & Categories</h2>
                                                        <div className="space-y-2">
                                                            {item.submenu.map((subItem, subIndex) => {
                                                                const isProductItem = 'slug' in subItem && 'items' in subItem;
                                                                if (!isProductItem) return null;
                                                                const isActive = subItem.slug === activeProductCategorySlug;
                                                                const categoryImage = 'image' in subItem ? subItem.image : null;

                                                                return (
                                                                    <button
                                                                        key={subIndex}
                                                                        onMouseEnter={() => setActiveProductCategorySlug(subItem.slug)}
                                                                        className={`w-full flex items-center justify-between p-3 rounded-[1.25rem] text-left transition-all duration-300 relative group/btn ${
                                                                            isActive
                                                                                ? 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-gray-100 z-10'
                                                                                : 'hover:bg-white/60 text-gray-600 hover:text-[#001F3F]'
                                                                        }`}
                                                                    >
                                                                        <div className="flex items-center gap-4">
                                                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 overflow-hidden ${
                                                                                isActive 
                                                                                    ? 'bg-[#001F3F] text-white shadow-lg shadow-[#001F3F]/20' 
                                                                                    : 'bg-white text-gray-400 group-hover/btn:text-[#14C8D4] shadow-sm'
                                                                            }`}>
                                                                                {categoryImage ? (
                                                                                    <img 
                                                                                        src={categoryImage} 
                                                                                        alt={subItem.title} 
                                                                                        onError={(e) => {
                                                                                            e.currentTarget.style.display = 'none';
                                                                                            const iconEl = e.currentTarget.nextElementSibling;
                                                                                            if (iconEl) iconEl.classList.remove('hidden');
                                                                                        }}
                                                                                        className="w-full h-full object-cover" 
                                                                                    />
                                                                                ) : null}
                                                                                <i className={`fas ${subItem.icon || 'fa-camera'} text-lg ${categoryImage ? 'hidden' : ''}`} />
                                                                            </div>
                                                                            <div>
                                                                                <span className={`block font-extrabold text-[15px] transition-colors ${isActive ? 'text-[#001F3F]' : ''}`}>{subItem.title}</span>
                                                                                {isActive && <span className="text-xs font-bold text-[#14C8D4] mt-0.5 block">View Products</span>}
                                                                            </div>
                                                                        </div>
                                                                        <FaChevronRight className={`w-3.5 h-3.5 transition-all duration-300 ${
                                                                            isActive 
                                                                                ? 'text-[#14C8D4] translate-x-0 opacity-100' 
                                                                                : 'text-gray-300 -translate-x-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0'
                                                                        }`} />
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                        
                                                        <div className="mt-8 pt-8 border-t border-gray-100/50">
                                                            <a
                                                                href="/products"
                                                                className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-[#001F3F] text-white font-black text-xs uppercase tracking-widest hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all duration-300 shadow-xl shadow-[#001F3F]/10 hover:shadow-[#14C8D4]/20 group"
                                                            >
                                                                View All Products
                                                                <FaChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                            </a>
                                                        </div>
                                                    </div>

                                                    {/* Right Content - Product Grid */}
                                                    <div className="flex-1 p-8 bg-white overflow-y-auto max-h-[500px]">
                                                        {activeProductCategory ? (
                                                            <div className="h-full flex flex-col">
                                                                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
                                                                    <div>
                                                                        <h2 className="text-3xl font-black text-[#001F3F] mb-2">{activeProductCategory.title}</h2>
                                                                        <p className="text-gray-500 font-medium">{activeProductCategory.description}</p>
                                                                    </div>
                                                                    <a
                                                                        href={`/products/${activeProductCategory.slug}`}
                                                                        className="group flex items-center gap-2 bg-gray-50 hover:bg-[#001F3F] text-[#001F3F] hover:text-white px-6 py-3 rounded-full font-bold text-sm transition-all duration-300"
                                                                    >
                                                                        View All
                                                                        <FaChevronRight className="w-3 h-3 text-[#14C8D4] group-hover:translate-x-1 transition-transform" />
                                                                    </a>
                                                                </div>
                                                                
                                                                <div className="grid grid-cols-3 gap-6 mb-10">
                                                                    {activeProductCategory.items.map((subcategory, sIdx) => (
                                                                        <a
                                                                            key={sIdx}
                                                                            href={`/products/${activeProductCategory.slug}/${subcategory.slug}`}
                                                                            className="group relative bg-white border border-gray-100 rounded-[2rem] p-5 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-transparent block"
                                                                        >
                                                                            <div className="aspect-[4/3] bg-gray-50/80 rounded-xl mb-4 flex items-center justify-center p-4 overflow-hidden transition-colors duration-500 group-hover:bg-[#f0fdfe]">
                                                                                <img
                                                                                    src={subcategory.image || '/api/placeholder/400/300'}
                                                                                    alt={subcategory.name}
                                                                                    onError={(e) => { e.currentTarget.src = '/api/placeholder/400/300'; }}
                                                                                    className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                                                                                />
                                                                            </div>
                                                                            <div className="px-2">
                                                                                <h3 className="font-extrabold text-[#001F3F] text-base mb-1 group-hover:text-[#14C8D4] transition-colors">{subcategory.name}</h3>
                                                                                <p className="text-gray-500 text-[11px] line-clamp-1 leading-relaxed mb-3">
                                                                                    Explore our high-performance range of {subcategory.name} solutions designed for advanced security needs.
                                                                                </p>
                                                                                <div className="inline-flex items-center gap-2 text-[#14C8D4] font-black uppercase tracking-widest text-[10px] group-hover:translate-x-1 transition-transform">
                                                                                    Explore Series <FaChevronRight className="text-[8px]" />
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center justify-center h-full text-gray-400 font-medium">
                                                                Select a category to discover our products
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        ) : (
                                            /* SUPPORT DROPDOWN */
                                            <div className="p-8 bg-white/95 backdrop-blur-md">
                                                <div className="grid grid-cols-2 gap-8">
                                                    {item.submenu?.map((subItem, sIdx) => {
                                                        const isSupport = 'href' in subItem;
                                                        if (!isSupport) return null;
                                                        return (
                                                            <a
                                                                key={sIdx}
                                                                href={subItem.href}
                                                                className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-8 overflow-hidden"
                                                            >
                                                                <div className="flex items-start gap-6 relative z-10">
                                                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100/50">
                                                                        {subItem.shortTitle === 'FAQ' ? (
                                                                            <svg className="w-8 h-8 text-[#14C8D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                            </svg>
                                                                        ) : (
                                                                            <svg className="w-8 h-8 text-[#14C8D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                            </svg>
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="text-xl font-black text-[#001F3F] mb-3">{subItem.title}</h3>
                                                                        <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 line-clamp-2">{subItem.description}</p>
                                                                        <div className="inline-flex items-center gap-2 text-[#14C8D4] font-black uppercase tracking-widest text-[10px]">
                                                                            Explore Resource <FaChevronRight className="text-[8px]" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                        </div>
                    ))}
                </div>

                {/* Contact Us - Right Side */}
                <a 
                    href="/contact" 
                    className="bg-[#001F3F] text-white px-8 py-3 rounded-full font-bold text-[16px] transition-all duration-300 hover:bg-[#14C8D4] hover:text-[#001F3F] hover:shadow-lg hover:shadow-[#14C8D4]/20 active:scale-95"
                >
                    Get In Touch
                </a>
            </nav>

            {/* Mobile Navbar */}
            <div className={`md:hidden w-full px-6 py-4 flex items-center justify-between fixed left-0 right-0 z-[100] mt-[36px] transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white shadow-md' : 'bg-white'}`}>
                {/* Logo */}
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = '/'}>
                    <div className="relative w-36 h-10">
                        <Image 
                            src="/logo.png" 
                            alt="Primo Tech Logo" 
                            fill 
                            sizes="(max-width: 768px) 144px, 192px"
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Hamburger / Close Button */}
                <button
                    onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
                    className="text-[#14C8D4] focus:outline-none p-2"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-white z-[90] overflow-y-auto">
                    <div className="p-6 pt-36 min-h-screen flex flex-col">
                        {/* Go Back Section */}
                        {mobileMenuLevel !== 'main' && (
                            <button
                                onClick={goBack}
                                className="flex items-center text-[#001F3F] mb-10 font-black text-xl"
                            >
                                <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back
                            </button>
                        )}

                        {/* Menu Content */}
                        <div className="flex-1">
                            {mobileMenuLevel === 'main' ? (
                                <div className="space-y-2">
                                    {navItems.map((item, index) => (
                                        <div key={index} className="border-b border-gray-50 last:border-0">
                                            {item.submenu ? (
                                                <button
                                                    onClick={() => navigateToSubmenu(item, index)}
                                                    className="w-full flex items-center justify-between py-6 text-left text-2xl font-black text-[#001F3F]"
                                                >
                                                    {item.label}
                                                    <svg className="w-6 h-6 text-[#14C8D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <a href={item.href} className="block py-6 text-2xl font-black text-[#001F3F]">
                                                    {item.label}
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                    <div className="pt-10">
                                        <a href="/contact" className="block w-full py-5 bg-[#14C8D4] text-[#001F3F] text-center rounded-2xl text-xl font-black shadow-lg shadow-[#14C8D4]/20">
                                            Contact Us
                                        </a>
                                    </div>
                                </div>
                            ) : mobileMenuLevel === 'submenu' ? (
                                <div className="space-y-8">
                                    <h3 className="text-4xl font-black text-[#001F3F] mb-10">{navItems[activeDropdown ?? 0]?.label}</h3>
                                    <div className="grid grid-cols-1 gap-5">
                                        {navItems[activeDropdown ?? 0]?.submenu?.map((sub, sIdx) => {
                                            const isProductCat = 'slug' in sub;
                                            return (
                                                <button
                                                    key={sIdx}
                                                    onClick={() => isProductCat ? navigateToProductCategory(sub as ProductCategoryMenuItem) : window.location.href = (sub as SupportMenuItem).href}
                                                    className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-3xl active:bg-[#f0fdfe] transition-colors text-left"
                                                >
                                                    <div className="flex items-center gap-5">
                                                        {isProductCat ? (
                                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#14C8D4] shadow-sm text-2xl overflow-hidden">
                                                                {(sub as ProductCategoryMenuItem).image ? (
                                                                    <img src={(sub as ProductCategoryMenuItem).image} alt={sub.title} className="w-full h-full object-contain p-2" />
                                                                ) : (
                                                                    <i className={`fas ${(sub as ProductCategoryMenuItem).icon}`} />
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div className="w-14 h-14 bg-[#f0fdfe] rounded-2xl flex items-center justify-center text-3xl">
                                                                {(sub as SupportMenuItem).icon}
                                                            </div>
                                                        )}
                                                        <span className="font-extrabold text-[#001F3F] text-xl">{sub.title}</span>
                                                    </div>
                                                    <svg className="w-6 h-6 text-[#14C8D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {navItems[activeDropdown ?? 0]?.kind === 'support' && (
                                        <a href="/support" className="block w-full py-5 bg-[#001F3F] text-white text-center rounded-2xl font-black text-xl mt-10">
                                            Visit Support Center
                                        </a>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    <h3 className="text-3xl font-black text-[#001F3F] mb-10">
                                        {mobileMenuHistory[mobileMenuHistory.length - 1]?.label}
                                    </h3>
                                    <div className="grid grid-cols-1 gap-5">
                                        {mobileMenuHistory[mobileMenuHistory.length - 1]?.category?.items.map((subcat, pIdx) => (
                                            <a
                                                key={pIdx}
                                                href={`/products/${mobileMenuHistory[mobileMenuHistory.length - 1]?.category?.slug}/${subcat.slug}`}
                                                className="flex items-center gap-5 p-5 bg-white border border-gray-100 rounded-3xl shadow-sm active:ring-2 active:ring-[#3B7597]/50"
                                            >
                                                <div className="w-24 h-24 bg-gray-50 rounded-2xl flex-shrink-0 p-3">
                                                    <img src={subcat.image || '/api/placeholder/100/100'} alt={subcat.name} onError={(e) => e.currentTarget.src='/api/placeholder/100/100'} className="w-full h-full object-contain" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-[#001F3F] text-lg leading-tight mb-2">{subcat.name}</h4>
                                                    <p className="text-sm text-gray-500 line-clamp-2 font-medium">Explore series</p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    <a
                                        href={`/products/${mobileMenuHistory[mobileMenuHistory.length - 1]?.category?.slug}`}
                                        className="block w-full py-5 bg-secondary-accent text-white text-center rounded-2xl font-black text-xl mt-10 shadow-xl shadow-secondary-accent/30"
                                    >
                                        View All {mobileMenuHistory[mobileMenuHistory.length - 1]?.label}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeInUp {
                    from { 
                        opacity: 0; 
                        transform: translateY(-10px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .overflow-y-auto::-webkit-scrollbar {
                    width: 6px;
                }
                .overflow-y-auto::-webkit-scrollbar-track {
                    background: transparent;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: #14C8D4;
                    border-radius: 10px;
                }

                @keyframes marquee-rtl {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }

                .animate-marquee-rtl {
                    display: flex;
                    width: fit-content;
                    animation: marquee-rtl 35s linear infinite;
                }
            `}</style>
        </>
    );
};

export default Navbar;