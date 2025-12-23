'use client';

import { Sparkles } from 'lucide-react';
import { useStore, Genre } from '../store';

const genres: { value: Genre; label: string; emoji: string }[] = [
  { value: 'fantasy', label: 'Fantasy', emoji: '🧙' },
  { value: 'scifi', label: 'Sci-Fi', emoji: '🚀' },
  { value: 'romance', label: 'Romance', emoji: '💕' },
  { value: 'thriller', label: 'Thriller', emoji: '🔪' },
  { value: 'comedy', label: 'Comedy', emoji: '😂' },
  { value: 'horror', label: 'Horror', emoji: '👻' },
  { value: 'mystery', label: 'Mystery', emoji: '🔍' },
  { value: 'adventure', label: 'Adventure', emoji: '🗺️' },
];

export default function Header() {
  const { currentGenre, setGenre, clearMessages } = useStore();

  const handleGenreChange = (genre: Genre) => {
    if (window.confirm('Switching genres will start a fresh conversation. Continue?')) {
      setGenre(genre);
      clearMessages();
    }
  };

  return (
    <header className="glass-effect border-b border-white/10 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">Creative Mentor AI</h1>
            <p className="text-xs text-gray-400">Your Personal Storytelling Companion</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400 mr-2">Genre:</span>
          {genres.map((genre) => (
            <button
              key={genre.value}
              onClick={() => handleGenreChange(genre.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentGenre === genre.value
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
              title={genre.label}
            >
              <span className="mr-1">{genre.emoji}</span>
              <span className="hidden sm:inline">{genre.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
