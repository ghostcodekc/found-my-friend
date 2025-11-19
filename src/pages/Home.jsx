import React from 'react';
import { Heart, QrCode, Phone, MapPin, Search, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Container */}
      <div className="w-full max-w-md mx-auto bg-surface shadow-xl min-h-screen flex flex-col">
        
        {/* --- Hero Section --- */}
        <div className="bg-linear-to-b from-emerald-50 to-blue-50 p-8 text-center">
          <div className="text-6xl mb-4">🐕</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Found My Friend</h1>
          <p className="text-gray-600 text-lg">Reuniting Lost Pets with Their Families</p>
        </div>

        {/* --- Main Content --- */}
        <div className="flex-1 p-6 pb-24 space-y-6">
          
          {/* How It Works */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Search className="w-6 h-6 text-emerald-600" />
              How It Works
            </h2>
            
            <div className="space-y-3">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="flex gap-3">
                  <div className="text-2xl shrink-0">1️⃣</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Found a Dog?</h3>
                    <p className="text-sm text-gray-600">Look for a QR code tag on their collar or microchip scan.</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex gap-3">
                  <div className="text-2xl shrink-0">2️⃣</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Scan the Code</h3>
                    <p className="text-sm text-gray-600">Use your phone's camera to scan the QR code.</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex gap-3">
                  <div className="text-2xl shrink-0">3️⃣</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">View Pet Profile</h3>
                    <p className="text-sm text-gray-600">See the pet's info and owner's contact details.</p>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg">
                <div className="flex gap-3">
                  <div className="text-2xl shrink-0">4️⃣</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Make Contact</h3>
                    <p className="text-sm text-gray-600">Call or text the owner with your location. Happy reunion!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Shield className="w-6 h-6 text-emerald-600" />
              Features
            </h2>
            
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">One-Click Calling</p>
                  <p className="text-xs text-gray-600">Instantly call the pet's owner</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Share Your Location</p>
                  <p className="text-xs text-gray-600">Send a map link via text message</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <QrCode className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">QR Code Tags</p>
                  <p className="text-xs text-gray-600">Easy scanning with any smartphone</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Heart className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">100% Free</p>
                  <p className="text-xs text-gray-600">No cost to reunite lost pets with owners</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-linear-to-r from-emerald-50 to-blue-50 p-4 rounded-xl border-2 border-emerald-200">
            <p className="text-sm text-gray-700 text-center">
              <Heart className="inline w-4 h-4 text-red-500 mr-1" />
              Help reunite a lost pet today! If you find a dog with a tag, scan it to get started.
            </p>
          </div>

        </div>

        {/* --- Footer --- */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-gray-600 text-sm">
            Made with <Heart className="inline w-4 h-4 text-red-500" /> in Kansas City
          </p>
        </div>

      </div>
    </div>
  );
}
