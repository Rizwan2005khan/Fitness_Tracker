import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import BottomNav from "../components/BottomNav"

const Layout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="flex-1 overflow-y-auto animate-in fade-in duration-500 bg-slate-50/30 dark:bg-slate-950/30">
      <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}

export default Layout
