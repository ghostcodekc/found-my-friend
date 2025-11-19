import React from 'react';
import { Heart, MapPin, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-surface shadow-xl rounded-2xl p-8 text-center">
        {/* Lost Dog Icon */}
        <div className="mb-6 text-6xl">🐕</div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Uh Oh!</h1>
        <p className="text-xl font-semibold text-gray-700 mb-2">This page is lost...</p>
        <p className="text-gray-600 mb-8">
          Just like a dog without their owner, this page couldn't be found. Let's get it back home!
        </p>

        {/* Paw prints decoration */}
        <div className="flex justify-center gap-4 mb-8 text-3xl opacity-50">
          🐾 🐾 🐾
        </div>

        <div className="space-y-3">
          <p className="text-gray-600 text-sm mb-6">
            <Heart className="inline w-4 h-4 text-red-500 mr-2" />
            If you found a lost dog, scan their tag to see their profile!
          </p>

          <a
            href="/"
            className="inline-block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-gray-200 active:scale-95 transition-all duration-100 mb-3"
          >
            Back Home
          </a>

          <p className="text-gray-400 text-xs">
            Lost a pet? Visit our main page to learn how to get help!
          </p>
        </div>
      </div>
    </div>
  );
}
