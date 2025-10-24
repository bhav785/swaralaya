import React from "react";
import NavBar from "../components/NavBar";
function ListCard({ title, description }) {
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

function Listpg() {
  const cards = [
    { 
      title: "Summer Concert Series", 
      description: "Upcoming outdoor concerts and music festivals for summer 2024" 
    },
    { 
      title: "Jazz & Blues Nights", 
      description: "Intimate jazz club performances and blues sessions" 
    },
    { 
      title: "Electronic Music Events", 
      description: "EDM festivals and electronic music shows in the city" 
    },
    { 
      title: "Classical Evenings", 
      description: "Orchestra performances and classical music recitals" 
    },
    { 
      title: "Local Band Showcase", 
      description: "Discover emerging local talent and indie artists" 
    },
    { 
      title: "International Artists", 
      description: "World tours and international music stars visiting our city" 
    },
  ];

  return (
    <>
    <NavBar/>
    <div
      className="min-h-screen py-12 px-4 sm:px-6 font-sans bg-[#f2f0e4]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="text-left mb-6 sm:mb-0">
              {/* <h1 className="text-4xl sm:text-5xl font-bold text-[#8b6b2c] mb-3 eagle-lake-regular">
                My Lists
              </h1> */}
            </div>
            <button 
              className="bg-[#b67f1f] hover:bg-[#8b6b2c] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New List
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search your lists..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#b67f1f] focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#b67f1f] focus:border-transparent transition-all duration-300">
              <option>All Categories</option>
              <option>Upcoming</option>
              <option>Past Events</option>
              <option>Favorites</option>
            </select>
            <button className="px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
              Sort
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <ListCard key={i} title={card.title} description={card.description} />
          ))}
        </div>

        {/* Empty State (commented out for reference) */}
        {/*
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No lists yet</h3>
          <p className="text-gray-500 mb-6">Create your first list to start organizing concerts</p>
          <button className="bg-[#b67f1f] hover:bg-[#8b6b2c] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Create Your First List
          </button>
        </div>
        */}
      </div>
    </div>
    </>
  );
}

export default Listpg;