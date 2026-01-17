'use client';

import { useState, useRef, DragEvent, useEffect } from 'react';
import { MagicLoader } from '@/components/ui/loaders';
import { useRouter } from 'next/navigation';
import { User, Image as ImageIcon, Briefcase, Sun, Globe, Shirt } from 'lucide-react';
import { apiFetch, Mockup } from '@/lib/api';

export default function CreateMockupPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Configuration State
    const [modelGender, setModelGender] = useState('female');
    const [modelEthnicity, setModelEthnicity] = useState('diverse');
    const [background, setBackground] = useState('studio_white');

    // Modal States
    const [showEthnicityModal, setShowEthnicityModal] = useState(false);
    const [showEnvironmentModal, setShowEnvironmentModal] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const validateFile = (file: File): boolean => {
        if (!file.type.startsWith('image/')) {
            setError('Supported formats: JPG, PNG, WEBP.');
            return false;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('File must be smaller than 5MB.');
            return false;
        }
        return true;
    };

    const handleFileSelect = (file: File) => {
        setError(null);
        if (validateFile(file)) {
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
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

    const [garmentType, setGarmentType] = useState('t-shirt'); // Default

    const handleGenerate = async () => {
        if (!selectedFile) return;
        setIsGenerating(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('input_image', selectedFile);
            formData.append('garment_type', garmentType);
            formData.append('image_size', '1080x1350'); // Default

            // Model JSON
            const modelData = {
                gender: modelGender,
                // ethnicity: modelEthnicity // API might expect specific format, sending ID for now or simplistic
                // Mapping ID to description if needed, or just sending ID if API understands
                ethnicity: modelEthnicity
            };
            formData.append('model', JSON.stringify(modelData));

            // Background JSON
            const bgData = {
                type: background
            };
            formData.append('background', JSON.stringify(bgData));

            // 1. Initiate Generation
            const startResponse: any = await apiFetch('/pixel/mockup/', {
                method: 'POST',
                body: formData,
            });

            const jobId = startResponse.data?.id;
            if (!jobId) throw new Error('Failed to start generation');

            // 2. Poll for Status
            const pollInterval = setInterval(async () => {
                try {
                    // Fetch list to find our job (optimally API has /pixel/mockup/{id})
                    // Assuming list for now as per docs
                    const listResponse: any = await apiFetch('/pixel/mockup/');
                    const job = listResponse.find((j: any) => j.id === jobId);

                    if (job) {
                        if (job.status === 'COMPLETED') {
                            clearInterval(pollInterval);
                            setPreviewUrl(job.mockup || job.image); // Use result URL
                            setIsGenerating(false);
                            // Optionally refresh history list if we have one
                        } else if (job.status === 'FAILED') {
                            clearInterval(pollInterval);
                            setError(job.error_message || 'Generation failed.');
                            setIsGenerating(false);
                        }
                        // If PENDING or PROCESSING, continue polling
                    }
                } catch (e) {
                    // Ignore transient polling errors
                    console.error('Polling error', e);
                }
            }, 3000);

            // Safety timeout (e.g., 2 minutes)
            setTimeout(() => {
                clearInterval(pollInterval);
                if (isGenerating) {
                    setIsGenerating(false);
                    setError('Generation timed out.');
                }
            }, 120000);

        } catch (err: any) {
            setError(err.message || 'Generation failed. Please try again.');
            setIsGenerating(false);
        }
    };

    // Extended Data Lists
    const ethnicities = [
        { id: 'diverse', label: 'Diverse', color: 'bg-indigo-100' },
        { id: 'caucasian', label: 'Caucasian', color: 'bg-rose-100' },
        { id: 'african', label: 'African', color: 'bg-amber-100' },
        { id: 'asian', label: 'Asian', color: 'bg-emerald-100' },
        { id: 'latino', label: 'Latino', color: 'bg-orange-100' },
        { id: 'south_asian', label: 'South Asian', color: 'bg-fuchsia-100' },
        { id: 'middle_eastern', label: 'Middle Eastern', color: 'bg-teal-100' },
    ];

    const environments = [
        { id: 'studio_white', label: 'Studio', color: 'bg-gray-100' },
        { id: 'street_style', label: 'Street', color: 'bg-zinc-800' },
        { id: 'nature', label: 'Nature', color: 'bg-green-800' },
        { id: 'industrial', label: 'Industrial', color: 'bg-slate-700' },
        { id: 'cafe', label: 'Cafe', color: 'bg-amber-900' },
        { id: 'beach', label: 'Beach', color: 'bg-blue-400' },
        { id: 'luxury_store', label: 'Luxury Store', color: 'bg-neutral-900' },
        { id: 'minimalist_home', label: 'Home', color: 'bg-stone-200' },
    ];

    // Reusable Modal Component
    const SelectionModal = ({
        isOpen,
        onClose,
        title,
        options,
        selectedId,
        onSelect,
        type = 'ethnicity'
    }: {
        isOpen: boolean;
        onClose: () => void;
        title: string;
        options: any[];
        selectedId: string;
        onSelect: (id: string) => void;
        type?: 'ethnicity' | 'environment';
    }) => {
        if (!isOpen) return null;
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose}></div>
                <div className="relative w-full max-w-2xl transform rounded-3xl border border-white/20 bg-white/80 backdrop-blur-2xl p-6 shadow-2xl transition-all animate-enter dark:bg-black/80 dark:border-white/10">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{title}</h3>
                        <button onClick={onClose} className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10">
                            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 max-h-[60vh] overflow-y-auto custom-scrollbar p-1">
                        {options.map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => { onSelect(opt.id); onClose(); }}
                                className={`group relative flex flex-col gap-2 overflow-hidden rounded-xl border p-3 text-left transition-all hover:scale-[1.02] ${selectedId === opt.id
                                    ? 'border-violet-500 ring-1 ring-violet-500 bg-violet-50/50 dark:bg-violet-900/20'
                                    : 'border-gray-200 bg-white/50 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800/50'
                                    }`}
                            >
                                {type === 'environment' ? (
                                    <div className={`h-24 w-full rounded-lg ${opt.color} shadow-inner`}></div>
                                ) : (
                                    <div className={`h-10 w-10 rounded-full ${opt.color} flex items-center justify-center`}>
                                        <User className="h-5 w-5 text-gray-600 opacity-50" />
                                    </div>
                                )}
                                <span className="font-semibold text-gray-900 dark:text-white">{opt.label}</span>
                                {selectedId === opt.id && <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-violet-600"></div>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
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
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <SelectionModal
                isOpen={showEthnicityModal}
                onClose={() => setShowEthnicityModal(false)}
                title="Select Ethnicity"
                options={ethnicities}
                selectedId={modelEthnicity}
                onSelect={setModelEthnicity}
                type="ethnicity"
            />

            <SelectionModal
                isOpen={showEnvironmentModal}
                onClose={() => setShowEnvironmentModal(false)}
                title="Select Environment"
                options={environments}
                selectedId={background}
                onSelect={setBackground}
                type="environment"
            />

            {/* Main Container - Full height flex column that takes available space from layout */}
            <div className={`flex flex-col gap-4 lg:flex-row h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

                {/* LEFT Panel: Controls - Scrollable */}
                <div className="flex-none lg:w-96 flex flex-col gap-4 animate-enter delay-1 min-h-0">
                    <div className="flex-none px-1">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white drop-shadow-sm font-heading">New Mockup</h1>
                        <p className="text-xs text-gray-500 font-medium">Configure generation details</p>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl p-5 shadow-xl shadow-indigo-500/5 dark:border-white/5 dark:bg-black/40 dark:shadow-none">
                        <div className="space-y-6">

                            {/* Error Toast */}
                            {error && (
                                <div className="rounded-lg bg-red-50/90 p-3 text-xs text-red-700 backdrop-blur dark:bg-red-900/30 dark:text-red-300">
                                    {error}
                                </div>
                            )}

                            {/* 1. Upload Section */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                                    <ImageIcon className="h-3 w-3" /> Source Image
                                </label>
                                {!selectedFile ? (
                                    <div
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`group relative flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300 ${isDragging
                                            ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01] dark:bg-indigo-900/20'
                                            : 'border-gray-300/60 bg-white/40 hover:border-violet-400 hover:bg-violet-50/30 hover:backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/30'
                                            }`}
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="rounded-full bg-white p-2 shadow-sm dark:bg-gray-800">
                                                <ImageIcon className="h-5 w-5 text-gray-400 group-hover:text-violet-500" />
                                            </div>
                                            <span className="text-xs font-medium text-gray-500 group-hover:text-violet-600">Click to Upload</span>
                                        </div>
                                        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                    </div>
                                ) : (
                                    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
                                        <div className="flex items-center gap-3">
                                            <img src={previewUrl!} className="h-12 w-12 rounded-lg object-cover" alt="Selected" />
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-xs font-semibold text-gray-900 dark:text-white">{selectedFile.name}</p>
                                                <button onClick={() => { setSelectedFile(null); setPreviewUrl(null); }} className="text-[10px] text-red-500 hover:underline">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Garment Type Section */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                                    <Shirt className="h-3 w-3" /> Garment Type
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['T-Shirt', 'Hoodie', 'Dress', 'Shirt', 'Jeans', 'Jacket'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setGarmentType(type.toLowerCase())}
                                            className={`rounded-lg border py-2 text-xs font-semibold transition-all ${garmentType === type.toLowerCase()
                                                ? 'border-violet-500 bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300'
                                                : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Model Settings (Horizontal Scroll) */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                                        <User className="h-3 w-3" /> Model
                                    </label>
                                    <button onClick={() => setShowEthnicityModal(true)} className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">View All</button>
                                </div>

                                {/* Gender Tabs */}
                                <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800/50">
                                    {['Female', 'Male'].map(g => (
                                        <button
                                            key={g}
                                            onClick={() => setModelGender(g.toLowerCase())}
                                            className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all ${modelGender === g.toLowerCase()
                                                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                                                }`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>

                                {/* Ethnicity Horizontal Scroll */}
                                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                                    {ethnicities.slice(0, 4).map(eth => (
                                        <button
                                            key={eth.id}
                                            onClick={() => setModelEthnicity(eth.id)}
                                            className={`group relative flex-none w-24 flex flex-col items-center gap-2 rounded-xl border p-2 transition-all ${modelEthnicity === eth.id
                                                ? 'border-violet-500 bg-violet-50 dark:border-violet-500 dark:bg-violet-900/20'
                                                : 'border-gray-200 bg-white/50 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800/50'
                                                }`}
                                        >
                                            <div className={`h-10 w-10 rounded-full ${eth.color} flex items-center justify-center`}>
                                                <User className="h-5 w-5 text-gray-600 opacity-50" />
                                            </div>
                                            <span className={`text-[10px] font-medium truncate w-full text-center ${modelEthnicity === eth.id ? 'text-violet-700 dark:text-violet-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                                {eth.label}
                                            </span>
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setShowEthnicityModal(true)}
                                        className="flex-none w-12 flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-transparent text-gray-400 hover:border-violet-400 hover:text-violet-500 transition-all"
                                    >
                                        <div className="text-xs font-bold">+</div>
                                    </button>
                                </div>
                            </div>

                            {/* 3. Environment (Horizontal Scroll) */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                                        <Globe className="h-3 w-3" /> Environment
                                    </label>
                                    <button onClick={() => setShowEnvironmentModal(true)} className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">View All</button>
                                </div>
                                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                                    {environments.slice(0, 4).map(env => (
                                        <button
                                            key={env.id}
                                            onClick={() => setBackground(env.id)}
                                            className={`group relative flex-none w-28 aspect-square overflow-hidden rounded-xl border transition-all ${background === env.id
                                                ? 'border-violet-500 ring-1 ring-violet-500'
                                                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                                                }`}
                                        >
                                            <div className={`absolute inset-0 ${env.color} transition-transform duration-500 group-hover:scale-110`}></div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-2 backdrop-blur-sm dark:bg-black/70">
                                                <p className="text-center text-[10px] font-bold uppercase tracking-wide text-gray-900 dark:text-white truncate">
                                                    {env.label}
                                                </p>
                                            </div>
                                            {background === env.id && (
                                                <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-white shadow-sm">
                                                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setShowEnvironmentModal(true)}
                                        className="flex-none w-16 aspect-square flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-transparent text-gray-400 hover:border-violet-400 hover:text-violet-500 transition-all"
                                    >
                                        <span className="text-lg font-light">+</span>
                                        <span className="text-[10px]">More</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={!selectedFile || isGenerating}
                        className={`w-full rounded-xl py-4 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98] ${!selectedFile || isGenerating
                            ? 'cursor-not-allowed bg-gray-300 dark:bg-gray-800'
                            : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-indigo-500/25'
                            }`}
                    >
                        {isGenerating ? 'Processing...' : 'Generate Mockup'}
                    </button>
                </div>

                {/* RIGHT Panel: Preview Stage */}
                <div className="flex-1 min-h-0 rounded-2xl border border-white/40 bg-white/40 backdrop-blur-2xl p-4 relative overflow-hidden shadow-2xl shadow-indigo-500/10 dark:border-white/5 dark:bg-black/40 dark:shadow-none animate-enter delay-2">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                    <div className="relative h-full w-full flex items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white/50 backdrop-blur-sm dark:border-gray-800 dark:bg-black/20">
                        {isGenerating && (
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md dark:bg-black/80">
                                <MagicLoader text="Generating..." />
                            </div>
                        )}

                        {previewUrl ? (
                            <img src={previewUrl} className="max-h-full max-w-full object-contain shadow-2xl rounded-lg" alt="Preview" />
                        ) : (
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                    <ImageIcon className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Ready to Visualize</h3>
                                <p className="mt-1 text-xs text-gray-500">Upload an image to see the magic happen</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
