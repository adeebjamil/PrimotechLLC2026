"use client";

import React, { useState, useEffect } from "react";
import { FaInbox, FaPlusCircle, FaSpinner, FaCheckDouble, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

interface FormData {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: "new" | "in-progress" | "resolved";
    createdAt: string;
}



const AdminContact = () => {
    const [submissions, setSubmissions] = useState<FormData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedSubmission, setSelectedSubmission] = useState<FormData | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Fetch submissions from API
    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/contact');
            const data = await response.json();
            if (data.success) {
                setSubmissions(data.data);
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    // Filter submissions based on status and search
    const filteredSubmissions = submissions.filter((submission) => {
        const matchesStatus =
            filterStatus === "all" || submission.status === filterStatus;
        const matchesSearch =
            submission.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            submission.subject.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Stats calculations
    const stats = {
        total: submissions.length,
        new: submissions.filter((s) => s.status === "new").length,
        inProgress: submissions.filter((s) => s.status === "in-progress").length,
        resolved: submissions.filter((s) => s.status === "resolved").length,
    };

    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [newSubmission, setNewSubmission] = useState({
        fullName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
        status: 'new' as const
    });

    // Add new submission
    const addSubmission = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSubmission),
            });
            const data = await response.json();
            if (data.success) {
                setSubmissions(prev => [data.data, ...prev]);
                setShowAddModal(false);
                setNewSubmission({
                    fullName: '',
                    email: '',
                    phone: '',
                    subject: 'General Inquiry',
                    message: '',
                    status: 'new'
                });
            } else {
                alert(data.message || 'Failed to add submission');
            }
        } catch (error) {
            console.error('Add submission error:', error);
        }
    };

    // Update submission status
    const updateStatus = async (id: string, newStatus: FormData["status"]) => {
        try {
            const response = await fetch('/api/contact', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            });
            const data = await response.json();
            if (data.success) {
                setSubmissions((prev) =>
                    prev.map((sub) => (sub._id === id ? { ...sub, status: newStatus } : sub))
                );
                if (selectedSubmission && selectedSubmission._id === id) {
                    setSelectedSubmission({ ...selectedSubmission, status: newStatus });
                }
            }
        } catch (error) {
            console.error('Update status error:', error);
        }
    };

    // Delete submission
    const deleteSubmission = async () => {
        if (!deleteId) return;
        try {
            const response = await fetch(`/api/contact?id=${deleteId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                setSubmissions((prev) => prev.filter((sub) => sub._id !== deleteId));
                if (selectedSubmission && selectedSubmission._id === deleteId) {
                    setSelectedSubmission(null);
                }
                setShowDeleteModal(false);
                setDeleteId(null);
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    // Format date
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Status badge colors
    const getStatusBadge = (status: FormData["status"]) => {
        const styles: Record<FormData["status"], string> = {
            new: "bg-blue-100 text-blue-700 border-blue-200",
            "in-progress": "bg-yellow-100 text-yellow-700 border-yellow-200",
            resolved: "bg-green-100 text-green-700 border-green-200",
        };
        const labels: Record<FormData["status"], string> = {
            new: "New",
            "in-progress": "In Progress",
            resolved: "Resolved",
        };
        return (
            <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
            >
                {labels[status]}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <main className="max-w-7xl mx-auto py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <StatCard label="Total Inquiries" value={stats.total} color="gray" icon={<FaInbox />} />
                    <StatCard label="New Support" value={stats.new} color="blue" icon={<FaPlusCircle />} />
                    <StatCard label="In Progress" value={stats.inProgress} color="yellow" icon={<FaSpinner />} />
                    <StatCard label="Resolved" value={stats.resolved} color="green" icon={<FaCheckDouble />} />
                </div>

                {/* Filters & Table */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    {/* Header Action */}
                    <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row gap-6 items-center">
                        <div className="flex-1 relative w-full lg:w-auto">
                            <input 
                                type="text" 
                                placeholder="Search submissions..." 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-teal-500/50 transition-all"
                            />
                            <svg className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <div className="flex gap-4 w-full lg:w-auto shrink-0">


                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Requester</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Inquiry Data</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredSubmissions.map((submission) => (
                                    <tr 
                                        key={submission._id} 
                                        onClick={() => setSelectedSubmission(submission)}
                                        className={`group hover:bg-slate-50/50 transition-all duration-300 cursor-pointer ${selectedSubmission?._id === submission._id ? 'bg-teal-50/30' : ''}`}
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs group-hover:bg-[#14C8D4] group-hover:text-[#001F3F] transition-all duration-300">
                                                    {submission.fullName.charAt(0)}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-bold text-slate-900 truncate">{submission.fullName}</span>
                                                    <span className="text-[10px] font-medium text-slate-400 truncate mt-1">{submission.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-bold text-slate-700 truncate block max-w-[250px]">
                                                {submission.subject}
                                            </span>
                                            <span className="text-[9px] text-slate-400 block mt-1 uppercase tracking-tighter">{formatDate(submission.createdAt)}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            {getStatusBadge(submission.status)}
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); setDeleteId(submission._id); setShowDeleteModal(true); }}
                                                    className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all duration-300"
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
                    {filteredSubmissions.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-sm font-bold text-slate-400">No submissions found matching your filters</p>
                        </div>
                    )}
                </div>

                {/* Detail Case File View - Redesigned */}
                {selectedSubmission && (
                    <div className="mt-8 animate-in slide-in-from-bottom-6 duration-700">
                        <div className="bg-white rounded-[3.5rem] p-10 md:p-12 border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-12 border-b border-slate-50 pb-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-[#001F3F] flex items-center justify-center text-[#14C8D4] text-2xl font-black shadow-lg">
                                            {selectedSubmission.fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{selectedSubmission.fullName}</h3>
                                            <p className="text-sm font-bold text-slate-400 flex items-center gap-2">
                                                Submission ID: <span className="text-[#001F3F]">#{selectedSubmission._id.slice(-8).toUpperCase()}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                <span className="uppercase tracking-widest text-[9px]">{formatDate(selectedSubmission.createdAt)}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedSubmission(null)} 
                                        className="px-8 py-3 bg-slate-50 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm active:scale-95"
                                    >
                                        Dismiss View
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    {/* Main Content: Message & Subject */}
                                    <div className="lg:col-span-2 space-y-10">
                                        {/* Subject Card */}
                                        <div className="bg-slate-50/50 rounded-[2.5rem] p-8 border border-slate-100 relative group overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#14C8D4]/5 rounded-bl-[4rem] transition-all group-hover:scale-150"></div>
                                            <div className="relative z-10">
                                                <p className="text-[10px] font-black text-[#14C8D4] uppercase tracking-widest mb-2">Submission Subject</p>
                                                <h4 className="text-2xl font-black text-[#001F3F] tracking-tight">{selectedSubmission.subject}</h4>
                                            </div>
                                        </div>

                                        {/* Message Transcript */}
                                        <div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-10 h-0.5 bg-[#14C8D4] rounded-full"></div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message Transcript</p>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-slate-100 rounded-full"></div>
                                                <p className="text-lg text-slate-700 leading-relaxed font-medium pl-8 py-2">
                                                    "{selectedSubmission.message}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sidebar: Contact & Status */}
                                    <div className="space-y-8">
                                        <div className="bg-[#001F3F] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#14C8D4]/10 rounded-full blur-2xl transition-transform group-hover:scale-110"></div>
                                            <p className="text-[10px] font-black text-[#14C8D4] uppercase tracking-widest mb-8 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-[#14C8D4] animate-pulse"></div>
                                                Contact Dossier
                                            </p>
                                            <div className="space-y-8 relative z-10">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl text-white/20"><FaUser /></div>
                                                    <div>
                                                        <p className="text-[10px] text-white/40 uppercase font-black tracking-tighter">Legal Name</p>
                                                        <p className="text-sm font-bold text-white">{selectedSubmission.fullName}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl text-white/20"><FaEnvelope /></div>
                                                    <div className="min-w-0">
                                                        <p className="text-[10px] text-white/40 uppercase font-black tracking-tighter">Digital Address</p>
                                                        <a href={`mailto:${selectedSubmission.email}`} className="text-sm font-bold text-white truncate block hover:text-[#14C8D4] transition-colors">{selectedSubmission.email}</a>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl text-white/20"><FaPhone /></div>
                                                    <div>
                                                        <p className="text-[10px] text-white/40 uppercase font-black tracking-tighter">Line Contact</p>
                                                        <a href={`tel:${selectedSubmission.phone}`} className="text-sm font-bold text-white hover:text-[#14C8D4] transition-colors">{selectedSubmission.phone}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Resolution Workflow</p>
                                            <div className="grid grid-cols-1 gap-2">
                                                {['new', 'in-progress', 'resolved'].map((s) => (
                                                    <button 
                                                        key={s} 
                                                        onClick={() => updateStatus(selectedSubmission._id, s as any)} 
                                                        className={`flex items-center justify-between px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                            selectedSubmission.status === s 
                                                            ? 'bg-white text-[#001F3F] shadow-lg border-2 border-[#14C8D4]/20' 
                                                            : 'text-slate-400 hover:bg-white hover:text-slate-600'
                                                        }`}
                                                    >
                                                        {s}
                                                        {selectedSubmission.status === s && <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => { setDeleteId(selectedSubmission._id); setShowDeleteModal(true); }}
                                            className="w-full py-4 bg-rose-50 text-rose-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all border border-rose-100"
                                        >
                                            Purge Submission
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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

                        {/* Modal */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-2xl px-6 pt-6 pb-8 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-8 relative">
                            <div className="absolute top-6 right-6">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg
                                        className="h-6 w-6 text-red-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-semibold text-gray-900 mb-2">
                                        Delete Submission?
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete this submission? This action
                                        cannot be undone.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 sm:flex sm:flex-row-reverse sm:gap-3">
                                <button
                                    onClick={deleteSubmission}
                                    className="inline-flex w-full justify-center rounded-lg px-4 py-2.5 bg-red-600 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:w-auto sm:text-sm"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                    Delete
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-lg px-4 py-2.5 bg-white text-base font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Submission Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setShowAddModal(false)}></div>
                        <div className="inline-block bg-white rounded-2xl px-6 pt-6 pb-8 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full relative">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Create New Submission</h3>
                            <form onSubmit={addSubmission} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={newSubmission.fullName}
                                            onChange={(e) => setNewSubmission({ ...newSubmission, fullName: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={newSubmission.email}
                                            onChange={(e) => setNewSubmission({ ...newSubmission, email: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="text"
                                            value={newSubmission.phone}
                                            onChange={(e) => setNewSubmission({ ...newSubmission, phone: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
                                            placeholder="+1 234 567 890"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                        <input
                                            type="text"
                                            required
                                            value={newSubmission.subject}
                                            onChange={(e) => setNewSubmission({ ...newSubmission, subject: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
                                            placeholder="General Inquiry"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={newSubmission.message}
                                        onChange={(e) => setNewSubmission({ ...newSubmission, message: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none resize-none"
                                        placeholder="Type submission message here..."
                                    />
                                </div>
                                <div className="mt-6 flex gap-3">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-teal-600 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                                    >
                                        Save Submission
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
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
        yellow: 'text-amber-600 bg-amber-50',
        green: 'text-emerald-600 bg-emerald-50'
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

export default AdminContact;