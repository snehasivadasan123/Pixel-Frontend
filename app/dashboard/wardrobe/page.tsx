"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Shirt, AlertCircle, Loader2 } from "lucide-react";
import { apiFetch } from "@/lib/api";

type WardrobeItem = {
    id: number;
    image: string | null;
    bg_color: string;
    created: string;
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
    error_message?: string;
};

export default function WardrobePage() {
    const [items, setItems] = useState<WardrobeItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchWardrobe();
    }, []);

    const fetchWardrobe = async () => {
        try {
            const response: any = await apiFetch("/pixel/wardrobe");
            // The API returns { data: [...] } or just [...]? checking previous logs it seems to be { data: [...] } if wrapped, 
            // but the user's screenshot showed a direct array `data: [...]`. Wait, the screenshot shows `data: [...]` inside a wrapper?
            // "data": [ { "id": 16, ... }, ... ]
            // Assuming the apiFetch returns the parsed JSON.
            // If the response is wrapped in { success: true, data: [...] }:
            const wardrobeList = Array.isArray(response.data) ? response.data :
                Array.isArray(response) ? response : [];

            setItems(wardrobeList);
        } catch (err: any) {
            console.error("Failed to fetch wardrobe:", err);
            setError("Failed to load your wardrobe. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const getBgClass = (colorId: string) => {
        const colors: Record<string, string> = {
            white: "bg-white",
            gray: "bg-gray-100",
            blue: "bg-blue-50",
            pink: "bg-pink-50",
            yellow: "bg-yellow-50",
            green: "bg-green-50",
            purple: "bg-purple-50",
            black: "bg-gray-900",
        };
        return colors[colorId] || "bg-white";
    };

    return (
        <div className="flex flex-col h-full animate-enter">
            <style jsx global>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-enter {
                    animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            {/* Header */}
            <div className="flex-none mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-heading">
                        Your Wardrobe
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage your digital collection of clothing items.
                    </p>
                </div>
                <Link href="/dashboard/wardrobe/create">
                    <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 hover:bg-violet-700 transition-all active:scale-95">
                        <Plus className="h-4 w-4" /> Add Item
                    </button>
                </Link>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2 pb-10">
                {isLoading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
                    </div>
                ) : error ? (
                    <div className="rounded-xl bg-red-50 p-6 text-center text-red-600 dark:bg-red-900/20 dark:text-red-400">
                        <AlertCircle className="mx-auto h-8 w-8 mb-2 opacity-50" />
                        <p>{error}</p>
                        <button
                            onClick={() => { setIsLoading(true); setError(null); fetchWardrobe(); }}
                            className="mt-4 text-sm font-semibold hover:underline"
                        >
                            Try Again
                        </button>
                    </div>
                ) : items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/50 py-20 dark:border-gray-800 dark:bg-gray-900/50">
                        <div className="mb-4 rounded-full bg-white p-4 shadow-sm dark:bg-gray-800">
                            <Shirt className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your wardrobe is empty</h3>
                        <p className="mt-1 text-sm text-gray-500 max-w-xs text-center">
                            Upload your first clothing item to start generating mockups.
                        </p>
                        <Link href="/dashboard/wardrobe/create" className="mt-6">
                            <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700">
                                Upload Item
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                            >
                                <div className={`absolute inset-0 ${getBgClass(item.bg_color)} transition-opacity opacity-50 group-hover:opacity-100`}></div>

                                <div className="absolute inset-0 flex items-center justify-center p-6">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={`Wardrobe item ${item.id}`}
                                            className="h-full w-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-gray-400 p-4 text-center">
                                            <Shirt className="h-8 w-8 opacity-20" />
                                            <span className="text-xs font-medium uppercase tracking-wider">{item.status}</span>
                                            {item.status === 'FAILED' && item.error_message && (
                                                <p className="text-[10px] text-red-500 mt-1 leading-tight break-words w-full">
                                                    {item.error_message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Info Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                                    <p className="text-xs font-medium text-white truncate">
                                        Added {new Date(item.created).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
