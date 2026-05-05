'use client';

import React, { useState, useEffect } from 'react';
import { FaMailBulk, FaCheckCircle, FaUserSlash, FaExclamationCircle, FaPlus } from 'react-icons/fa';

interface Subscriber {
    _id: string;
    email: string;
    subscribedAt: string;
    status: 'active' | 'unsubscribed' | 'bounced';
    source: 'footer' | 'popup';
    ip: string;
}

// Mock data - Replace with API calls in production


const AdminNewsletter = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [filterSource, setFilterSource] = useState<string>("all");
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 6;

    // Fetch subscribers from API
    const fetchSubscribers = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/newsletter');
            const data = await response.json();
            if (data.success) {
                setSubscribers(data.data);
            }
        } catch (error) {
            console.error('Error fetching subscribers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    // Filter subscribers
    const filteredSubscribers = subscribers.filter((sub) => {
        const matchesSearch = sub.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === "all" || sub.status === filterStatus;
        const matchesSource = filterSource === "all" || sub.source === filterSource;
        return matchesSearch && matchesStatus && matchesSource;
    });

    // Pagination
    const totalPages: number = Math.ceil(filteredSubscribers.length / itemsPerPage);
    const paginatedSubscribers: Subscriber[] = filteredSubscribers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Stats calculations
    const stats = {
        total: subscribers.length,
        active: subscribers.filter(s => s.status === "active").length,
        unsubscribed: subscribers.filter(s => s.status === "unsubscribed").length,
        bounced: subscribers.filter(s => s.status === "bounced").length,
        thisMonth: subscribers.filter(s => {
            const date = new Date(s.subscribedAt);
            const now = new Date();
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        }).length
    };

    // Update subscriber status
    const updateStatus = async (id: string, status: Subscriber['status']) => {
        try {
            const response = await fetch('/api/newsletter', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status }),
            });
            const data = await response.json();
            if (data.success) {
                setSubscribers(prev => prev.map(s => s._id === id ? { ...s, status } : s));
            }
        } catch (error) {
            console.error('Update status error:', error);
        }
    };



    // Delete single subscriber
    const deleteSubscriber = async (): Promise<void> => {
        if (!deleteId) return;
        try {
            const response = await fetch(`/api/newsletter?id=${deleteId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                setSubscribers(prev => prev.filter(s => s._id !== deleteId));
                setShowDeleteModal(false);
                setDeleteId(null);
            } else {
                alert(data.message || 'Failed to delete subscriber');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Error deleting subscriber');
        }
    };

    // Delete selected subscribers
    const deleteSelected = async (): Promise<void> => {
        if (confirm(`Are you sure you want to delete ${selectedRows.length} subscribers?`)) {
            for (const id of selectedRows) {
                try {
                    await fetch(`/api/newsletter?id=${id}`, { method: 'DELETE' });
                } catch (e) {
                    console.error('Failed to delete', id);
                }
            }
            setSubscribers(prev => prev.filter(s => !selectedRows.includes(s._id)));
            setSelectedRows([]);
        }
    };

    // Toggle row selection
    const toggleRowSelection = (id: string): void => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    // Select/deselect all on current page
    const selectAllCurrentPage = (): void => {
        const currentPageIds = paginatedSubscribers.map(s => s._id);
        const allSelected = currentPageIds.every(id => selectedRows.includes(id));

        if (allSelected) {
            setSelectedRows(prev => prev.filter(id => !currentPageIds.includes(id)));
        } else {
            setSelectedRows(prev => [...new Set([...prev, ...currentPageIds])]);
        }
    };

    // Format date
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Status badge component
    const getStatusBadge = (status: Subscriber['status']) => {
        const styles: Record<Subscriber['status'], string> = {
            active: "bg-green-100 text-green-700 border-green-200",
            unsubscribed: "bg-red-100 text-red-700 border-red-200",
            bounced: "bg-orange-100 text-orange-700 border-orange-200"
        };
        const labels: Record<Subscriber['status'], string> = {
            active: "Active",
            unsubscribed: "Unsubscribed",
            bounced: "Bounced"
        };
        const icons = {
            active: (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            unsubscribed: (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            bounced: (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            )
        };
        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
                {icons[status]}
                {labels[status]}
            </span>
        );
    };

    // Source badge component
    const getSourceBadge = (source: Subscriber['source']) => {
        const styles: Record<Subscriber['source'], string> = {
            footer: "bg-blue-50 text-blue-600",
            popup: "bg-purple-50 text-purple-600",
        };
        return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[source] || 'bg-gray-100 text-gray-600'}`}>
                {source.charAt(0).toUpperCase() + source.slice(1)}
            </span>
        );
    };

    // Export to CSV - Reliable Implementation
    const exportToCSV = (): void => {
        if (filteredSubscribers.length === 0) {
            alert("No data available to export.");
            return;
        }

        const headers = ["Email Address", "Status", "Source", "Subscription Date", "IP Address"];
        const rows = filteredSubscribers.map(s => [
            s.email,
            s.status.toUpperCase(),
            s.source.toUpperCase(),
            new Date(s.subscribedAt).toLocaleString(),
            s.ip || 'N/A'
        ]);
        
        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Primotech_Subscribers_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <main className="max-w-7xl mx-auto py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <StatCard label="Total" value={stats.total} color="gray" icon={<FaMailBulk />} />
                    <StatCard label="Active" value={stats.active} color="green" icon={<FaCheckCircle />} />
                    <StatCard label="Unsubscribed" value={stats.unsubscribed} color="red" icon={<FaUserSlash />} />
                    <StatCard label="Bounced" value={stats.bounced} color="orange" icon={<FaExclamationCircle />} />
                    <StatCard label="New Sub" value={stats.thisMonth} color="blue" icon={<FaPlus />} />
                </div>

                {/* Filters & Actions - Streamlined */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden mb-8">
                    <div className="p-8 flex flex-col lg:flex-row gap-6 items-center">
                        <div className="flex-1 relative w-full lg:w-auto">
                            <input 
                                type="text" 
                                placeholder="Search by email address..." 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#14C8D4]/30 transition-all"
                            />
                            <svg className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <div className="flex gap-3 shrink-0 w-full lg:w-auto">
                            <button
                                onClick={exportToCSV}
                                className="flex-1 lg:flex-none px-10 py-4 bg-[#001F3F] text-white rounded-2xl hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all duration-300 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#001F3F]/10 flex items-center justify-center gap-3"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Export Database (CSV)
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bulk Action Bar */}
                {selectedRows.length > 0 && (
                    <div className="mb-6 animate-in slide-in-from-top-4 duration-300">
                        <div className="bg-[#001F3F] rounded-2xl p-4 flex items-center justify-between shadow-2xl">
                            <div className="flex items-center gap-4 px-4">
                                <div className="w-8 h-8 rounded-full bg-[#14C8D4] flex items-center justify-center text-[#001F3F] font-black text-xs">
                                    {selectedRows.length}
                                </div>
                                <span className="text-sm font-bold text-white">Records Selected</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setSelectedRows([])} className="text-xs font-bold text-slate-400 hover:text-white transition-colors mr-2">Deselect All</button>
                                <button
                                    onClick={deleteSelected}
                                    className="px-6 py-2.5 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all font-black text-[10px] uppercase tracking-widest"
                                >
                                    Delete Selection
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Subscribers Table ... (Update row status dropdown) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        <input
                                            type="checkbox"
                                            checked={paginatedSubscribers.every(s => selectedRows.includes(s._id)) && paginatedSubscribers.length > 0}
                                            onChange={selectAllCurrentPage}
                                            className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                                        />
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Email Address
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Source
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Subscribed At
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedSubscribers.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center">
                                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No subscribers found</h3>
                                            <p className="text-gray-500 text-sm">
                                                {searchQuery || filterStatus !== "all" || filterSource !== "all"
                                                    ? "Try adjusting your filters or search query"
                                                    : "No newsletter subscribers yet"}
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedSubscribers.map((subscriber) => (
                                        <tr
                                            key={subscriber._id}
                                            className={`hover:bg-gray-50 transition-colors ${selectedRows.includes(subscriber._id) ? 'bg-teal-50' : ''}`}
                                        >
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(subscriber._id)}
                                                    onChange={() => toggleRowSelection(subscriber._id)}
                                                    className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                                                        {subscriber.email.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <a href={`mailto:${subscriber.email}`} className="text-sm font-medium text-gray-900 hover:text-teal-600 transition-colors">
                                                            {subscriber.email}
                                                        </a>
                                                        <p className="text-xs text-gray-400 mt-0.5">
                                                            IP: {subscriber.ip}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="relative group">
                                                    <select
                                                        value={subscriber.status}
                                                        onChange={(e) => updateStatus(subscriber._id, e.target.value as Subscriber['status'])}
                                                        className={`appearance-none text-xs font-medium px-3 py-1.5 pr-8 rounded-full border focus:ring-2 focus:ring-teal-400 outline-none transition-all cursor-pointer ${subscriber.status === 'active' ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' :
                                                            subscriber.status === 'unsubscribed' ? 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200' :
                                                                'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200'
                                                            }`}
                                                    >
                                                        <option value="active">Active</option>
                                                        <option value="unsubscribed">Unsubscribed</option>
                                                        <option value="bounced">Bounced</option>
                                                    </select>
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-60">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getSourceBadge(subscriber.source)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600">
                                                    {formatDate(subscriber.subscribedAt)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => {
                                                        setDeleteId(subscriber._id);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                                    title="Delete subscriber"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-500">
                                Showing{' '}
                                <span className="font-medium text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span>
                                {' '}to{' '}
                                <span className="font-medium text-gray-900">{Math.min(currentPage * itemsPerPage, filteredSubscribers.length)}</span>
                                {' '}of{' '}
                                <span className="font-medium text-gray-900">{filteredSubscribers.length}</span>
                                {' '}results
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Previous
                                </button>

                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === i + 1
                                            ? 'bg-teal-500 text-white shadow-md'
                                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>



            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={() => setShowDeleteModal(false)}
                        ></div>

                        {/* Spacer for centering */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                        {/* Modal Panel */}
                        <div className="inline-block align-bottom bg-white rounded-2xl px-6 pt-6 pb-8 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-8 relative">
                            {/* Close Button */}
                            <div className="absolute top-6 right-6">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-semibold text-gray-900 mb-2">
                                        Delete Subscriber?
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to remove this email from your newsletter list? This action cannot be undone.
                                    </p>
                                </div>
                            </div>

                            {/* Modal Actions */}
                            <div className="mt-6 sm:flex sm:flex-row-reverse sm:gap-3">
                                <button
                                    onClick={deleteSubscriber}
                                    className="inline-flex w-full justify-center rounded-lg px-4 py-2.5 bg-red-600 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:w-auto sm:text-sm transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-lg px-4 py-2.5 bg-white text-base font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
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
        green: 'text-emerald-600 bg-emerald-50',
        red: 'text-rose-600 bg-rose-50',
        orange: 'text-amber-600 bg-amber-50',
        blue: 'text-blue-600 bg-blue-50'
    };
    return (
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all duration-500">
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg ${colorClasses[color]}`}>
                {icon}
            </div>
        </div>
    );
};

export default AdminNewsletter;