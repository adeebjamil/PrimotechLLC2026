'use client';

import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaShieldAlt, FaSignInAlt, FaLayerGroup } from 'react-icons/fa';

const AdminAuth = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email.trim() || !password) {
            setError('Please enter all credentials');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Access Granted. Initializing Secure Session...');
                setTimeout(() => {
                    window.location.href = '/admin/dashboard';
                }, 1500);
            } else {
                setError(data.message || 'Authentication Failed');
                setIsLoading(false);
            }
        } catch (err) {
            setError('System Error: Connection Refused');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#001F3F] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#14C8D4]/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#14C8D4]/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Brand Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#14C8D4] to-[#0D949D] flex items-center justify-center shadow-2xl shadow-[#14C8D4]/30 animate-pulse">
                            <FaLayerGroup className="text-white text-3xl" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-3xl font-black text-white tracking-tighter leading-none">PRIMOTECH</h1>
                            <p className="text-[10px] font-black text-[#14C8D4] uppercase tracking-[0.3em] mt-2">Enterprise Security</p>
                        </div>
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-white">Administrator Login</h2>
                        <p className="text-white/40 text-sm mt-2 font-medium">Verify your identity to manage the portal.</p>
                    </div>

                    {/* Feedback Messages */}
                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 mb-8 animate-shake">
                            <p className="text-xs text-rose-400 font-bold flex items-center gap-2">
                                <FaShieldAlt className="text-rose-500" />
                                {error}
                            </p>
                        </div>
                    )}

                    {success && (
                        <div className="bg-[#14C8D4]/10 border border-[#14C8D4]/20 rounded-2xl p-4 mb-8 animate-fade-in">
                            <p className="text-xs text-[#14C8D4] font-bold flex items-center gap-2">
                                <FaShieldAlt className="text-[#14C8D4]" />
                                {success}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4">Access Email</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="admin@primotech-llc.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-[#14C8D4] focus:ring-4 focus:ring-[#14C8D4]/10 transition-all placeholder:text-white/10"
                                />
                                <FaEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#14C8D4] transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-4">Secure Password</label>
                            <div className="relative group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm font-bold focus:outline-none focus:border-[#14C8D4] focus:ring-4 focus:ring-[#14C8D4]/10 transition-all placeholder:text-white/10"
                                />
                                <FaLock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#14C8D4] transition-colors" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#14C8D4] hover:bg-[#0D949D] text-[#001F3F] font-black py-4 rounded-2xl shadow-xl shadow-[#14C8D4]/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-[#001F3F] border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span className="uppercase text-[10px] tracking-widest">Authenticate</span>
                                    <FaSignInAlt className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Authorized Access Only</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAuth;