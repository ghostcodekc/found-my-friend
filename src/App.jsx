import React from 'react';
import { Phone, MapPin, Info, Heart, Share2, MessageCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useDogProfile } from './hooks/useDogProfile';

function App() {
  const { uuid } = useParams();
  const { dogProfile, loading, error } = useDogProfile(uuid);

  // Handle case where dog is not found
  if (!dogProfile) {
    if (loading) {
      return (
        <div className="min-h-screen bg-background flex justify-center items-center">
          <div className="w-full max-w-md bg-surface shadow-xl p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>
            <p className="text-gray-600">Finding dog profile...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="w-full max-w-md bg-surface shadow-xl p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Dog Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the profile for this dog.</p>
          <a href="/" className="inline-block px-4 py-2 bg-secondary hover:bg-emerald-600 text-black font-bold rounded-xl">
            Back Home
          </a>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="w-full max-w-md bg-surface shadow-xl p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">There was an error loading the dog profile.</p>
          <a href="/" className="inline-block px-4 py-2 bg-secondary hover:bg-emerald-600 text-black font-bold rounded-xl">
            Back Home
          </a>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Found Dog: ${dogProfile.name}`,
          text: `I found ${dogProfile.name}! Here is the contact info.`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      alert('URL copied to clipboard');
    }
  };

  const handleSendLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const locationText = `Location: https://maps.google.com/?q=${latitude},${longitude}`;
        const smsLink = `sms:${dogProfile.phoneLink}?body=Hi ${dogProfile.ownerFirstName}, I found your dog, ${dogProfile.name}! Click here to meet me! ${encodeURIComponent(locationText)}`;
        window.location.href = smsLink;
      }, (error) => {
        alert('Unable to get location. Please call the owner instead.');
      });
    } else {
      alert('Geolocation is not supported by your browser. Please call the owner instead.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      {/* Mobile Container */}
      <div className="w-full max-w-md bg-surface shadow-xl min-h-screen flex flex-col relative">
        
        {/* --- Header Image Area --- */}
        <div className="relative h-125 bg-gray-200">
          <img 
            src={dogProfile.image} 
            alt={dogProfile.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-4xl font-bold tracking-tight">{dogProfile.name}</h1>
            <p className="text-lg font-medium opacity-90 flex items-center gap-1">
              <Heart className="w-4 h-4 fill-current text-red-400" /> 
              {dogProfile.tagline}
            </p>
          </div>
        </div>

        {/* --- Main Content --- */}
        <div className="flex-1 p-6 pb-24 space-y-6">
          
          {/* Urgent Message Card */}
          {dogProfile.medical && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
              <h3 className="text-red-700 font-bold flex items-center gap-2">
                <Info className="w-5 h-5" />
                Urgent Note
              </h3>
              <p className="text-red-600 mt-1 text-sm">
                {dogProfile.medical}
              </p>
            </div>
          )}

          {/* Dog Details Grid */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 font-semibold text-gray-500 text-xs uppercase tracking-wider">
              Profile Details
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { label: "Owner", value: `${dogProfile.ownerFirstName} ${dogProfile.ownerLastName}` },
                ...dogProfile.details
              ].map((item, index) => (
                <div key={index} className="px-4 py-3 flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{item.label}</span>
                  <span className="font-medium text-gray-800 text-sm w-1/2 text-right break-word">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="text-center pt-2">
            <p className="text-gray-400 text-xs mt-1">
              Scanning location is <b>NOT</b> automatically tracked. <br/>Please press one of the buttons below to report location.
            </p>
          </div>

        </div>

        {/* --- Sticky Action Footer --- */}
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] space-y-2">
          <a 
            href={`tel:${dogProfile.phoneLink}`}
            className="flex items-center justify-center gap-3 w-full bg-emerald-600 text-white text-lg font-bold py-3 rounded-xl shadow-lg shadow-gray-200 active:scale-95 transition-all duration-100"
          >
            <Phone className="w-6 h-6" />
            Call {dogProfile.ownerFirstName} Now
          </a>
          
          <button
            onClick={handleSendLocation}
            className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white text-lg font-bold py-3 rounded-xl shadow-lg shadow-gray-200 active:scale-95 transition-all duration-100 animate-pulse-slow"
          >
            <MessageCircle className="w-5 h-5" />
            Send Location via Text
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;