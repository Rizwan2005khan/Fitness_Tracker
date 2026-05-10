import { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext"
import type { ActivityEntry, FoodEntry } from "../types"
import { getMotivationalMessage } from "../assets/assets"
import ProgressBar from "../components/ui/ProgressBar"
import Card from "../components/ui/Card"
import { 
  Activity, 
  FlameIcon, 
  HamburgerIcon, 
  Ruler, 
  ScaleIcon, 
  TrendingUpIcon, 
  ZapIcon, 
  SearchIcon,
  BellIcon,
  TargetIcon,
  ArrowUpRightIcon,
  TimerIcon
} from "lucide-react"
import CaloriesChart from "../components/CaloriesChart"
import WaterTracker from "../components/WaterTracker"
import MacrosChart from "../components/MacrosChart"

const Dashboard = () => {
  const {user, allActivityLogs, allFoodLogs, streak} = useAppContext()
  const [todayFood, setTodayFood] = useState<FoodEntry[]>([])
  const [todayActivities, setTodayActivities] = useState<ActivityEntry[]>([])

  const DAILY_CALORIE_LIMIT: number = user?.dailyCalorieIntake || 2000;

  const loadUserData = () => {
    const today = new Date().toISOString().split('T')[0];
    const foodData = allFoodLogs.filter((f: FoodEntry) => f.createdAt?.split('T')[0] === today)
    setTodayFood(foodData)
    const activityData = allActivityLogs.filter((a: ActivityEntry) => a.createdAt?.split('T')[0] === today)
    setTodayActivities(activityData)
  }

  useEffect(() => {
    loadUserData()
  }, [allActivityLogs, allFoodLogs])

  const totalCalories: number = todayFood.reduce((sum, item) => sum + item.calories, 0)
  const remainingCalories: number = DAILY_CALORIE_LIMIT - totalCalories;
  const totalActiveMinutes: number = todayActivities.reduce((sum, item) => sum + item.duration, 0)
  const totalBurned: number = todayActivities.reduce((sum, item) => sum + (item.calories || 0), 0)
  const motivation = getMotivationalMessage(totalCalories, totalActiveMinutes, DAILY_CALORIE_LIMIT)

  return (
    <div className="page-container bg-slate-50/50 dark:bg-slate-950">
      {/* Premium Navigation Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-slate-900/80">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-linear-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
            {user?.username?.[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-slate-800 dark:text-white font-bold">Good morning, {user?.username}!</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Let's reach your health goals today.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
            <SearchIcon className="size-5" />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all relative">
            <BellIcon className="size-5" />
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
        </div>
      </div>

      <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-linear-to-br from-emerald-500 to-teal-600 border-none text-white overflow-hidden relative group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                  <TargetIcon className="size-5 text-white" />
                </div>
                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full backdrop-blur-md">TODAY'S GOAL</span>
              </div>
              <p className="text-emerald-100 text-sm">Goal: {user?.goal || 'Maintain'}</p>
              <h3 className="text-2xl font-bold mt-1 capitalize">
                {user?.goal === 'lose' ? 'Weight Loss' : user?.goal === 'gain' ? 'Muscle Gain' : 'Stay Fit'}
              </h3>
              <div className="mt-4 flex items-center gap-2 text-emerald-100 text-xs">
                <TrendingUpIcon className="size-4" />
                <span>You're doing great! Keep it up.</span>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 size-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
          </Card>

          <Card className="bg-white dark:bg-slate-900 border-none shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
             <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <FlameIcon className="size-5 text-orange-500" />
                </div>
                <div className="flex items-center gap-1 text-orange-500 font-bold">
                  <span className="text-lg">{streak}</span>
                  <span className="text-[10px] uppercase tracking-tighter">Days</span>
                </div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Daily Streak</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">Keep Burning!</h3>
              <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full w-4/5"></div>
              </div>
          </Card>

          <Card className="bg-white dark:bg-slate-900 border-none shadow-xl shadow-slate-200/50 dark:shadow-none">
             <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <TimerIcon className="size-5 text-blue-500" />
                </div>
                <ArrowUpRightIcon className="size-4 text-slate-400" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Time</p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{totalActiveMinutes} <span className="text-sm font-normal text-slate-400">mins</span></h3>
              <div className="mt-4 flex gap-1">
                {[1,2,3,4,5,6,7].map(i => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 5 ? 'bg-blue-500' : 'bg-slate-100 dark:bg-slate-800'}`}></div>
                ))}
              </div>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Progress & Calories */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Unified Calories Card */}
            <Card className="p-0 overflow-hidden border-none shadow-2xl shadow-slate-200/60 dark:shadow-none bg-white dark:bg-slate-900">
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Daily Calorie Intake</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Target: {DAILY_CALORIE_LIMIT} kcal</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-black text-slate-800 dark:text-white">{totalCalories}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consumed</p>
                    </div>
                    <div className="h-10 w-px bg-slate-100 dark:bg-slate-800"></div>
                    <div className="text-center">
                      <p className={`text-2xl font-black ${remainingCalories >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {remainingCalories}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Left</p>
                    </div>
                  </div>
                </div>

                <div className="relative h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out ${totalCalories > DAILY_CALORIE_LIMIT ? 'bg-red-500' : 'bg-linear-to-r from-emerald-400 to-emerald-600'}`}
                    style={{ width: `${Math.min((totalCalories / DAILY_CALORIE_LIMIT) * 100, 100)}%` }}
                  ></div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                      <HamburgerIcon className="size-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Intake</p>
                      <p className="font-bold text-slate-700 dark:text-white">{totalCalories} kcal</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                      <FlameIcon className="size-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Burned</p>
                      <p className="font-bold text-slate-700 dark:text-white">{totalBurned} kcal</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/30 p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2">
                <span className="text-lg">{motivation.emoji}</span>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 italic">"{motivation.text}"</p>
              </div>
            </Card>

            {/* Progress Chart */}
            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900">
               <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Activity Overview</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] font-bold text-slate-400">INTAKE</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-orange-500"></span>
                    <span className="text-[10px] font-bold text-slate-400">BURN</span>
                  </div>
                </div>
              </div>
              <CaloriesChart />
            </Card>
          </div>

          {/* Right Column: Macros, Water & Metrics */}
          <div className="space-y-8">
            {/* Macros Section */}
            <MacrosChart />

            {/* Water Tracker Section */}
            <WaterTracker />

            {/* Metrics & BMI Card */}
            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800 dark:text-white">Body Metrics</h3>
                <ScaleIcon className="size-5 text-indigo-500" />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <Ruler className="size-4 text-slate-400" />
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Height</span>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{user?.height} cm</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <ScaleIcon className="size-4 text-slate-400" />
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Weight</span>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{user?.weight} kg</span>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                   <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Current BMI</span>
                    {user && (
                      (() => {
                        const bmi = (user.weight / Math.pow(user.height / 100, 2)).toFixed(1);
                        const getStatus = (b: number) => {
                          if(b < 18.5) return 'text-blue-500';
                          if(b < 25) return 'text-emerald-500';
                          if(b < 30) return 'text-orange-500';
                          return 'text-red-500';
                        }
                        return <span className={`text-2xl font-black ${getStatus(Number(bmi))}`}>{bmi}</span>
                      })()
                    )}
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full flex overflow-hidden">
                    <div className="flex-[18] bg-blue-500/20"></div>
                    <div className="flex-[7] bg-emerald-500/40"></div>
                    <div className="flex-[5] bg-orange-500/40"></div>
                    <div className="flex-[10] bg-red-500/40"></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Summary Card */}
            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-slate-900 text-white relative overflow-hidden group">
               <h3 className="font-bold mb-4 relative z-10">Today's Recap</h3>
               <div className="space-y-4 relative z-10">
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-400">Total Activity</span>
                   <span className="font-bold">{todayActivities.length} logs</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-400">Meals Captured</span>
                   <span className="font-bold">{todayFood.length} logs</span>
                 </div>
                 <div className="mt-6 flex items-center justify-center gap-2 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all cursor-pointer">
                    <ZapIcon className="size-4 text-yellow-400" />
                    <span className="text-xs font-bold uppercase">View Detailed Logs</span>
                 </div>
               </div>
               <div className="absolute top-0 right-0 size-24 bg-emerald-500/20 blur-3xl group-hover:bg-emerald-500/30 transition-all"></div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
