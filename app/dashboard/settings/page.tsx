'use client';

import React, { useState } from 'react';
import { User, CreditCard, Bell, Shield, Moon, Sun, Monitor, LogOut } from 'lucide-react';

import { apiFetch } from '@/lib/api';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [userCredit, setUserCredit] = useState<number | null>(null);

    React.useEffect(() => {
        if (activeTab === 'billing') {
            apiFetch('/user/profile/').then((data: any) => {
                setUserCredit(data.data.credit);
            }).catch(console.error);
        }
    }, [activeTab]);

    const handleBuyCredits = async () => {
        try {
            const data: any = await apiFetch('/user/payment/create-checkout/', {
                method: 'POST',
                body: JSON.stringify({ amount: 10 }), // Default package
            });
            if (data.session_url) {
                window.location.href = data.session_url;
            }
        } catch (e) {
            console.error('Payment Error', e);
            alert('Failed to initiate payment.');
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
        { id: 'preferences', label: 'Preferences', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    return (
        <div className="h-full flex flex-col p-6 overflow-hidden">

            {/* Header */}
            <div className="flex-none mb-8 animate-enter">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-heading">Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account and app preferences</p>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden animate-enter delay-1">

                {/* Sidebar Navigation */}
                <div className="flex-none lg:w-64 flex flex-col gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                                : 'text-gray-600 hover:bg-white/50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white'
                                }`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}

                    <div className="mt-auto pt-8">
                        <button className="flex w-full items-center gap-3 rounded-xl border border-red-200 bg-red-50/50 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-100 transition-all dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-400">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
                    <div className="rounded-3xl border border-white/20 bg-white/40 p-8 shadow-xl backdrop-blur-xl dark:border-white/5 dark:bg-black/20">

                        {/* Profile Section */}
                        {activeTab === 'profile' && (
                            <div className="space-y-8 animate-enter">
                                <section>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Personal Information</h2>
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                                            JS
                                        </div>
                                        <div className="space-y-2">
                                            <button className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
                                                Change Avatar
                                            </button>
                                            <p className="text-xs text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">First Name</label>
                                            <input type="text" defaultValue="John" className="w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-2.5 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-gray-700 dark:bg-gray-900/50 dark:text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Last Name</label>
                                            <input type="text" defaultValue="Smith" className="w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-2.5 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-gray-700 dark:bg-gray-900/50 dark:text-white" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                                            <input type="email" defaultValue="john.smith@example.com" className="w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-2.5 text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-gray-700 dark:bg-gray-900/50 dark:text-white" />
                                        </div>
                                    </div>
                                </section>

                                <div className="flex justify-end pt-4">
                                    <button className="px-6 py-2.5 rounded-xl bg-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:bg-violet-700 transition-all">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Billing Section (Placeholder) */}
                        {activeTab === 'billing' && (
                            <div className="space-y-6 animate-enter">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Subscription & Credits</h2>

                                <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white shadow-lg">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-violet-200 text-sm font-medium">Account Credits</p>
                                            <h3 className="text-2xl font-bold">{userCredit !== null ? userCredit : 'Loading...'}</h3>
                                        </div>
                                        <button
                                            onClick={handleBuyCredits}
                                            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm transition-all"
                                        >
                                            Buy More
                                        </button>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-violet-100">Credit Usage</span>
                                            <span className="font-bold">{userCredit !== null ? userCredit : 0} Available</span>
                                        </div>
                                        {/* Progress bar could represent usage relative to a goal or cap, simplistic for now */}
                                        <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                                            <div className="h-full bg-white/90 w-full rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8">Payment Methods</h3>
                                    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white/50 p-4 dark:border-gray-700 dark:bg-gray-800/30">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-500">VISA</div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">•••• 4242</p>
                                                <p className="text-xs text-gray-500">Expires 12/28</p>
                                            </div>
                                        </div>
                                        <button className="text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white">Edit</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Placeholder for others */}
                        {['preferences', 'security'].includes(activeTab) && (
                            <div className="flex flex-col items-center justify-center py-20 text-center animate-enter">
                                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 dark:bg-gray-800">
                                    <SettingsIcon className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Coming Soon</h3>
                                <p className="text-gray-500 max-w-sm mt-2">This section is currently under development. Check back later for updates.</p>
                            </div>
                        )}

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
            `}</style>
        </div>
    );
}

function SettingsIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}
