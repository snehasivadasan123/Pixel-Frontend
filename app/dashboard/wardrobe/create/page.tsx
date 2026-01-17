"use client";

import { useState, useRef, DragEvent } from "react";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, Palette, Upload, X, Check, CloudLightning, Save } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function CreateWardrobePage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Configuration State
    const [selectedColorId, setSelectedColorId] = useState("white");

    // Solid Colors for Background
    const backgroundColors = [
        { id: "white", class: "bg-white", border: "border-gray-200" },
        { id: "gray", class: "bg-gray-100", border: "border-gray-400" },
        { id: "blue", class: "bg-blue-50", border: "border-blue-100" },
        { id: "pink", class: "bg-pink-50", border: "border-pink-100" },
        { id: "yellow", class: "bg-yellow-50", border: "border-yellow-100" },
        { id: "green", class: "bg-green-50", border: "border-green-100" },
        { id: "purple", class: "bg-purple-50", border: "border-purple-100" },
        { id: "black", class: "bg-gray-900", border: "border-gray-700" },
    ];

    const selectedColorClass = backgroundColors.find(c => c.id === selectedColorId)?.class || "bg-white";

    const handleFileSelect = (file: File) => {
        setError(null);
        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file (JPG, PNG, WEBP).");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("File size must be less than 5MB.");
            return;
        }

        setSelectedFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleSave = async () => {
        if (!selectedFile) return;
        setIsProcessing(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('input_image', selectedFile);
            formData.append('bg_color', selectedColorId);

            await apiFetch('/pixel/wardrobe/', {
                method: 'POST',
                body: formData,
            });

            // Redirect on success
            router.push("/dashboard/library");

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to save wardrobe item. Please try again.");
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden animate-enter">
            <style jsx global>{`
            @keyframes fadeUp {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-enter {
                animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
        `}</style>

            <div className="flex-none mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">
                    Add to Wardrobe
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Upload your clothing items to build your digital closet.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">

                {/* Left Panel: Configuration */}
                <div className="flex-none lg:w-96 flex flex-col gap-6 overflow-y-auto custom-scrollbar pb-10">

                    {/* Upload Area */}
                    <div className="bg-white/50 dark:bg-black/20 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/5 p-6 shadow-xl shadow-indigo-500/5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                                <Upload className="h-4 w-4" /> Upload Item
                            </h3>
                        </div>

                        {!selectedFile ? (
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`group cursor-pointer flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed transition-all duration-300 ${isDragging
                                    ? "border-violet-500 bg-violet-50/50 dark:bg-violet-900/10"
                                    : "border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 hover:border-violet-400 hover:bg-violet-50/30"
                                    }`}
                            >
                                <div className="p-4 rounded-full bg-white dark:bg-gray-800 shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                    <CloudLightning className="h-6 w-6 text-violet-500" />
                                </div>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    Click or drag to upload
                                </p>
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                                />
                            </div>
                        ) : (
                            <div className="relative rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden group">
                                <img src={previewUrl!} alt="Selected" className="w-full h-48 object-cover" />
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setPreviewUrl(null); }}
                                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                                    <p className="text-xs text-white truncate px-1">{selectedFile.name}</p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <p className="text-xs text-red-500 mt-2 font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded-lg border border-red-100 dark:border-red-900/50">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Background Color Selection */}
                    <div className="bg-white/50 dark:bg-black/20 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/5 p-6 shadow-xl shadow-indigo-500/5">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2 mb-4">
                            <Palette className="h-4 w-4" /> Background Color
                        </h3>

                        <div className="grid grid-cols-4 gap-3">
                            {backgroundColors.map((color) => (
                                <button
                                    key={color.id}
                                    onClick={() => setSelectedColorId(color.id)}
                                    className={`relative aspect-square rounded-full ${color.class} ${color.border} border shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-black`}
                                >
                                    {selectedColorId === color.id && (
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            <Check className={`h-4 w-4 ${color.id === 'black' ? 'text-white' : 'text-gray-900'}`} />
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleSave}
                        disabled={!selectedFile || isProcessing}
                        className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-white shadow-lg transition-all ${!selectedFile || isProcessing
                            ? "bg-gray-300 dark:bg-gray-800 cursor-not-allowed"
                            : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-indigo-500/30 active:scale-[0.98]"
                            }`}
                    >
                        {isProcessing ? (
                            <span className="animate-pulse">Processing...</span>
                        ) : (
                            <>
                                <Save className="h-5 w-5" /> Save to Wardrobe
                            </>
                        )}
                    </button>
                </div>

                {/* Right Panel: Preview */}
                <div className={`flex-1 rounded-2xl border border-white/20 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-xl flex items-center justify-center relative overflow-hidden transition-colors duration-500 shadow-2xl ${selectedColorClass}`}>

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                    </div>

                    {previewUrl ? (
                        <div className="relative z-10 p-10 w-full h-full flex items-center justify-center">
                            {/* In a real app, we might use an AI service to remove background here */}
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="max-h-full max-w-full object-contain drop-shadow-2xl transition-all duration-500 animate-enter"
                            />
                        </div>
                    ) : (
                        <div className="text-center p-6 opacity-40">
                            <div className="bg-gray-200 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="font-medium text-lg">Preview will appear here</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
