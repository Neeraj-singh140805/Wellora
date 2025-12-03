export default function AboutSection() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-gray-900/50 to-black border-t border-white/10 py-16 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 mb-8 shadow-lg shadow-purple-500/20">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>

                <h2 className="text-3xl font-bold text-white mb-6">Empowering Your Fitness Journey</h2>

                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
                    At Wellora, we believe that fitness should be accessible, engaging, and personalized.
                    Our mission is to provide you with the tools, data, and motivation you need to become
                    the best version of yourself. Whether you're just starting or pushing for a new PR,
                    we're here to support every step.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-1">10k+</h3>
                        <p className="text-gray-500 text-sm uppercase tracking-wider">Active Users</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-1">500+</h3>
                        <p className="text-gray-500 text-sm uppercase tracking-wider">Workouts</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-1">1M+</h3>
                        <p className="text-gray-500 text-sm uppercase tracking-wider">Calories Burned</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-1">4.9</h3>
                        <p className="text-gray-500 text-sm uppercase tracking-wider">App Rating</p>
                    </div>
                </div>

                <div className="mt-16 text-sm text-gray-600">
                    © {new Date().getFullYear()} Wellora Fitness. All rights reserved.
                </div>
            </div>
        </div>
    );
}
