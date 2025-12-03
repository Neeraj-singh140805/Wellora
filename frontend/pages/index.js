import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Home() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 relative overflow-hidden">

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent tracking-tight">
          Wellora Fitness
        </h1>
        <p className="text-xl md:text-2xl text-purple-200/80 mb-12 font-light">
          Your personal companion for a healthier, stronger you.
        </p>

        <button
          onClick={handleGetStarted}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-white/10 font-lg rounded-full hover:bg-white/20 hover:scale-105 focus:outline-none ring-offset-2 focus:ring-2 ring-purple-500"
        >
          <span className="mr-2 text-lg">Get Started</span>
          <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-white/40" />
        </button>
      </div>
    </div>
  );
}
