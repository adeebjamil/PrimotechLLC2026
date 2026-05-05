"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    FaChartLine,
    FaBox,
    FaEnvelope,
    FaUsers,
    FaRegCalendarAlt,
    FaArrowUp,
    FaArrowRight,
    FaLayerGroup,
    FaMailBulk,
    FaHeadset,
    FaSitemap
} from 'react-icons/fa';

interface Stats {
    products: number;
    enquiries: number;
    subscribers: number;
    contacts: number;
    categories: number;
    subcategories: number;
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/stats');
                const data = await response.json();
                if (data.success) {
                    setStats(data.data);
                }
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-[#14C8D4]/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-[#14C8D4] border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    const statCards = [
        { label: 'Total Products', value: stats?.products || 0, icon: <FaBox />, color: 'bg-emerald-500', trend: '+12%', desc: 'Items in catalog' },
        { label: 'Categories', value: stats?.categories || 0, icon: <FaLayerGroup />, color: 'bg-indigo-500', trend: '+10%', desc: 'Main product lines' },
        { label: 'Sub Categories', value: stats?.subcategories || 0, icon: <FaSitemap />, color: 'bg-violet-500', trend: '+25%', desc: 'Product variations' },
        { label: 'New Enquiries', value: stats?.enquiries || 0, icon: <FaEnvelope />, color: 'bg-amber-500', trend: '+5%', desc: 'Pending response' },
        { label: 'Active Subscribers', value: stats?.subscribers || 0, icon: <FaUsers />, color: 'bg-cyan-500', trend: '+18%', desc: 'Newsletter reach' },
        { label: 'Support Contacts', value: stats?.contacts || 0, icon: <FaHeadset />, color: 'bg-rose-500', trend: '+2%', desc: 'User queries' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden bg-[#001F3F] rounded-[2.5rem] p-10 text-white shadow-2xl shadow-[#001F3F]/20">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-[#14C8D4] animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#14C8D4]">System Live</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                            Good Morning, <span className="text-[#14C8D4]">Manager!</span>
                        </h1>
                        <p className="text-white/60 font-medium max-w-xl">
                            Everything is looking great today. You have <span className="text-[#14C8D4]">{stats?.enquiries || 0} new enquiries</span> waiting for your review.
                        </p>
                    </div>
                    <div className="hidden lg:block">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] text-center min-w-[200px]">
                            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Server Time</p>
                            <p className="text-3xl font-black text-white tabular-nums">
                                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                            </p>
                            <p className="text-[10px] font-bold text-[#14C8D4] mt-1 uppercase tracking-widest">
                                {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#14C8D4]/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#14C8D4]/5 rounded-full blur-[80px] -ml-20 -mb-20"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {statCards.map((card, index) => (
                    <div key={index} className="group bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#14C8D4]/10 transition-all duration-500 hover:-translate-y-1">
                        <div className="flex flex-col h-full space-y-6">
                            <div className="flex items-center justify-between">
                                <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center text-white text-2xl shadow-lg shadow-current/20 group-hover:scale-110 transition-transform duration-500`}>
                                    {card.icon}
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg uppercase tracking-wider">{card.trend}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-4xl font-black text-slate-900 mb-1">{card.value}</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400">{card.desc}</span>
                                <FaArrowRight className="text-slate-300 text-xs group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Analytics Chart Placeholder */}
                {/* Category Performance Matrix - Redesigned Chart */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#14C8D4]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between mb-10">
                        <div>
                            <h2 className="text-2xl font-black text-[#001F3F] tracking-tight">Category Analysis</h2>
                            <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-[0.2em]">Market distribution across product lines</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center gap-3 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                            <span className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black bg-white text-[#001F3F] shadow-sm uppercase tracking-widest border border-slate-100">Market Share</span>
                            <span className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black text-slate-400 hover:text-[#001F3F] uppercase tracking-widest transition-colors cursor-pointer">Live Stats</span>
                        </div>
                    </div>
                    
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        {/* Circular Progress Representation */}
                        <div className="relative flex items-center justify-center py-10">
                            <svg className="w-48 h-48 transform -rotate-90">
                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552.92} strokeDashoffset={552.92 * (1 - 0.75)} strokeLinecap="round" className="text-[#14C8D4] transition-all duration-1000 ease-out" />
                                <circle cx="96" cy="96" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
                                <circle cx="96" cy="96" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={439.82} strokeDashoffset={439.82 * (1 - 0.62)} strokeLinecap="round" className="text-[#001F3F] transition-all duration-1000 delay-300 ease-out" />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-3xl font-black text-[#001F3F]">75%</span>
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Efficiency</span>
                            </div>
                        </div>

                        {/* Legends & Metrics */}
                        <div className="space-y-6">
                            {[
                                { label: 'Surveillance Systems', value: '42%', color: 'bg-[#14C8D4]', trend: 'Up 12.5%' },
                                { label: 'Networking Solutions', value: '28%', color: 'bg-[#001F3F]', trend: 'Stable' },
                                { label: 'Access Control', value: '18%', color: 'bg-slate-200', trend: 'Up 4.2%' },
                                { label: 'Others', value: '12%', color: 'bg-slate-100', trend: 'Down 1.0%' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between group/item">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full ${item.color} shadow-sm group-hover/item:scale-125 transition-transform`}></div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-700">{item.label}</p>
                                            <p className="text-[10px] font-medium text-slate-400">{item.trend}</p>
                                        </div>
                                    </div>
                                    <span className="text-lg font-black text-[#001F3F]">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500">Real-time data aggregation across all sub-categories.</p>
                        <Link href="/admin/categories" className="text-[10px] font-black text-[#14C8D4] uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">
                            View Hierarchy <FaArrowRight />
                        </Link>
                    </div>
                </div>

                {/* Quick Actions & Recent */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm h-full">
                        <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Quick Actions</h2>
                        <div className="space-y-4">
                            {[
                                { name: 'Add New Product', icon: <FaBox />, color: 'bg-emerald-500', href: '/admin/products' },
                                { name: 'Update Categories', icon: <FaLayerGroup />, color: 'bg-[#14C8D4]', href: '/admin/categories' },
                                { name: 'Send Newsletter', icon: <FaMailBulk />, color: 'bg-amber-500', href: '/admin/newsletter' },
                                { name: 'Support Settings', icon: <FaHeadset />, color: 'bg-rose-500', href: '/admin/contact' },
                            ].map((action, i) => (
                                <Link 
                                    key={i} 
                                    href={action.href} 
                                    className="flex items-center justify-between p-4 rounded-[1.5rem] border border-slate-50 hover:border-[#14C8D4]/30 hover:bg-[#14C8D4]/5 transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl ${action.color}/10 flex items-center justify-center text-lg ${action.color.replace('bg-', 'text-')} group-hover:scale-110 transition-transform`}>
                                            {action.icon}
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">{action.name}</span>
                                    </div>
                                    <FaArrowRight className="text-slate-300 text-xs group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
