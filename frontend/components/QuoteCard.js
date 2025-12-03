import { useState, useEffect } from 'react';

const quotes = [
    { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
    { text: "Fitness is not about being better than someone else. It’s about being better than you were yesterday.", author: "Khloe Kardashian" },
    { text: "Take care of your body. It’s the only place you have to live.", author: "Jim Rohn" },
    { text: "Exercise is king. Nutrition is queen. Put them together and you’ve got a kingdom.", author: "Jack Lalanne" },
    { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
    { text: "To enjoy the glow of good health, you must exercise.", author: "Gene Tunney" },
    { text: "Fitness is mental. Your body won't go where your mind doesn't push it.", author: "Unknown" }
];

export default function QuoteCard() {
    const [quote, setQuote] = useState(quotes[0]);

    useEffect(() => {
        // Pick a random quote on mount
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
    }, []);

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-3xl p-8 mb-8 backdrop-blur-xl">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <svg className="w-8 h-8 text-purple-400 mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.896 14.321 15.923 14.929 15.081C15.537 14.239 16.313 13.599 17.257 13.161V13H15V6H21V13C21 15.209 20.215 17.098 18.645 18.667C17.075 20.236 15.186 21.021 12.979 21.021L14.017 21ZM5.017 21L5.017 18C5.017 16.896 5.321 15.923 5.929 15.081C6.537 14.239 7.313 13.599 8.257 13.161V13H6V6H12V13C12 15.209 11.215 17.098 9.645 18.667C8.075 20.236 6.186 21.021 3.979 21.021L5.017 21Z" />
                </svg>

                <p className="text-xl md:text-2xl font-medium text-white mb-4 italic leading-relaxed">
                    "{quote.text}"
                </p>

                <p className="text-sm text-purple-300 font-semibold tracking-wider uppercase">
                    — {quote.author}
                </p>
            </div>
        </div>
    );
}
