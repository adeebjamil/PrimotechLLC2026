'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaQuestionCircle, FaQuoteRight, FaDownload, FaPlusCircle, FaSpinner, FaCheckDouble, FaExclamationTriangle } from 'react-icons/fa';

interface Enquiry {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    type: 'quote' | 'download';
    status: 'new' | 'in-progress' | 'resolved';
    createdAt: string;
    productName: string;
    productId: string;
    priority: 'high' | 'medium' | 'low';
}

const AdminEnquiry = () => {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterType, setFilterType] = useState<string>("all");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const fetchEnquiries = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/enquiries');
            const data = await response.json();
            if (data.success) {
                setEnquiries(data.data);
            }
        } catch (error) {
            console.error('Error fetching enquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            if (selectedEnquiry?.productId) {
                try {
                    const res = await fetch(`/api/products?id=${selectedEnquiry.productId}`);
                    const data = await res.json();
                    if (data.success) {
                        setSelectedProduct(data.data);
                    } else {
                        setSelectedProduct(null);
                    }
                } catch (error) {
                    console.error('Error fetching product for enquiry:', error);
                    setSelectedProduct(null);
                }
            } else {
                setSelectedProduct(null);
            }
        };
        fetchProduct();
    }, [selectedEnquiry]);

    // Filter enquiries based on search and filters
    const filteredEnquiries: Enquiry[] = enquiries.filter((enquiry) => {
        const matchesSearch =
            enquiry.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            enquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            enquiry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            enquiry.productName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === "all" || enquiry.type === filterType;
        const matchesStatus = filterStatus === "all" || enquiry.status === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
    });

    // Statistics calculations
    const stats = {
        total: enquiries.length,
        quotes: enquiries.filter((e) => e.type === "quote").length,
        downloads: enquiries.filter((e) => e.type === "download").length,
        new: enquiries.filter((e) => e.status === "new").length,
        inProgress: enquiries.filter((e) => e.status === "in-progress").length,
        resolved: enquiries.filter((e) => e.status === "resolved").length,
        highPriority: enquiries.filter((e) => e.priority === "high").length,
    };

    // Update enquiry status
    const updateStatus = async (id: string, newStatus: Enquiry["status"]) => {
        try {
            const response = await fetch('/api/enquiries', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus })
            });
            const data = await response.json();
            if (data.success) {
                setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: newStatus } : e));
                if (selectedEnquiry?._id === id) {
                    setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
                }
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    // Delete enquiry
    const deleteEnquiry = async () => {
        if (!deleteId) return;
        try {
            const response = await fetch(`/api/enquiries?id=${deleteId}`, { method: 'DELETE' });
            const data = await response.json();
            if (data.success) {
                setEnquiries(prev => prev.filter(e => e._id !== deleteId));
                if (selectedEnquiry?._id === deleteId) setSelectedEnquiry(null);
                setShowDeleteModal(false);
                setDeleteId(null);
            }
        } catch (error) {
            console.error('Error deleting enquiry:', error);
        }
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getTimeAgo = (dateString: string): string => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return formatDate(dateString);
    };

    const TypeBadge = ({ type }: { type: Enquiry["type"] }) => {
        if (type === "quote") {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    Quote Request
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Catalog Download
            </span>
        );
    };

    const StatusBadge = ({ status }: { status: Enquiry["status"] }) => {
        const styles: Record<Enquiry["status"], string> = {
            new: "bg-blue-100 text-blue-700 border-blue-200",
            "in-progress": "bg-yellow-100 text-yellow-700 border-yellow-200",
            resolved: "bg-green-100 text-green-700 border-green-200",
        };
        const labels: Record<Enquiry["status"], string> = {
            new: "New",
            "in-progress": "In Progress",
            resolved: "Resolved",
        };
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${styles[status]}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${status === 'new' ? 'bg-blue-500' : status === 'in-progress' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                {labels[status]}
            </span>
        );
    };

    const PriorityBadge = ({ priority }: { priority: Enquiry["priority"] }) => {
        const styles: Record<Enquiry["priority"], string> = {
            high: "bg-red-100 text-red-700",
            medium: "bg-orange-100 text-orange-700",
            low: "bg-gray-100 text-gray-600",
        };
        return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${styles[priority]}`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
        );
    };

    if (loading) return <div className="p-20 text-center font-medium text-gray-500">Loading Enquiries...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
                    <StatCard label="Total" value={stats.total} color="gray" icon={<FaQuestionCircle />} />
                    <StatCard label="Quotes" value={stats.quotes} color="blue" icon={<FaQuoteRight />} />
                    <StatCard label="Downloads" value={stats.downloads} color="purple" icon={<FaDownload />} />
                    <StatCard label="New" value={stats.new} color="blue" icon={<FaPlusCircle />} />
                    <StatCard label="Progress" value={stats.inProgress} color="yellow" icon={<FaSpinner />} />
                    <StatCard label="Resolved" value={stats.resolved} color="green" icon={<FaCheckDouble />} />
                    <StatCard label="Urgent" value={stats.highPriority} color="red" icon={<FaExclamationTriangle />} />
                </div>

                {/* Filters & Table */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    {/* Filter Header */}
                    <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row gap-4 items-center">
                        <div className="flex-1 relative w-full lg:w-auto">
                            <input 
                                type="text" 
                                placeholder="Search enquiries..." 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-teal-500/50 transition-all"
                            />
                            <svg className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <div className="flex gap-4 w-full lg:w-auto">
                            <select 
                                value={filterStatus} 
                                onChange={(e) => setFilterStatus(e.target.value)} 
                                className="flex-1 lg:w-48 bg-slate-50 border-none rounded-2xl py-3 px-4 text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-teal-500/50"
                            >
                                <option value="all">All Statuses</option>
                                <option value="new">New</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Enquiry Source</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Type</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredEnquiries.map((enquiry) => (
                                    <tr 
                                        key={enquiry._id} 
                                        onClick={() => setSelectedEnquiry(enquiry)}
                                        className={`group hover:bg-slate-50/50 transition-all duration-300 cursor-pointer ${selectedEnquiry?._id === enquiry._id ? 'bg-teal-50/30' : ''}`}
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs group-hover:bg-[#14C8D4] group-hover:text-[#001F3F] transition-all duration-300">
                                                    {enquiry.fullName.charAt(0)}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-bold text-slate-900 truncate">{enquiry.fullName}</span>
                                                    <span className="text-[10px] font-medium text-slate-400 truncate mt-1">{enquiry.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-bold text-slate-700 truncate block max-w-[200px]">
                                                {enquiry.productName}
                                            </span>
                                            <span className="text-[9px] text-slate-400 block mt-1 uppercase tracking-tighter">Ref: {enquiry.productId}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col gap-1.5">
                                                <TypeBadge type={enquiry.type} />
                                                <PriorityBadge priority={enquiry.priority} />
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <StatusBadge status={enquiry.status} />
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); setDeleteId(enquiry._id); setShowDeleteModal(true); }}
                                                    className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all duration-300"
                                                    title="Delete Enquiry"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredEnquiries.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-sm font-bold text-slate-400">No enquiries found matching your filters</p>
                        </div>
                    )}
                </div>

                {/* Detail Drawer - Redesigned Case File View */}
                {selectedEnquiry && (
                    <div className="mt-8 animate-in slide-in-from-bottom-6 duration-700">
                        <div className="bg-white rounded-[3.5rem] p-10 md:p-12 border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-12 border-b border-slate-50 pb-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-[#001F3F] flex items-center justify-center text-[#14C8D4] text-2xl font-black shadow-lg">
                                            {selectedEnquiry.fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Enquiry Deep-Dive</h3>
                                            <p className="text-sm font-bold text-slate-400">Case ID: <span className="text-[#001F3F]">#{selectedEnquiry._id.slice(-8).toUpperCase()}</span></p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedEnquiry(null)} 
                                        className="px-8 py-3 bg-slate-50 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm active:scale-95"
                                    >
                                        Dismiss View
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    {/* Main Content: Message & Product */}
                                    <div className="lg:col-span-2 space-y-10">
                                        <div className="bg-slate-50/50 rounded-[2.5rem] p-8 border border-slate-100 flex items-center gap-8 relative group overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#14C8D4]/5 rounded-bl-[4rem] transition-all group-hover:scale-150"></div>
                                            <div className="w-24 h-24 bg-white rounded-3xl border border-slate-100 flex items-center justify-center overflow-hidden shadow-sm relative z-10 flex-shrink-0">
                                                {selectedProduct?.images?.[0] ? (
                                                    <Image 
                                                        src={selectedProduct.images[0]} 
                                                        alt={selectedProduct.name}
                                                        width={100}
                                                        height={100}
                                                        className="w-full h-full object-contain p-2"
                                                    />
                                                ) : (
                                                    <FaQuoteRight className="text-2xl text-[#14C8D4]" />
                                                )}
                                            </div>
                                            <div className="relative z-10">
                                                <p className="text-[10px] font-black text-[#14C8D4] uppercase tracking-widest mb-1">Targeted Product</p>
                                                <h4 className="text-xl font-black text-[#001F3F] mb-1">{selectedEnquiry.productName}</h4>
                                                <p className="text-xs font-bold text-slate-400">Ref ID: {selectedEnquiry.productId}</p>
                                            </div>
                                        </div>

                                        {/* Requirement Transcript */}
                                        <div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-10 h-0.5 bg-[#14C8D4] rounded-full"></div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Requirement Details</p>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-slate-100 rounded-full"></div>
                                                <p className="text-lg text-slate-700 leading-relaxed font-medium pl-8 py-2">
                                                    "{selectedEnquiry.message}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sidebar: Contact & Status */}
                                    <div className="space-y-8">
                                        <div className="bg-[#001F3F] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#14C8D4]/10 rounded-full blur-2xl"></div>
                                            <p className="text-[10px] font-black text-[#14C8D4] uppercase tracking-widest mb-6 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-[#14C8D4] animate-pulse"></div>
                                                Lead Intelligence
                                            </p>
                                            <div className="space-y-6">
                                                <div>
                                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black mb-1">Name</p>
                                                    <p className="text-base font-bold">{selectedEnquiry.fullName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black mb-1">Electronic Mail</p>
                                                    <p className="text-base font-bold truncate">{selectedEnquiry.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black mb-1">Direct Line</p>
                                                    <p className="text-base font-bold">{selectedEnquiry.phone}</p>
                                                </div>
                                                <div className="pt-6 mt-6 border-t border-white/5">
                                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black mb-1">Synchronized On</p>
                                                    <p className="text-sm font-bold text-[#14C8D4]">{formatDate(selectedEnquiry.createdAt)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Workflow Status</p>
                                            <div className="grid grid-cols-1 gap-2">
                                                {['new', 'in-progress', 'resolved'].map((s) => (
                                                    <button 
                                                        key={s} 
                                                        onClick={() => updateStatus(selectedEnquiry._id, s as any)} 
                                                        className={`flex items-center justify-between px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                            selectedEnquiry.status === s 
                                                            ? 'bg-white text-[#001F3F] shadow-lg border-2 border-[#14C8D4]/20' 
                                                            : 'text-slate-400 hover:bg-white hover:text-slate-600'
                                                        }`}
                                                    >
                                                        {s}
                                                        {selectedEnquiry.status === s && <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-sm p-8 shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">Delete Enquiry?</h3>
                        <p className="text-gray-500 mb-8 text-sm">This action cannot be undone.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-600">Cancel</button>
                            <button onClick={deleteEnquiry} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ label, value, color, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) => {
    const colorClasses: any = {
        gray: 'text-slate-600 bg-slate-50',
        blue: 'text-blue-600 bg-blue-50',
        purple: 'text-purple-600 bg-purple-50',
        yellow: 'text-amber-600 bg-amber-50',
        green: 'text-emerald-600 bg-emerald-50',
        red: 'text-rose-600 bg-rose-50'
    };
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center group hover:shadow-lg transition-all duration-500">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm mb-3 ${colorClasses[color]}`}>
                {icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-xl font-black text-slate-900 mt-1">{value}</p>
        </div>
    );
};

export default AdminEnquiry;