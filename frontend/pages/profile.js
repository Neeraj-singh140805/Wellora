import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useContext, useEffect, useState } from "react";
import API from "@/utils/api";
import { AuthContext } from "@/context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/api/logs");
        setLogs(res.data);
      } catch (error) {
        console.error("Failed to fetch logs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  return (
    <ProtectedRoute>
      <div className="min-h-screen text-white">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
              Profile
            </h1>
            <p className="text-gray-400">Manage your account and view your activity</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Info Card */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-4xl font-bold mb-4 shadow-lg shadow-purple-500/30">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
                  <p className="text-gray-400 text-sm mb-6">{user?.email}</p>

                  <div className="w-full pt-6 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Member Since</span>
                      <span className="text-white font-medium">
                        {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Total Workouts</span>
                      <span className="text-white font-medium">{logs.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Workout Logs */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                  Workout History
                </h3>

                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                  </div>
                ) : logs.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-400">No workout logs yet</p>
                    <p className="text-gray-500 text-sm mt-1">Start tracking your workouts to see them here</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {logs.map((log, index) => (
                      <div
                        key={log._id || index}
                        className="bg-black/20 border border-white/5 rounded-xl p-4 hover:border-purple-500/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center border border-purple-500/30">
                              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-white font-medium">{log.calories} calories burned</p>
                              <p className="text-gray-400 text-sm">
                                {new Date(log.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              Completed
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Workout Todo List */}
          {todoList.length > 0 && (
            <div className="mt-8">
              <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                  My Workout Todo List
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {todoList.map((item) => (
                    <div
                      key={item._id}
                      className={`bg-black/20 border rounded-xl p-4 transition-all ${item.completed ? 'border-green-500/30 bg-green-500/5' : 'border-white/5 hover:border-purple-500/30'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${item.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-600'
                          }`}>
                          {item.completed && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium mb-2 ${item.completed ? 'text-gray-500 line-through' : 'text-white'
                            }`}>
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              {item.category}
                            </span>
                            {item.isCustom && (
                              <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                Custom
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    Total: <span className="text-white font-medium">{todoList.length}</span>
                  </span>
                  <span className="text-gray-400">
                    Completed: <span className="text-green-400 font-medium">{todoList.filter(item => item.completed).length}</span>
                  </span>
                  <span className="text-gray-400">
                    Remaining: <span className="text-purple-400 font-medium">{todoList.filter(item => !item.completed).length}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
