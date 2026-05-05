'use client';

import { useState, useEffect } from 'react';
import { 
    FaBox, 
    FaCheckCircle, 
    FaLayerGroup, 
    FaPlus, 
    FaTimes, 
    FaEdit, 
    FaTrash, 
    FaStar, 
    FaSearch,
    FaCloudUploadAlt
} from 'react-icons/fa';

interface Product {
    _id?: string;
    name: string;
    slug: string;
    category: string;
    subCategory: string;
    subTitle: string;
    description: string;
    images: string[];
    keyFeatures: string[];
    keyHighlights: string[];
    status: 'published' | 'draft';
    isFeatured: boolean;
    technicalSpecs: Record<string, any>;
    createdAt?: string;
}

interface Category {
    _id: string;
    name: string;
}

interface SubCategory {
    _id: string;
    name: string;
    parentCategory: string;
}

const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setCatModalMode] = useState<'add' | 'edit'>('add');
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSubCategory, setSelectedSubCategory] = useState('All');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });

    const [formData, setFormData] = useState<Product>({
        name: '',
        slug: '',
        category: '',
        subCategory: '',
        subTitle: '',
        description: '',
        images: [],
        keyFeatures: [],
        keyHighlights: [],
        status: 'draft',
        isFeatured: false,
        technicalSpecs: {},
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const [prodRes, catRes, subRes] = await Promise.all([
                fetch('/api/products'),
                fetch('/api/categories'),
                fetch('/api/subcategories')
            ]);
            const prodData = await prodRes.json();
            const catData = await catRes.json();
            const subData = await subRes.json();
            if (prodData.success) setProducts(prodData.data);
            if (catData.success) setCategories(catData.data);
            if (subData.success) setSubcategories(subData.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Handle search from URL
        const params = new URLSearchParams(window.location.search);
        const search = params.get('search');
        if (search) {
            setSearchQuery(search);
        }
    }, []);

    const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        setUploadProgress({ current: 0, total: files.length });
        const uploadedUrls: string[] = [...formData.images];

        for (let i = 0; i < files.length; i++) {
            setUploadProgress(prev => ({ ...prev, current: i + 1 }));
            const data = new FormData();
            data.append('file', files[i]);
            try {
                const res = await fetch('/api/upload', { method: 'POST', body: data });
                const result = await res.json();
                if (result.success) uploadedUrls.push(result.url);
            } catch (err) {
                console.error('Upload failed');
            }
        }
        setFormData({ ...formData, images: uploadedUrls });
        setUploading(false);
        setUploadProgress({ current: 0, total: 0 });
    };

    const openAddModal = () => {
        setCatModalMode('add');
        setCurrentProduct(null);
        setFormData({
            name: '',
            slug: '',
            category: categories.length > 0 ? categories[0].name : '',
            subCategory: '',
            subTitle: '',
            description: '',
            images: [],
            keyFeatures: [],
            keyHighlights: [],
            status: 'draft',
            isFeatured: false,
            technicalSpecs: {},
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = modalMode === 'add' ? 'POST' : 'PATCH';
        const body = modalMode === 'add' ? formData : { ...formData, id: currentProduct?._id };
        
        try {
            const res = await fetch('/api/products', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if ((await res.json()).success) {
                fetchData();
                setShowModal(false);
            }
        } catch (error) {
            console.error('Save failed');
        }
    };

    const deleteProduct = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
            if ((await res.json()).success) fetchData();
        } catch (error) { console.error(error); }
    };

    const toggleStatus = async (product: Product) => {
        const newStatus = product.status === 'published' ? 'draft' : 'published';
        try {
            const res = await fetch('/api/products', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: product._id, status: newStatus })
            });
            if ((await res.json()).success) fetchData();
        } catch (error) { console.error(error); }
    };

    const filteredSubCategories = subcategories.filter(sub => sub.parentCategory === formData.category);

    const filteredProducts = products.filter(p => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.subCategory.toLowerCase().includes(query);
        const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSub = selectedSubCategory === 'All' || p.subCategory === selectedSubCategory;
        return matchesSearch && matchesCat && matchesSub;
    });

    if (loading) return <div className="p-20 text-center font-bold text-slate-400">LOADING PRODUCTS...</div>;

    return (
        <div className="min-h-screen pb-20">
            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all duration-500">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Inventory</p>
                        <p className="text-3xl font-black text-slate-900 mt-1">{products.length}</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#001F3F] group-hover:text-white transition-all duration-500">
                        <FaBox className="text-xl" />
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all duration-500">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Featured</p>
                        <p className="text-3xl font-black text-amber-500 mt-1">{products.filter(p => p.isFeatured).length}</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
                        <FaStar className="text-xl" />
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all duration-500">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Status</p>
                        <p className="text-3xl font-black text-emerald-500 mt-1">{products.filter(p => p.status === 'published').length}</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                        <FaCheckCircle className="text-xl" />
                    </div>
                </div>
            </div>

            {/* List Control */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50 space-y-6 bg-slate-50/30">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex-1 w-full max-w-md relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                            <input 
                                type="text" 
                                placeholder="Search inventory..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-slate-600 focus:outline-none focus:ring-4 focus:ring-[#14C8D4]/10 transition-all"
                            />
                        </div>
                        <button
                            onClick={openAddModal}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#001F3F] text-white rounded-2xl hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all duration-300 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#001F3F]/10 w-full md:w-auto justify-center"
                        >
                            <FaPlus />
                            Add New Product
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-4">


                        <div className="flex flex-col gap-2">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Filter Sub-Category</label>
                            <select 
                                value={selectedSubCategory}
                                onChange={(e) => setSelectedSubCategory(e.target.value)}
                                className="bg-white border border-slate-100 rounded-xl px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all cursor-pointer"
                            >
                                <option value="All">All Sub-Categories ({products.filter(p => selectedCategory === 'All' || p.category === selectedCategory).length})</option>
                                {subcategories
                                    .filter(sub => selectedCategory === 'All' || sub.parentCategory === selectedCategory)
                                    .map(sub => {
                                        const count = products.filter(p => p.subCategory === sub.name).length;
                                        return <option key={sub._id} value={sub.name}>{sub.name} ({count})</option>;
                                    })}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product Detail</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pathway</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">State</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Controls</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredProducts.map(product => (
                                <tr key={product._id} className="group hover:bg-slate-50/50 transition-all duration-300">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 flex-shrink-0">
                                                <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 flex items-center gap-2">
                                                    {product.name}
                                                    {product.isFeatured && <FaStar className="text-amber-400 text-[10px]" />}
                                                </span>
                                                <span className="text-[10px] font-medium text-slate-400 uppercase mt-1">{product.subTitle}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black text-[#14C8D4] uppercase tracking-wider">{product.category}</span>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{product.subCategory}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <button 
                                            onClick={() => toggleStatus(product)}
                                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${product.status === 'published' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'}`}
                                        >
                                            {product.status}
                                        </button>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => {
                                                    setCurrentProduct(product);
                                                    setCatModalMode('edit');
                                                    setFormData(product);
                                                    setShowModal(true);
                                                }}
                                                className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => deleteProduct(product._id!)} className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all"><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PRODUCT MODAL - REDESIGNED */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001F3F]/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-4xl overflow-hidden shadow-2xl animate-fade-in my-8 max-h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                            <h3 className="text-xl font-black text-[#001F3F] tracking-tight">{modalMode === 'add' ? 'Add New Product' : 'Edit Product'}</h3>
                            <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
                                <FaTimes />
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                            {/* Row 1: Name & Slug */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Product Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="e.g. Hikvision DS-2CD..."
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 focus:outline-none focus:border-[#14C8D4] transition-all placeholder:text-slate-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">URL Slug</label>
                                    <input 
                                        type="text" 
                                        placeholder="hikvision-ds-2cd"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-xs font-mono text-slate-400 focus:outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Row 2: Subtitle */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Sub Title (Short Tagline)</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. 2 MP Fixed Bullet Network Camera"
                                    value={formData.subTitle}
                                    onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 focus:outline-none focus:border-[#14C8D4] transition-all placeholder:text-slate-300"
                                />
                            </div>

                            {/* Row 3: Category & SubCategory */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Category</label>
                                    <select 
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: '' })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 focus:outline-none focus:border-[#14C8D4] transition-all bg-white"
                                    >
                                        <option value="">Select...</option>
                                        {categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Sub Category</label>
                                    <select 
                                        required
                                        value={formData.subCategory}
                                        onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 focus:outline-none focus:border-[#14C8D4] transition-all bg-white"
                                    >
                                        <option value="">Select...</option>
                                        {filteredSubCategories.map(sub => <option key={sub._id} value={sub.name}>{sub.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Row 4: Description */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Description</label>
                                <textarea 
                                    rows={4}
                                    placeholder="Describe the product..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-medium text-slate-600 focus:outline-none focus:border-[#14C8D4] transition-all resize-none placeholder:text-slate-200"
                                />
                            </div>

                            {/* Row 5: Features & Highlights */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Technical Features (One per line)</label>
                                    <textarea 
                                        rows={6}
                                        placeholder="High quality imaging... IP67-rated water and dust resistance..."
                                        value={formData.keyFeatures.join('\n')}
                                        onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value.split('\n') })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-xs font-bold text-slate-400 leading-relaxed focus:outline-none focus:border-[#14C8D4] transition-all resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Key Highlights (One per line)</label>
                                    <textarea 
                                        rows={6}
                                        placeholder="2 MP HD... Smart Hybrid Light..."
                                        value={formData.keyHighlights.join('\n')}
                                        onChange={(e) => setFormData({ ...formData, keyHighlights: e.target.value.split('\n') })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-xs font-bold text-slate-400 leading-relaxed focus:outline-none focus:border-[#14C8D4] transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {/* Row 6: Images */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Product Images</label>
                                <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6">
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        {formData.images.map((img, idx) => (
                                            <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                                <button 
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== idx) })}
                                                    className="absolute inset-0 bg-rose-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        ))}
                                        <label className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 hover:border-[#14C8D4] hover:text-[#14C8D4] transition-all cursor-pointer">
                                            {uploading ? <div className="w-5 h-5 border-2 border-[#14C8D4] border-t-transparent rounded-full animate-spin"></div> : <FaCloudUploadAlt className="text-xl" />}
                                            <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-4 px-4 py-3 bg-white border border-slate-100 rounded-xl">
                                        <div className="px-3 py-1 bg-slate-50 rounded-lg text-[9px] font-black text-slate-400 uppercase">Choose Files</div>
                                        <span className="text-[10px] font-bold text-slate-300">{formData.images.length > 0 ? `${formData.images.length} files selected` : 'No file chosen'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Row 7: Featured Toggle */}
                            <div className="p-6 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <input 
                                        type="checkbox" 
                                        id="featured"
                                        checked={formData.isFeatured}
                                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                        className="w-5 h-5 rounded-lg border-rose-200 text-rose-500 focus:ring-rose-500/20 transition-all cursor-pointer"
                                    />
                                    <label htmlFor="featured" className="text-sm font-bold text-rose-600 cursor-pointer">Mark as Featured Product</label>
                                </div>
                                <FaStar className={`${formData.isFeatured ? 'text-amber-400' : 'text-slate-200'} text-xl transition-colors`} />
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex gap-4 pt-10 sticky bottom-0 bg-white pb-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-5 bg-slate-50 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all">Cancel</button>
                                <button type="submit" className="flex-1 py-5 bg-[#001F3F] text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-[#14C8D4] hover:text-[#001F3F] shadow-xl shadow-[#001F3F]/20 transition-all">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Upload Progress Overlay */}
            {uploading && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001F3F]/40 backdrop-blur-md animate-fade-in">
                    <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-white/20 flex flex-col items-center gap-6 max-w-xs w-full text-center">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full border-4 border-slate-50 border-t-[#14C8D4] animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FaCloudUploadAlt className="text-2xl text-[#001F3F] animate-bounce" />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-[#001F3F] tracking-tight">Syncing Assets</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                                {uploadProgress.total > 1 
                                    ? `Processing file ${uploadProgress.current} of ${uploadProgress.total}`
                                    : 'Uploading to cloud...'}
                            </p>
                        </div>
                        <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-[#14C8D4] to-[#001F3F] transition-all duration-500 rounded-full"
                                style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;