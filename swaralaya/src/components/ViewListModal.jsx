import React, { useState, useEffect } from "react";
import SongModal from "./SongModal"; 
import { supabase } from "../supabaseclient"; 

export default function ViewListModal({ list, onClose }) {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!list) return;

    const fetchSongs = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("song_lists_songs")
          .select(`
            song_id,
            songs (
              id,
              title,
              image_urls
            )
          `)
          .eq("list_id", list.id);

        if (error) throw error;

        const songData = data.map((d) => d.songs);
        setSongs(songData);
      } catch (err) {
        console.error("Error fetching songs:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [list]);

  if (!list) return null;

  return (
    <>
      {/* Main modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div 
          className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md max-h-[80vh] overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-[#b67f1f] p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#b67f1f]">
                  {list.name}
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  {songs.length} {songs.length === 1 ? 'song' : 'songs'}
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b67f1f]"></div>
                <p className="text-gray-600 text-sm">Loading songs...</p>
              </div>
            ) : songs.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <p className="text-gray-600 text-sm">No songs in this list.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {songs.map((song, index) => (
                  <button
                    key={song.id}
                    onClick={() => setSelectedSong(song)}
                    className="w-full flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group border border-transparent hover:border-gray-200 text-left"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-black truncate group-hover:text-[#b67f1f] transition-colors">
                        {song.title}
                      </p>
                    </div>
                    
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-[#b67f1f] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            )}
          </div>


        </div>
      </div>

      {/* Song view modal (nested) */}
      {selectedSong && (
        <SongModal
          song={selectedSong}
          onClose={() => setSelectedSong(null)}
        />
      )}
    </>
  );
}