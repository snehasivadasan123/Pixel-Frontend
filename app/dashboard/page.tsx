'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Images, LayoutTemplate, ArrowRight, Sparkles } from 'lucide-react';

export default function DashboardPage() {

    // Quick Actions Data
    const quickActions = [
        {
            title: 'Create New Mockup',
            description: 'Generate high-quality product mockups with AI.',
            icon: Plus,
            href: '/dashboard/create',
            color: 'bg-violet-500',
            textColor: 'text-violet-500',
            bg: 'bg-violet-50'
        },
        {
            title: 'Create New Wardrobe',
            description: 'Generate high-quality product mockups with AI.',
            icon: Plus,
            href: '/dashboard/wardrobe/create',
            color: 'bg-violet-500',
            textColor: 'text-violet-500',
            bg: 'bg-violet-50'
        },
        {
            title: 'Browse Library',
            description: 'View, download, and manage your generated images.',
            icon: Images,
            href: '/dashboard/library',
            color: 'bg-indigo-500',
            textColor: 'text-indigo-500',
            bg: 'bg-indigo-50'
        },
        {
            title: 'Explore Templates',
            description: 'Start with professionally designed scene templates.',
            icon: LayoutTemplate,
            href: '/dashboard/templates',
            color: 'bg-fuchsia-500',
            textColor: 'text-fuchsia-500',
            bg: 'bg-fuchsia-50'
        }
    ];

    return (
        <div className="h-full flex flex-col p-6 overflow-hidden">
            {/* Header */}
            <div className="flex-none mb-10 animate-enter">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-heading">Dashboard Overview</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back to PixelWeave.</p>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2 pb-10">

                {/* 1. Quick Stats / Welcome Banner */}
                <div className="mb-8 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden animate-enter delay-1">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Ready to create something amazing?</h2>
                                <p className="text-indigo-100 max-w-lg">
                                    Your AI-powered design studio is ready. Generate realistic product mockups in seconds.
                                </p>
                            </div>
                            <Link href="/dashboard/create">
                                <button className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-600 shadow-lg hover:bg-gray-50 transition-all active:scale-95">
                                    <Sparkles className="h-4 w-4" /> Start Generating
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 2. Quick Actions Grid */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 animate-enter delay-2">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-enter delay-2">
                    {quickActions.map((action) => (
                        <Link
                            key={action.title}
                            href={action.href}
                            className="group relative flex flex-col justify-between rounded-2xl border border-white/20 bg-white/40 p-6 shadow-xl shadow-indigo-500/5 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-white/5 dark:bg-black/40 backdrop-blur-md"
                        >
                            <div>
                                <div className={`mb-4 w-12 h-12 rounded-xl ${action.bg} dark:bg-gray-800 flex items-center justify-center transition-colors group-hover:scale-110 duration-300`}>
                                    <action.icon className={`h-6 w-6 ${action.textColor}`} />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{action.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{action.description}</p>
                            </div>
                            <div className="mt-6 flex items-center text-sm font-semibold text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                Open <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 3. Recent Activity Placeholder */}
                <div className="animate-enter delay-3">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Generations</h3>
                        <Link href="/dashboard/library" className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400">
                            View All
                        </Link>
                    </div>

                    {/* Empty State / Placeholder for now as we don't want to duplicate Library logic here just yet */}
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white/30 p-8 text-center dark:border-gray-700 dark:bg-white/5">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Your recent mockups will appear here. Start creating to populate this list!
                        </p>
                    </div>
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
                .delay-3 { animation-delay: 0.3s; }
            `}</style>
        </div>
    );
}
