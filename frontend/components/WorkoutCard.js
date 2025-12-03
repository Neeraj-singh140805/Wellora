import { useState } from "react";

export default function WorkoutCard({ workout, onAddToList, isInList }) {
  const [open, setOpen] = useState(false);

  const youtubeId = workout.youtubeId || workout.youtube_id;

  return (
    <>
      <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 shadow-xl">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-white overflow-hidden">
          {workout.gifUrl ? (
            <img
              src={workout.gifUrl}
              alt={workout.name || workout.title}
              className="w-full h-full object-contain mix-blend-multiply"
              loading="lazy"
            />
          ) : youtubeId ? (
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
              alt={workout.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
              No Preview
            </div>
          )}

          {/* Overlay for YouTube videos only */}
          {youtubeId && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          )}

          {/* Play button overlay (only for YouTube) */}
          {youtubeId && (
            <button
              onClick={() => setOpen(true)}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50 transform group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-200 transition-colors capitalize">
            {workout.name || workout.title}
          </h3>

          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 capitalize">
              {workout.bodyPart || workout.category || 'General'}
            </span>

            {youtubeId && (
              <button
                onClick={() => setOpen(true)}
                className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Watch Now →
              </button>
            )}
          </div>

          {/* Add to List Button */}
          <button
            onClick={() => onAddToList && onAddToList(workout)}
            disabled={isInList}
            className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all ${isInList
              ? 'bg-green-500/20 text-green-300 border border-green-500/30 cursor-not-allowed'
              : 'bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30'
              }`}
          >
            {isInList ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added to List
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add to List
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Modal (Only for YouTube) */}
      {open && youtubeId && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-gray-900 border border-white/10 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">{workout.title}</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
