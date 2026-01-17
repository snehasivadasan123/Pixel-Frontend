'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, Heart, Share2, MoreHorizontal, Trash2 } from 'lucide-react';

export default function LibraryPage() {
    const [filter, setFilter] = useState('all');

    // Mock Data for Library Items
    const mockups = [
        { id: 1, title: 'Summer Collection T-Shirt', date: '2 hours ago', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop', type: 't-shirt', liked: true },
        { id: 2, title: 'Urban Hoodie Blue', date: '1 day ago', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop', type: 'hoodie', liked: false },
        { id: 3, title: 'Canvas Tote Bag', date: '2 days ago', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1888&auto=format&fit=crop', type: 'accessory', liked: false },
        { id: 4, title: 'Vintage Cap Mockup', date: '3 days ago', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1935&auto=format&fit=crop', type: 'hat', liked: true },
        { id: 5, title: 'Oversized Streetwear', date: '4 days ago', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop', type: 't-shirt', liked: false },
        { id: 6, title: 'Athletic Leggings', date: '5 days ago', image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=2069&auto=format&fit=crop', type: 'pants', liked: false },
    ];

    const filteredMockups = filter === 'favorites' ? mockups.filter(m => m.liked) : mockups;

    return (
        <div className="h-full flex flex-col p-6 overflow-hidden">
            {/* Header Section */}
            <div className="flex-none flex items-center justify-between mb-8 animate-enter">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-heading">My Library</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and organize your generated mockups</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search mockups..."
                            className="h-10 w-64 rounded-xl border border-gray-200 bg-white/50 pl-10 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 backdrop-blur-sm transition-all dark:border-gray-800 dark:bg-black/20 dark:text-white"
                        />
                    </div>
                    <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 backdrop-blur-sm transition-all dark:border-gray-800 dark:bg-black/20 dark:text-gray-300 dark:hover:bg-white/5">
                        <Filter className="h-4 w-4" /> Filter
                    </button>
                    <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/25 hover:bg-violet-700 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        Upload New
                    </button>
                </div>
            </div>

            {/* Content Container with Glass Effect */}
            <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2 pb-10">

                {/* Tabs */}
                <div className="flex gap-6 border-b border-gray-200/50 mb-6 px-1 dark:border-gray-800/50 animate-enter delay-1">
                    {['All Mockups', 'Favorites', 'Recent', 'Archived'].map((tab) => {
                        const id = tab.toLowerCase().split(' ')[0];
                        const isActive = (filter === 'all' && id === 'all') || filter === id;
                        return (
                            <button
                                key={tab}
                                onClick={() => setFilter(id === 'all' ? 'all' : id)}
                                className={`relative pb-3 text-sm font-medium transition-colors ${isActive
                                        ? 'text-violet-600 dark:text-violet-400'
                                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                    }`}
                            >
                                {tab}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-violet-600 dark:bg-violet-500 animate-enter" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-enter delay-2">
                    {filteredMockups.map((mockup) => (
                        <div
                            key={mockup.id}
                            className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/20 bg-white/40 shadow-xl shadow-indigo-500/5 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-white/5 dark:bg-black/40 backdrop-blur-md"
                        >
                            {/* Image */}
                            <img
                                src={mockup.image}
                                alt={mockup.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay Gradient on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            {/* Top Actions */}
                            <div className="absolute top-3 right-3 flex gap-2 translate-y-[-10px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                <button className={`rounded-full p-2 backdrop-blur-md transition-colors ${mockup.liked ? 'bg-rose-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}>
                                    <Heart className="h-4 w-4" fill={mockup.liked ? "currentColor" : "none"} />
                                </button>
                                <button className="rounded-full bg-white/20 p-2 text-white backdrop-blur-md hover:bg-white/40 transition-colors">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Bottom Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                <h3 className="text-lg font-bold text-white font-heading truncate">{mockup.title}</h3>
                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-xs text-gray-300">{mockup.date}</span>
                                    <div className="flex gap-2">
                                        <button className="rounded-full bg-white/20 p-2 text-white hover:bg-white/40 backdrop-blur-md transition-colors" title="Download">
                                            <Download className="h-4 w-4" />
                                        </button>
                                        <button className="rounded-full bg-white/20 p-2 text-white hover:bg-white/40 backdrop-blur-md transition-colors" title="Share">
                                            <Share2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add New Placeholder */}
                    <button className="group relative aspect-[4/5] flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border-2 border-dashed border-gray-300/50 bg-white/20 transition-all hover:border-violet-500/50 hover:bg-violet-500/5 dark:border-gray-700/50 dark:bg-white/5 dark:hover:bg-white/10">
                        <div className="rounded-full bg-white/50 p-4 shadow-sm group-hover:scale-110 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300 dark:bg-white/10">
                            <span className="text-2xl font-light">+</span>
                        </div>
                        <p className="text-sm font-medium text-gray-500 group-hover:text-violet-600 dark:text-gray-400 dark:group-hover:text-violet-400">Create New</p>
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-enter {
                    animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
                .delay-1 { animation-delay: 0.1s; }
                .delay-2 { animation-delay: 0.2s; }
            `}</style>
        </div>
    );
}
