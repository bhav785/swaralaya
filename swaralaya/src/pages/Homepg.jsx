import React from "react";

function MusicCard({ title, description }) {
  return (
    <div className="group cursor-pointer">
      <div className="block p-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 dark:bg-[#f8f4e6] h-full flex flex-col">
        <div className="flex-1">
          <h5 className="mb-3 text-xl font-bold tracking-tight text-gray-800 dark:text-[#8b6b2c] line-clamp-2">
            {title}
          </h5>
          <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-200 flex justify-between items-center">
          <span className="text-xs text-gray-400 dark:text-gray-400">3 items</span>
          <button className="text-[#b67f1f] hover:text-[#8b6b2c] text-sm font-medium transition-colors">
            View →
          </button>
        </div>
      </div>
    </div>
  );
}

function Homepg() {
  const cards = [
    { title: "Vathapi Ganapathim", description: "Ragam: Hamaswadvani Talam: Adhi Talam" },
    { title: "River Flows in You", description: "Yiruma piano composition" },
    { title: "Perfect", description: "Ed Sheeran – guitar chords" },
    { title: "Someone Like You", description: "Adele – vocal + piano notes" },
    { title: "Let It Be", description: "The Beatles – classic pop" },
    { title: "Tum Hi Ho", description: "Arjit Singh – Indian melody" },
  ];

  return (
    <div
      className="min-h-screen py-12 px-6 font-sans"
      style={{ backgroundColor: "#f2f0e4" }}
    >
      <div className="max-w-6xl mx-auto text-center mb-12 eagle-lake-regular">
        <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#8b6b2c] mb-3 eagle-lake-regular">
         My Notations
        </h1>
            <button 
              className="bg-[#b67f1f] hover:bg-[#8b6b2c] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Song
            </button>
      </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <MusicCard key={i} title={card.title} description={card.description} />
        ))}
      </div>
    </div>
  );
}

export default Homepg;
