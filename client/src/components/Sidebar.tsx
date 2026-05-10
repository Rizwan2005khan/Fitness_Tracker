import { ActivityIcon, HomeIcon, MoonIcon, PersonStandingIcon, SunIcon, UserIcon, UtensilsIcon, LayoutDashboardIcon } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import { NavLink } from "react-router-dom"

const Sidebar = () => {

    const navItems = [
        {path: '/', label: 'Dashboard', icon: LayoutDashboardIcon},
        {path: '/food', label: 'Food Log', icon: UtensilsIcon},
        {path: '/activity', label: 'Activity', icon: ActivityIcon},
        {path: '/profile', label: 'My Profile', icon: UserIcon}
    ]

    const {theme, toggleTheme} = useTheme()
  return (
    <nav className="hidden lg:flex flex-col w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 p-8 transition-all duration-300 shadow-2xl shadow-slate-200/50 dark:shadow-none z-20">
        <div className="flex items-center gap-4 mb-12 group cursor-pointer">
            <div className="size-12 rounded-2xl bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                <PersonStandingIcon className="size-8 text-white" />
            </div>
            <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">FitTrack<span className="text-emerald-500">.</span></h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Version</p>
            </div>
        </div>

        <div className="flex flex-col gap-3">
            {navItems.map((item) => (
                <NavLink key={item.path} to={item.path} 
                className={({ isActive }) => `
                    flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 relative group
                    ${isActive 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm' 
                        : 'text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200'
                    }
                `}
                >
                    {({ isActive }) => (
                        <>
                            <item.icon className={`size-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
                            <span className="text-sm tracking-wide">{item.label}</span>
                            {isActive && (
                                <span className="absolute left-0 w-1.5 h-6 bg-emerald-500 rounded-r-full"></span>
                            )}
                        </>
                    )}
                </NavLink>
            ))}
        </div>

        <div className="mt-auto pt-8 border-t border-slate-50 dark:border-slate-800 flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">Cloud Sync</p>
                <div className="flex items-center justify-center gap-2">
                    <div className="size-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Live Status: OK</span>
                </div>
            </div>

            <a 
                href="http://localhost:1337/admin" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 px-5 py-3 text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200 rounded-2xl transition-all duration-300 group"
            >
                <div className="size-6 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 group-hover:text-emerald-600 transition-colors">
                    <span className="text-[8px] font-black">CMS</span>
                </div>
                <span className="text-sm font-medium">Database Admin</span>
            </a>
            
            <button
                onClick={toggleTheme}
                className="flex items-center gap-4 px-5 py-3 w-full text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200 rounded-2xl transition-all duration-300 group"
            >
                <div className="size-6 flex items-center justify-center">
                    {theme === 'light' ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />} 
                </div>
                <span className="text-sm font-medium">{theme === 'light' ? 'Dark Theme' : 'Light Theme'}</span>
            </button>
        </div>
    </nav>
  )
}

export default Sidebar
