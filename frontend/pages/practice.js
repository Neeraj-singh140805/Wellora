import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";
import { exerciseDbApi } from "@/utils/exerciseDbApi";
import WorkoutCard from "@/components/WorkoutCard";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import API from "@/utils/api";

export default function Practice() {
    const [search, setSearch] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [addedWorkouts, setAddedWorkouts] = useState([]);

    // Load saved list on mount
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await API.get("/api/todos");
                setAddedWorkouts(res.data);
            } catch (error) {
                console.error("Failed to fetch todos", error);
            }
        };
        fetchTodos();
    }, []);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    // Fetch workouts when search changes
    useEffect(() => {
        const fetchWorkouts = async () => {
            setLoading(true);
            try {
                let data = [];
                if (debouncedSearch) {
                    data = await exerciseDbApi.searchExercises(debouncedSearch);
                } else {
                    data = await exerciseDbApi.getAllExercises(50);
                }
                setWorkouts(data);
            } catch (error) {
                console.error("Failed to fetch workouts", error);
                toast.error("Failed to load exercises");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, [debouncedSearch]);

    const handleAddToList = async (workout) => {
        const exists = addedWorkouts.find(item => item.workoutId === (workout._id || workout.id));

        if (!exists) {
            try {
                const newTodo = {
                    workoutId: workout._id || workout.id,
                    title: workout.name,
                    category: workout.bodyPart || "Other",
                    gifUrl: workout.gifUrl,
                    bodyPart: workout.bodyPart,
                    target: workout.target
                };
                const res = await API.post("/api/todos", newTodo);
                setAddedWorkouts([res.data, ...addedWorkouts]);
                toast.success("Added to your list!");
            } catch (error) {
                console.error("Failed to add todo", error);
                toast.error("Failed to add to list");
            }
        } else {
            toast("Already in your list!", {
                icon: 'ℹ️',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    };

    const handleRemoveFromList = async (todoId) => {
        try {
            await API.delete(`/api/todos/${todoId}`);
            setAddedWorkouts(addedWorkouts.filter(item => item._id !== todoId));
            toast.success("Removed from list");
        } catch (error) {
            console.error("Failed to remove todo", error);
            toast.error("Failed to remove from list");
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen text-white relative overflow-hidden">
                <Navbar />

                <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 gap-8">
                    {/* Main Content Area */}
                    <main className="flex-1">
                        {/* Header */}
                        <div className="mb-8 text-center lg:text-left">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
                                Practice Area
                            </h1>
                            <p className="text-gray-400 max-w-2xl">
                                Search for any exercise to find video tutorials and guided sessions.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="max-w-2xl mb-12 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-4 py-4 bg-gray-900/60 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-lg shadow-xl backdrop-blur-xl"
                                placeholder="Search for exercises (e.g., 'Yoga', 'HIIT', 'Abs')..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Results Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                            </div>
                        ) : workouts.length === 0 ? (
                            <div className="text-center py-12 bg-gray-900/30 rounded-3xl border border-white/5 backdrop-blur-sm">
                                <svg className="mx-auto h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-400 text-lg">No videos found</p>
                                <p className="text-gray-500 mt-2">Try searching for a different exercise term.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {workouts.map((workout) => (
                                    <WorkoutCard
                                        key={workout._id || workout.id}
                                        workout={workout}
                                        onAddToList={handleAddToList}
                                        isInList={addedWorkouts.some(item => item.workoutId === (workout._id || workout.id))}
                                    />
                                ))}
                            </div>
                        )}
                    </main>

                    {/* Sidebar / List Section */}
                    <aside className="lg:w-80 flex-shrink-0">
                        <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sticky top-24 shadow-2xl">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Your List
                                <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-500/30">
                                    {addedWorkouts.length}
                                </span>
                            </h2>

                            {addedWorkouts.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-white/5 rounded-xl">
                                    <p>No exercises added yet.</p>
                                    <p className="text-sm mt-1">Add some from the results!</p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                                    <AnimatePresence mode="popLayout">
                                        {addedWorkouts.map((item) => (
                                            <motion.div
                                                key={item._id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                layout
                                                className="bg-white/5 border border-white/5 rounded-xl p-3 flex gap-3 group hover:border-purple-500/30 transition-colors"
                                            >
                                                {/* Small Thumbnail */}
                                                <div className="w-16 h-16 bg-black rounded-lg overflow-hidden flex-shrink-0">
                                                    {item.gifUrl ? (
                                                        <img src={item.gifUrl} alt={item.title} className="w-full h-full object-cover mix-blend-multiply bg-white" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">No Img</div>
                                                    )}
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-white truncate capitalize" title={item.title}>
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-400 capitalize">{item.bodyPart || item.category}</p>
                                                    <button
                                                        onClick={() => handleRemoveFromList(item._id)}
                                                        className="mt-2 text-xs text-red-400 hover:text-red-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Remove
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </ProtectedRoute>
    );
}
