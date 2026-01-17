'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
    Home,
    Images as ImagesIcon,
    LayoutTemplate,
    Settings,
    Menu,
    X,
    Moon,
    Sun,
    Zap,
    Sparkles,
    Shirt
} from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Your Wardrobe', href: '/dashboard/wardrobe', icon: Shirt },
        { name: 'My Mockups', href: '/dashboard/library', icon: ImagesIcon },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <div className="h-screen w-full overflow-hidden bg-gray-50 transition-colors duration-300 dark:bg-[#09090b] flex flex-col relative selection:bg-violet-500/30">

            {/* Ambient Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-violet-600/10 blur-[100px] animate-spin-slow dark:bg-violet-900/20"></div>
                <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-indigo-600/10 blur-[100px] animate-spin-reverse-slow dark:bg-indigo-900/20"></div>
                <div className="absolute top-[20%] right-[20%] h-[30%] w-[30%] rounded-full bg-fuchsia-400/10 blur-[100px] animate-pulse dark:bg-fuchsia-900/10"></div>
            </div>

            {/* Mobile Header - Only visible on LG and below */}
            <div className="lg:hidden flex-none z-20 flex items-center justify-between border-b border-gray-200/50 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-gray-800/50 dark:bg-black/50">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/20">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">PixelWeave</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                    <span className="sr-only">Open menu</span>
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden h-full z-10 relative">
                {/* Sidebar - Desktop: Static & Full Height, Mobile: Fixed Overlay */}
                <aside
                    className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-gray-200/50 bg-white/60 backdrop-blur-2xl transition-transform duration-300 ease-in-out dark:border-gray-800/50 dark:bg-black/40 lg:static lg:translate-x-0 lg:h-full lg:flex-none flex flex-col overflow-hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <div className="flex h-full flex-col p-4 overflow-y-auto custom-scrollbar">
                        {/* Logo */}
                        <div className="flex-none flex h-16 items-center px-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/30 mr-3">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                                PixelWeave
                            </span>
                        </div>

                        {/* Nav Links */}
                        <nav className="flex-1 space-y-2 py-8">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white'
                                            }`}
                                    >
                                        <item.icon
                                            className={`mr-3 h-5 w-5 transition-colors ${isActive
                                                ? 'text-white'
                                                : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300'
                                                }`}
                                        />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Bottom Actions */}
                        <div className="flex-none space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">

                            {/* Credit Card */}
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-5 text-white shadow-xl dark:from-violet-900/20 dark:to-indigo-900/20 dark:border dark:border-white/10">
                                <div className="absolute top-0 right-0 -mt-2 -mr-2 h-16 w-16 rounded-full bg-white/10 blur-xl"></div>
                                <div className="relative z-10">
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="flex items-center gap-1.5 text-xs font-medium text-gray-300">
                                            <Zap className="h-3 w-3 text-yellow-400" fill="currentColor" />
                                            Credits
                                        </span>
                                        <span className="text-xs font-bold text-white">PRO Plan</span>
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <span className="text-2xl font-bold">12</span>
                                        <span className="mb-1 text-xs text-gray-400">/ 50 remaining</span>
                                    </div>
                                    <div className="mt-3 h-1.5 w-full rounded-full bg-gray-700/50">
                                        <div className="h-1.5 w-[24%] rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                                    </div>
                                    <button className="mt-4 w-full rounded-lg bg-white/10 py-2 text-xs font-semibold hover:bg-white/20 transition-colors">
                                        Upgrade Plan
                                    </button>
                                </div>
                            </div>

                            {/* Theme Toggle & User */}
                            <div className="flex items-center justify-between gap-2 px-2">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 p-[2px]">
                                        <div className="h-full w-full rounded-full bg-white dark:bg-black">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="h-full w-full rounded-full" />
                                        </div>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">John Doe</p>
                                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">john@pixel.ai</p>
                                    </div>
                                </div>

                                {mounted && (
                                    <button
                                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                        className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                    >
                                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 min-w-0 flex flex-col overflow-hidden relative">
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
