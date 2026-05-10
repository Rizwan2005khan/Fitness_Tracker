import React from 'react'

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`bg-white dark:bg-slate-900 rounded-3xl border border-slate-100/50 dark:border-slate-800/50 shadow-xs shadow-slate-200/40 dark:shadow-none p-6 transition-all duration-300 hover:shadow-md dark:hover:bg-slate-800/40 ${className}`}>
            {children}
        </div>
    );
}

export default Card