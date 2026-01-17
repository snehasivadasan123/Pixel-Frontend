'use client';

import React from 'react';
import { Search, Sparkles, Tag, ArrowRight } from 'lucide-react';

export default function TemplatesPage() {

    const categories = [
        { id: 'fashion', name: 'Fashion & Apparel', count: 124 },
        { id: 'marketing', name: 'Marketing Assets', count: 86 },
        { id: 'social', name: 'Social Media', count: 54 },
        { id: 'product', name: 'Product Showcase', count: 32 },
    ];

    const templates = [
        { id: 1, title: 'Minimalist Studio', category: 'Fashion', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop', popular: true },
        { id: 2, title: 'Urban Street', category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1887&auto=format&fit=crop', popular: true },
        { id: 3, title: 'Nature Sunlight', category: 'Outdoor', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop', popular: false },
        { id: 4, title: 'Luxury Boutique', category: 'Retail', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop', popular: true },
        { id: 5, title: 'Neon Night', category: 'Creative', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop', popular: false },
        { id: 6, title: 'Cozy Interior', category: 'Home', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop', popular: false },
    ];

    return (
        <div className="h-full flex flex-col p-6 overflow-hidden">
            {/* Header */}
            <div className="flex-none flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 animate-enter">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-heading">Templates</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Start with a professionally designed scene</p>
                </div>
                <div className="relative group w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search templates..."
                        className="h-10 w-full md:w-80 rounded-xl border border-gray-200 bg-white/50 pl-10 pr-4 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 backdrop-blur-sm transition-all dark:border-gray-800 dark:bg-black/20 dark:text-white"
                    />
                </div>
            </div>

            {/* Content Scroller */}
            <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2 pb-10">

                {/* Categories */}
                <div className="flex gap-4 overflow-x-auto pb-6 animate-enter delay-1 hide-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className="flex-none flex flex-col items-start gap-1 rounded-2xl border border-gray-200 bg-white/40 p-4 w-40 hover:border-violet-400 hover:bg-white/60 transition-all cursor-pointer backdrop-blur-sm dark:border-gray-800 dark:bg-white/5 dark:hover:border-violet-500/50"
                        >
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{cat.name}</span>
                            <span className="text-xs text-gray-500">{cat.count} templates</span>
                        </button>
                    ))}
                </div>

                {/* Popular Templates Grid */}
                <div className="mb-4 flex items-center gap-2 animate-enter delay-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Trending Now</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-enter delay-2">
                    {templates.map((template) => (
                        <div key={template.id} className="group relative aspect-video overflow-hidden rounded-2xl border border-white/20 bg-gray-100 dark:bg-gray-900">
                            <img
                                src={template.image}
                                alt={template.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Content & Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-5 flex flex-col justify-end transition-opacity duration-300">
                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                                            {template.category}
                                        </span>
                                        {template.popular && (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400">
                                                <Sparkles className="h-3 w-3" /> POPULAR
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-white font-heading">{template.title}</h3>

                                    <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-white/20 py-2.5 text-sm font-semibold text-white backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-white hover:text-black">
                                        Use Template <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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
