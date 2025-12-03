export default function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Jenkins",
            role: "Yoga Enthusiast",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            text: "Wellora completely transformed my morning routine. The guided sessions are perfect for my busy schedule!",
            rating: 5
        },
        {
            name: "Mike Chen",
            role: "Marathon Runner",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            text: "The analytics feature helps me track my progress with precision. Highly recommended for serious athletes.",
            rating: 5
        },
        {
            name: "Emma Wilson",
            role: "Beginner",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            text: "I was intimidated by fitness apps, but Wellora is so easy to use. I love the daily quotes!",
            rating: 4
        }
    ];

    return (
        <div className="py-12">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                What Our Community Says
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                    <div key={i} className="bg-gray-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                            <img
                                src={t.image}
                                alt={t.name}
                                className="w-12 h-12 rounded-full border-2 border-purple-500 shadow-lg shadow-purple-500/20"
                            />
                        </div>

                        <div className="mt-6 text-center">
                            <div className="flex justify-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-4 h-4 ${i < t.rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-gray-300 italic mb-6 leading-relaxed">"{t.text}"</p>

                            <h4 className="text-white font-bold">{t.name}</h4>
                            <p className="text-purple-400 text-sm font-medium uppercase tracking-wide">{t.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
