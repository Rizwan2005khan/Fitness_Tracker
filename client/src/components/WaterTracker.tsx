import React, { useState } from 'react';
import { DropletIcon, PlusIcon, MinusIcon } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { useAppContext } from '../context/AppContext';
import api from '../configs/api';
import toast from 'react-hot-toast';

const WaterTracker = () => {
    const { allWaterLogs, setAllWaterLogs } = useAppContext();
    const [loading, setLoading] = useState(false);

    const today = new Date().toISOString().split('T')[0];
    const todaysWater = allWaterLogs
        .filter(log => log.createdAt?.split('T')[0] === today)
        .reduce((sum, log) => sum + log.amount, 0);

    const DAILY_GOAL = 2000; // 2L daily goal
    const percentage = Math.min(Math.round((todaysWater / DAILY_GOAL) * 100), 100);

    const handleAddWater = async (amount: number) => {
        setLoading(true);
        try {
            const { data } = await api.post('/api/water-logs', { data: { amount } });
            setAllWaterLogs(prev => [...prev, data]);
            toast.success(`Added ${amount}ml water`);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.error?.message || error?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <DropletIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-white">Hydration</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Track your water intake</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{todaysWater}ml</p>
                    <p className="text-xs text-slate-400 font-medium">Goal: {DAILY_GOAL}ml</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full mb-6 overflow-hidden">
                <div 
                    className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${percentage}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Button 
                    variant="secondary" 
                    className="flex items-center justify-center gap-2 border-blue-100 dark:border-blue-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    onClick={() => handleAddWater(250)}
                    disabled={loading}
                >
                    <PlusIcon className="w-4 h-4" />
                    250ml
                </Button>
                <Button 
                    variant="secondary"
                    className="flex items-center justify-center gap-2 border-blue-100 dark:border-blue-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    onClick={() => handleAddWater(500)}
                    disabled={loading}
                >
                    <PlusIcon className="w-4 h-4" />
                    500ml
                </Button>
            </div>

            {/* Decorative element */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </Card>
    );
};

export default WaterTracker;
