import { cn } from "@/lib/utils";

// Standard UI Spinner for general loading states
export function Spinner({ className }: { className?: string }) {
    return (
        <svg
            className={cn("animate-spin text-current", className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
}

// "Samsung-style" AI Generation Loader
// Features: Fluid gradient blob, sparkles, and pulsing ring
export function MagicLoader({ className, text = "Generating..." }: { className?: string; text?: string }) {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-6", className)}>
            <div className="relative h-24 w-24">
                {/* Outer glowing ring */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 bg-[length:400%_400%] p-[2px] animate-border-spin [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude]">
                    <div className="h-full w-full rounded-full bg-transparent" />
                </div>

                {/* Inner fluid blob */}
                <div className="absolute inset-2 overflow-hidden rounded-full">
                    <div className="h-full w-full animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,#7c3aed_0deg,#c026d3_120deg,#4f46e5_240deg,#7c3aed_360deg)] blur-md opacity-80 mix-blend-screen" />
                    <div className="absolute inset-0 bg-white/20 blur-sm dark:bg-black/20" />
                </div>

                {/* Center Sparkle */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="h-8 w-8 animate-pulse text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                    </svg>
                </div>

                {/* Orbital particles */}
                <div className="absolute inset-0 animate-spin-reverse-slow">
                    <div className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 blur-[1px] shadow-[0_0_8px_cyan]"></div>
                    <div className="absolute bottom-1 right-3 h-1.5 w-1.5 rounded-full bg-fuchsia-400 blur-[1px] shadow-[0_0_8px_fuchsia]"></div>
                </div>
            </div>

            {/* Loading Text with Gradient Pulse */}
            <div>
                <p className="animate-pulse bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-sm font-bold tracking-widest text-transparent uppercase dark:from-violet-400 dark:to-fuchsia-400">
                    {text}
                </p>
            </div>
        </div>
    );
}
