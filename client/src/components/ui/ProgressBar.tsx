export default function ProgressBar({ value, max = 100, className = '' }: { value: number; max?: number; className?: string; }) {

    const percentage = Math.min(Math.round((value / max) * 100), 100);
    const isOverLimit = value > max;

    return (
        <div className={`w-full ${className}`}>
            <div className="relative w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden h-4 shadow-inner">
                <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out relative ${
                        isOverLimit 
                        ? 'bg-linear-to-r from-red-500 to-rose-600' 
                        : 'bg-linear-to-r from-emerald-400 to-teal-500'
                    }`} 
                    style={{ width: `${percentage}%` }} 
                >
                    <div className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent"></div>
                </div>
            </div>
        </div>
    );
}
