import { cn } from "@/lib/utils"

export function Spinner({ className }: { className?: string }) {
    return (
        <svg
            className={cn("animate-spin mr-2 h-4 w-4 text-current", className)}
            viewBox="0 0 16 16"
            fill="none"
        >
            <circle
                className="opacity-25"
                cx="8"
                cy="8"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M15 8a7 7 0 01-7 7V13a5 5 0 005-5h2z"
            />
        </svg>
    )
}
