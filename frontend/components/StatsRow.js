export default function StatsRow() {
    // Mock data - in a real app, this would come from the backend/context
    const stats = [
        {
            label: "Workouts Done",
            value: "12",
            unit: "sessions",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            color: "text-yellow-400",
            bg: "bg-yellow-400/10",
            border: "border-yellow-400/20"
        },
        {
            label: "Calories Burned",
            value: "3,450",
            unit: "kcal",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
            ),
            color: "text-orange-400",
            bg: "bg-orange-400/10",
            border: "border-orange-400/20"
        },
        {
            label: "Active Streak",
            value: "5",
            unit: "days",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "text-green-400",
            bg: "bg-green-400/10",
            border: "border-green-400/20"
        },
        {
            label: "Current Weight",
            value: "72.5",
            unit: "kg",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
            ),
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            border: "border-blue-400/20"
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className={`relative overflow-hidden rounded-2xl border ${stat.border} ${stat.bg} p-5 transition-transform hover:-translate-y-1`}>
                    <div className="flex items-start justify-between mb-4">
                        <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                            {stat.icon}
                        </div>
                        {/* Optional trend indicator */}
                        <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                            +2.5%
                        </span>
                    </div>

                    <div>
                        <h4 className="text-3xl font-bold text-white mb-1">{stat.value}</h4>
                        <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
