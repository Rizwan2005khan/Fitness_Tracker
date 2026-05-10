import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useAppContext } from '../context/AppContext';
import Card from './ui/Card';

const MacrosChart = () => {
    const { allFoodLogs } = useAppContext();

    const today = new Date().toISOString().split('T')[0];
    const todaysFood = allFoodLogs.filter(log => log.createdAt?.split('T')[0] === today);

    const protein = todaysFood.reduce((sum, item) => sum + (item.protein || 0), 0);
    const carbs = todaysFood.reduce((sum, item) => sum + (item.carbs || 0), 0);
    const fats = todaysFood.reduce((sum, item) => sum + (item.fats || 0), 0);

    const data = [
        { name: 'Protein', value: protein, color: '#3b82f6' }, // Blue
        { name: 'Carbs', value: carbs, color: '#10b981' },   // Emerald
        { name: 'Fats', value: fats, color: '#f59e0b' },     // Amber
    ];

    const total = protein + carbs + fats;

    if (total === 0) {
        return (
            <Card className="h-full flex flex-col items-center justify-center py-12">
                <p className="text-slate-400 text-sm">No macros logged today</p>
            </Card>
        );
    }

    return (
        <Card className="h-full">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Daily Macros</h3>
            <div className="w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
                {data.map(item => (
                    <div key={item.name} className="text-center">
                        <p className="text-[10px] uppercase font-bold text-slate-400">{item.name}</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.value}g</p>
                        <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${(item.value / total) * 100}%`, backgroundColor: item.color }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default MacrosChart;
