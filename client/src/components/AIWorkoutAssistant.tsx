import React, { useState } from 'react';
import { SparklesIcon, Loader2Icon, PlayIcon, InfoIcon, DumbbellIcon } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import api from '../configs/api';
import toast from 'react-hot-toast';

interface Exercise {
    name: string;
    sets: number;
    reps: string;
    rest: string;
    caloriesBurned: number;
    instruction: string;
}

interface WorkoutRoutine {
    routineName: string;
    totalEstimatedCalories: number;
    exercises: Exercise[];
}

const AIWorkoutAssistant = () => {
    const [loading, setLoading] = useState(false);
    const [routine, setRoutine] = useState<WorkoutRoutine | null>(null);
    const [preferences, setPreferences] = useState('');

    const generateWorkout = async () => {
        setLoading(true);
        try {
            const { data } = await api.post('/api/workout-assistant/generate', { preferences });
            setRoutine(data.result);
            toast.success('AI Workout Generated!');
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.error?.message || 'Failed to generate workout');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <Card className="bg-linear-to-br from-indigo-600 to-violet-700 border-none">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                        <SparklesIcon className="size-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">AI Workout Coach</h3>
                        <p className="text-indigo-100 text-sm">Personalized routines powered by Gemini</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <textarea 
                        placeholder="E.g. I only have dumbbells, focused on upper body, high intensity..."
                        className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-sm min-h-[80px]"
                        value={preferences}
                        onChange={(e) => setPreferences(e.target.value)}
                    />
                    
                    <Button 
                        onClick={generateWorkout} 
                        disabled={loading}
                        className="w-full bg-white text-indigo-700 hover:bg-indigo-50 border-none font-bold py-3"
                    >
                        {loading ? (
                            <>
                                <Loader2Icon className="size-5 animate-spin" />
                                Generating Routine...
                            </>
                        ) : (
                            <>
                                <SparklesIcon className="size-5" />
                                Generate My Plan
                            </>
                        )}
                    </Button>
                </div>
            </Card>

            {routine && (
                <Card className="border-2 border-indigo-100 dark:border-indigo-900/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h4 className="text-lg font-bold text-slate-800 dark:text-white">{routine.routineName}</h4>
                            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">Estimated: {routine.totalEstimatedCalories} kcal burned</p>
                        </div>
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                            <DumbbellIcon className="size-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {routine.exercises.map((ex, index) => (
                            <div key={index} className="group p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center justify-center size-7 bg-indigo-600 text-white text-xs font-bold rounded-full">
                                            {index + 1}
                                        </span>
                                        <h5 className="font-bold text-slate-700 dark:text-slate-200">{ex.name}</h5>
                                    </div>
                                    <span className="text-xs font-bold px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-md">
                                        {ex.caloriesBurned} kcal
                                    </span>
                                </div>
                                
                                <div className="flex gap-4 mb-3 ml-10">
                                    <div className="text-center">
                                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Sets</p>
                                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{ex.sets}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Reps/Time</p>
                                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{ex.reps}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Rest</p>
                                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{ex.rest}</p>
                                    </div>
                                </div>

                                <div className="ml-10 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                                    <InfoIcon className="size-4 text-slate-400 shrink-0 mt-0.5" />
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                                        {ex.instruction}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button 
                        variant="secondary" 
                        className="w-full mt-6 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400"
                        onClick={() => setRoutine(null)}
                    >
                        Clear Routine
                    </Button>
                </Card>
            )}
        </div>
    );
};

export default AIWorkoutAssistant;
