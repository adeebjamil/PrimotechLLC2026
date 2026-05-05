'use client';

import React, { useState, useEffect } from 'react';
import { 
    FaLayerGroup, 
    FaCheckCircle, 
    FaBox, 
    FaPlus, 
    FaTimes, 
    FaTrash, 
    FaEdit, 
    FaLink, 
    FaImage,
    FaChevronRight,
    FaSitemap,
    FaCloudUploadAlt,
    FaSearch
} from 'react-icons/fa';

interface Category {
    _id: string;
    name: string;
    slug: string;
    image1: string;
    image2: string;
    status: 'published' | 'draft';
    order: number;
    description1: string;
    description2: string;
    technologies?: { title: string; icon: string; description: string; }[];
}

interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    parentCategory: string;
    image?: string;
    status: 'published' | 'draft';
}

const AdminCategories = () => {
    const [activeTab, setActiveTab] = useState<'categories' | 'subcategories'>('categories');
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Category Modal State
    const [showCatModal, setShowCatModal] = useState(false);
    const [catModalMode, setCatModalMode] = useState<'add' | 'edit'>('add');
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [catFormData, setCatFormData] = useState({
        name: '',
        slug: '',
        image1: '',
        image2: '',
        status: 'draft' as 'published' | 'draft',
        order: 1,
        description1: '',
        description2: '',
        technologies: [
            { title: '', icon: 'fa-star', description: '' },
            { title: '', icon: 'fa-star', description: '' },
            { title: '', icon: 'fa-star', description: '' },
        ]
    });

    // SubCategory Modal State
    const [showSubModal, setShowSubModal] = useState(false);
    const [subModalMode, setSubModalMode] = useState<'add' | 'edit'>('add');
    const [currentSub, setCurrentSub] = useState<SubCategory | null>(null);
    const [subFormData, setSubFormData] = useState({
        name: '',
        slug: '',
        parentCategory: '',
        image: '',
        status: 'draft' as 'published' | 'draft'
    });

    const [uploading, setUploading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [catRes, subRes] = await Promise.all([
                fetch('/api/categories'),
                fetch('/api/subcategories')
            ]);
            const catData = await catRes.json();
            const subData = await subRes.json();
            if (catData.success) setCategories(catData.data);
            if (subData.success) setSubcategories(subData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredCategories = categories.filter(cat => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredSubCategories = subcategories.filter(sub => 
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.parentCategory.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.success) callback(data.url);
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    // Category Handlers
    const openAddCat = () => {
        setCatModalMode('add');
        setCatFormData({
            name: '', slug: '', image1: '', image2: '', status: 'draft', order: categories.length + 1,
            description1: '', description2: '',
            technologies: [
                { title: '', icon: 'fa-star', description: '' },
                { title: '', icon: 'fa-star', description: '' },
                { title: '', icon: 'fa-star', description: '' },
            ]
        });
        setShowCatModal(true);
    };

    const handleCatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = catModalMode === 'add' ? 'POST' : 'PATCH';
        const body = catModalMode === 'add' ? catFormData : { ...catFormData, id: currentCategory?._id };
        
        try {
            const res = await fetch('/api/categories', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if ((await res.json()).success) {
                fetchData();
                setShowCatModal(false);
            }
        } catch (error) {
            console.error('Save error:', error);
        }
    };

    const deleteCategory = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        try {
            const res = await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
            if ((await res.json()).success) fetchData();
        } catch (error) { console.error(error); }
    };

    const toggleCatStatus = async (cat: Category) => {
        const newStatus = cat.status === 'published' ? 'draft' : 'published';
        try {
            const res = await fetch('/api/categories', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: cat._id, status: newStatus })
            });
            if ((await res.json()).success) fetchData();
        } catch (error) { console.error(error); }
    };

    // SubCategory Handlers
    const deleteSub = async (id: string) => {
        if (!confirm('Are you sure you want to delete this sub-category?')) return;
        try {
            const res = await fetch(`/api/subcategories?id=${id}`, { method: 'DELETE' });
            if ((await res.json()).success) fetchData();
        } catch (error) { console.error(error); }
    };

    const toggleSubStatus = async (sub: SubCategory) => {
        const newStatus = sub.status === 'published' ? 'draft' : 'published';
        try {
            const res = await fetch('/api/subcategories', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: sub._id, status: newStatus })
            });
            if ((await res.json()).success) fetchData();
        } catch (error) { console.error(error); }
    };

    const openAddSub = () => {
        setSubModalMode('add');
        setSubFormData({
            name: '', slug: '', parentCategory: categories.length > 0 ? categories[0].name : '', image: '', status: 'draft'
        });
        setShowSubModal(true);
    };

    const handleSubSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = subModalMode === 'add' ? 'POST' : 'PATCH';
        const body = subModalMode === 'add' ? subFormData : { ...subFormData, id: currentSub?._id };
        
        try {
            const res = await fetch('/api/subcategories', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if ((await res.json()).success) {
                fetchData();
                setShowSubModal(false);
            }
        } catch (error) {
            console.error('Save error:', error);
        }
    };

    if (loading) return <div className="p-20 text-center font-bold text-slate-400">LOADING CONTENT...</div>;

    return (
        <div className="min-h-screen pb-20">
            {/* Header Tabs */}
            <div className="flex gap-4 mb-8">
                <button 
                    onClick={() => setActiveTab('categories')}
                    className={`px-8 py-4 rounded-3xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'categories' ? 'bg-[#001F3F] text-white shadow-xl shadow-[#001F3F]/20' : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'}`}
                >
                    Main Categories
                </button>
                <button 
                    onClick={() => setActiveTab('subcategories')}
                    className={`px-8 py-4 rounded-3xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'subcategories' ? 'bg-[#001F3F] text-white shadow-xl shadow-[#001F3F]/20' : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'}`}
                >
                    Sub Categories
                </button>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center bg-slate-50/30 gap-6">
                    <div className="flex-1 w-full max-w-md relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input 
                            type="text" 
                            placeholder={`Search ${activeTab === 'categories' ? 'categories' : 'sub-categories'}...`} 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-slate-600 focus:outline-none focus:ring-4 focus:ring-[#14C8D4]/10 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">
                                {activeTab === 'categories' ? 'Category Hierarchy' : 'Sub-Category Mapping'}
                            </h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                {activeTab === 'categories' ? 'Manage global segments' : 'Organize product segments'}
                            </p>
                        </div>
                        <button
                            onClick={activeTab === 'categories' ? openAddCat : openAddSub}
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#001F3F] text-white rounded-2xl hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all duration-300 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#001F3F]/10"
                        >
                            <FaPlus />
                            Add {activeTab === 'categories' ? 'Category' : 'Sub Category'}
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identity</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">URL Path</th>
                                {activeTab === 'subcategories' && <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Parent</th>}
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {activeTab === 'categories' ? (
                                filteredCategories.map(cat => (
                                    <tr key={cat._id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                                                    <img src={cat.image1} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="font-bold text-slate-900">{cat.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-xs font-mono text-slate-400">/{cat.slug}</td>
                                        <td className="px-8 py-5">
                                            <button 
                                                onClick={() => toggleCatStatus(cat)}
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${cat.status === 'published' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'}`}
                                            >
                                                {cat.status}
                                            </button>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => { 
                                                    setCurrentCategory(cat); 
                                                    setCatModalMode('edit'); 
                                                    setCatFormData({
                                                        name: cat.name,
                                                        slug: cat.slug,
                                                        image1: cat.image1,
                                                        image2: cat.image2,
                                                        status: cat.status,
                                                        order: cat.order,
                                                        description1: cat.description1,
                                                        description2: cat.description2,
                                                        technologies: cat.technologies || [
                                                            { title: '', icon: 'fa-star', description: '' },
                                                            { title: '', icon: 'fa-star', description: '' },
                                                            { title: '', icon: 'fa-star', description: '' },
                                                        ]
                                                    }); 
                                                    setShowCatModal(true); 
                                                }} className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-teal-500 hover:text-white transition-all"><FaEdit /></button>
                                                <button onClick={() => deleteCategory(cat._id)} className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all"><FaTrash /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                filteredSubCategories.map(sub => (
                                    <tr key={sub._id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                                                    <img src={sub.image || ''} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="font-bold text-slate-900">{sub.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-xs font-mono text-slate-400">/{sub.slug}</td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider">{sub.parentCategory}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <button 
                                                onClick={() => toggleSubStatus(sub)}
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${sub.status === 'published' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'}`}
                                            >
                                                {sub.status}
                                            </button>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => { 
                                                    setCurrentSub(sub); 
                                                    setSubModalMode('edit'); 
                                                    setSubFormData({
                                                        name: sub.name,
                                                        slug: sub.slug,
                                                        parentCategory: sub.parentCategory,
                                                        image: sub.image || '',
                                                        status: sub.status
                                                    }); 
                                                    setShowSubModal(true); 
                                                }} className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-teal-500 hover:text-white transition-all"><FaEdit /></button>
                                                <button onClick={() => deleteSub(sub._id)} className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all"><FaTrash /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* REDESIGNED CATEGORY MODAL */}
            {showCatModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-xl overflow-hidden shadow-2xl animate-fade-in">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-black text-[#001F3F] tracking-tight">{catModalMode === 'add' ? 'Add New Category' : 'Edit Category'}</h3>
                            <button onClick={() => setShowCatModal(false)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleCatSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Category Name</label>
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="e.g. CCTV Cameras"
                                        value={catFormData.name}
                                        onChange={(e) => setCatFormData({ ...catFormData, name: e.target.value, slug: generateSlug(e.target.value) })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-[#14C8D4] transition-all placeholder:text-slate-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">URL Slug</label>
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        placeholder="e.g. cctv-cameras"
                                        value={catFormData.slug}
                                        onChange={(e) => setCatFormData({ ...catFormData, slug: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-xs font-mono text-slate-400 focus:outline-none focus:border-[#14C8D4] transition-all"
                                    />
                                    <FaLink className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Image (Optional)</label>
                                <div className="relative group">
                                    <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                                        <label className="cursor-pointer px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-600 hover:bg-slate-50 transition-all">
                                            {uploading ? '...' : 'Choose File'}
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => setCatFormData({ ...catFormData, image1: url, image2: url }))} />
                                        </label>
                                        <span className="text-[10px] font-bold text-slate-300 truncate">
                                            {catFormData.image1 ? 'Image selected' : 'No file chosen'}
                                        </span>
                                    </div>
                                    {catFormData.image1 && (
                                        <div className="mt-4 w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 shadow-lg group relative">
                                            <img src={catFormData.image1} alt="" className="w-full h-full object-cover" />
                                            <button 
                                                type="button"
                                                onClick={() => setCatFormData({ ...catFormData, image1: '', image2: '' })}
                                                className="absolute inset-0 bg-rose-500/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <FaTrash className="text-xs" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowCatModal(false)} className="flex-1 py-4 bg-slate-50 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all">Cancel</button>
                                <button type="submit" className="flex-1 py-4 bg-[#001F3F] text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-[#14C8D4] hover:text-[#001F3F] shadow-xl shadow-[#001F3F]/20 transition-all">Save Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* REDESIGNED SUB CATEGORY MODAL */}
            {showSubModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-xl overflow-hidden shadow-2xl animate-fade-in">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-black text-[#001F3F] tracking-tight">{subModalMode === 'add' ? 'Add Sub Category' : 'Edit Sub Category'}</h3>
                            <button onClick={() => setShowSubModal(false)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Name</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="e.g. IP Cameras"
                                    value={subFormData.name}
                                    onChange={(e) => setSubFormData({ ...subFormData, name: e.target.value, slug: generateSlug(e.target.value) })}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 focus:outline-none focus:border-[#14C8D4] transition-all placeholder:text-slate-300"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">URL Slug</label>
                                <input 
                                    type="text" 
                                    value={subFormData.slug}
                                    onChange={(e) => setSubFormData({ ...subFormData, slug: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-xs font-mono text-slate-400 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Parent Category</label>
                                <select 
                                    value={subFormData.parentCategory}
                                    onChange={(e) => setSubFormData({ ...subFormData, parentCategory: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 focus:outline-none focus:border-[#14C8D4] transition-all bg-white"
                                >
                                    {categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Image (Optional)</label>
                                <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                                    <label className="cursor-pointer px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-600 hover:bg-slate-50 transition-all">
                                        {uploading ? '...' : 'Choose File'}
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => setSubFormData({ ...subFormData, image: url }))} />
                                    </label>
                                    <span className="text-[10px] font-bold text-slate-300 truncate">
                                        {subFormData.image ? 'Image selected' : 'No file chosen'}
                                    </span>
                                </div>
                                {subFormData.image && (
                                    <div className="mt-4 w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 shadow-lg group relative">
                                        <img src={subFormData.image} alt="" className="w-full h-full object-cover" />
                                        <button 
                                            type="button"
                                            onClick={() => setSubFormData({ ...subFormData, image: '' })}
                                            className="absolute inset-0 bg-rose-500/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <FaTrash className="text-xs" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowSubModal(false)} className="flex-1 py-4 bg-slate-50 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all">Cancel</button>
                                <button type="submit" className="flex-1 py-4 bg-[#001F3F] text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-[#14C8D4] hover:text-[#001F3F] shadow-xl shadow-[#001F3F]/20 transition-all">Save Sub Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Upload Loader Overlay */}
            {uploading && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001F3F]/40 backdrop-blur-md animate-fade-in">
                    <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-white/20 flex flex-col items-center gap-6 max-w-xs w-full text-center">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full border-4 border-slate-50 border-t-[#14C8D4] animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FaCloudUploadAlt className="text-xl text-[#001F3F] animate-pulse" />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-[#001F3F] tracking-tight">Updating Media</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Uploading to secure storage...</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategories;