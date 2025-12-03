import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import QuoteCard from "@/components/QuoteCard";
import StatsRow from "@/components/StatsRow";
import Testimonials from "@/components/Testimonials";
import AboutSection from "@/components/AboutSection";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const cards = [
    {
      title: "Workouts",
      description: "Browse and track your daily exercises.",
      icon: "💪",
      href: "/workouts",
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Practice",
      description: "Search for exercises and watch tutorials.",
      icon: "🧘‍♀️",
      href: "/practice",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Profile",
      description: "Manage your account and personal details.",
      icon: "👤",
      href: "/profile",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  const recentActivity = [
    { title: "Full Body HIIT", date: "Today, 9:00 AM", duration: "45 min", calories: "320" },
    { title: "Morning Yoga Flow", date: "Yesterday, 8:30 AM", duration: "30 min", calories: "150" },
    { title: "Upper Body Strength", date: "Mon, 6:00 PM", duration: "50 min", calories: "410" },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen text-white selection:bg-purple-500/30 font-sans">
        <Navbar />

        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Header Section */}
            <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
              <div>
                <p className="text-purple-400 font-medium mb-2 tracking-wide uppercase text-sm">Dashboard</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-white">
                  Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">{user?.name}</span>
                </h1>
              </div>
              <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-sm font-medium text-gray-300">System Online</span>
              </div>
            </div>

            {/* Quick Stats - Moved to Top for Impact */}
            <div className="mb-12">
              <StatsRow />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              {/* Main Content Area */}
              <div className="lg:col-span-8 space-y-8">
                {/* Daily Quote */}
                <QuoteCard />

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cards.map((card) => (
                    <Link href={card.href} key={card.title} className="group relative block h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative h-full bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-purple-500/30 transition-all duration-300 overflow-hidden group-hover:-translate-y-1">
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                        <div className="relative z-10">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            {card.icon}
                          </div>

                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                            {card.title}
                          </h3>

                          <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        <div className="absolute bottom-6 right-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-8">
                {/* Recent Activity */}
                <div className="bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                    <button className="text-xs text-purple-400 hover:text-purple-300 font-medium">View All</button>
                  </div>

                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="group flex items-start gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center border border-purple-500/30 group-hover:border-purple-500/50 transition-colors">
                          <span className="text-lg">🔥</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium text-sm truncate">{activity.title}</h4>
                          <p className="text-xs text-gray-500 mb-1">{activity.date}</p>
                          <div className="flex gap-2 text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                            <span>{activity.duration}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-600 self-center"></span>
                            <span>{activity.calories} kcal</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro Tip Card */}
                <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <h3 className="text-lg font-bold text-white mb-2 relative z-10">Pro Tip</h3>
                  <p className="text-sm text-indigo-200 leading-relaxed relative z-10">
                    Consistency is key. Try to maintain your streak by doing at least 15 minutes of activity daily.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="border-t border-white/10 pt-12">
              <Testimonials />
            </div>

          </div>

          {/* About Section (Full Width) */}
          <AboutSection />
        </main>
      </div>
    </ProtectedRoute>
  );
}
