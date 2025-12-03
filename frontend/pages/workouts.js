import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";

import API from "@/utils/api";

export default function Workouts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [newWorkout, setNewWorkout] = useState({
    title: "",
    category: "Cardio"
  });

  // Filter Todo List based on search/category/sort
  const filteredTodoList = todoList
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? item.category === category : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === 'a-z') return a.title.localeCompare(b.title);
      if (sort === 'z-a') return b.title.localeCompare(a.title);
      return 0;
    });

  // Load todo list from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await API.get("/api/todos");
        setTodoList(res.data);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };
    fetchTodos();
  }, []);

  const createCustomWorkout = async () => {
    if (newWorkout.title.trim()) {
      try {
        const customWorkout = {
          workoutId: `custom-${Date.now()}`,
          title: newWorkout.title,
          category: newWorkout.category,
          isCustom: true
        };
        const res = await API.post("/api/todos", customWorkout);
        setTodoList([res.data, ...todoList]);
        setNewWorkout({ title: "", category: "Cardio" });
        setShowCreateModal(false);
      } catch (error) {
        console.error("Failed to create custom workout", error);
      }
    }
  };

  const removeFromTodoList = async (todoId) => {
    try {
      await API.delete(`/api/todos/${todoId}`);
      setTodoList(todoList.filter(item => item._id !== todoId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to remove todo", error);
    }
  };

  const toggleComplete = async (todoId) => {
    try {
      const todo = todoList.find(item => item._id === todoId);
      const res = await API.put(`/api/todos/${todoId}`, { completed: !todo.completed });
      setTodoList(todoList.map(item =>
        item._id === todoId ? res.data : item
      ));
    } catch (error) {
      console.error("Failed to toggle complete", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen text-white">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
              Workouts
            </h1>
            <p className="text-gray-400">Browse and discover workout videos</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            {/* Filters & Actions */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex-1 w-full sm:w-auto flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    placeholder="Search workouts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <select
                  className="px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Strength">Strength</option>
                </select>

                <select
                  className="px-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all cursor-pointer"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full sm:w-auto px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Custom
              </button>
            </div>

            {/* Content Area */}
            {filteredTodoList.length === 0 ? (
              <div className="text-center py-12 bg-black/20 rounded-xl border border-white/5">
                <svg className="mx-auto h-12 w-12 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-400">
                  {search || category ? "No matching workouts found" : "No workouts added yet"}
                </p>
                {!search && !category && (
                  <p className="text-gray-500 text-sm mt-1">
                    Create a custom workout to get started
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTodoList.map((item) => (
                    <div
                      key={item._id}
                      className={`bg-black/20 border rounded-xl p-4 transition-all ${item.completed ? 'border-green-500/30 bg-green-500/5' : 'border-white/5 hover:border-purple-500/30'
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleComplete(item._id)}
                          className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${item.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-600 hover:border-purple-500'
                            }`}
                        >
                          {item.completed && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <h4 className={`text-lg font-bold mb-1 ${item.completed ? 'text-gray-500 line-through' : 'text-white'
                            }`}>
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              {item.category}
                            </span>
                            {item.duration && (
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {item.duration} min
                              </span>
                            )}
                          </div>

                          <div className="flex justify-end">
                            <button
                              onClick={() => setDeleteConfirm(item._id)}
                              className="text-gray-500 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                              title="Delete workout"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end text-gray-400">
                  <div className="flex gap-6">
                    <span>Total: <span className="text-white font-bold">{filteredTodoList.length}</span></span>
                    <span>Completed: <span className="text-green-400 font-bold">{filteredTodoList.filter(item => item.completed).length}</span></span>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>

        {/* Create Custom Workout Modal */}
        {showCreateModal && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 z-50"
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className="bg-gray-900 border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Create Custom Workout</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Workout Title</label>
                  <input
                    type="text"
                    value={newWorkout.title}
                    onChange={(e) => setNewWorkout({ ...newWorkout, title: e.target.value })}
                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                    placeholder="e.g., Morning Run, Yoga Session"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={newWorkout.category}
                    onChange={(e) => setNewWorkout({ ...newWorkout, category: e.target.value })}
                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent cursor-pointer"
                  >
                    <option value="Cardio">Cardio</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Strength">Strength</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createCustomWorkout}
                  disabled={!newWorkout.title.trim()}
                  className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {deleteConfirm && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 z-50"
            onClick={() => setDeleteConfirm(null)}
          >
            <div
              className="bg-gray-900 border border-white/10 rounded-2xl max-w-sm w-full p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Delete Workout?</h3>
                <p className="text-gray-400 text-sm mb-6">This will remove the workout from your todo list. This action cannot be undone.</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => removeFromTodoList(deleteConfirm)}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
