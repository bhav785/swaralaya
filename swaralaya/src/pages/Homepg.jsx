import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AddSong from "../components/AddSong";
import SongModal from "../components/SongModal";
import { supabase } from "../supabaseclient";

function MusicCard({ title, description, onClick }) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
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
          <button className="text-[#b67f1f] hover:text-[#8b6b2c] text-sm font-medium transition-colors">
            View →
          </button>
        </div>
      </div>
    </div>
  );
}

function Homepg() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [addSong, setAddSong] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchSongs = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false }); // latest first

    if (error) console.error("Error fetching songs:", error.message);
    else setSongs(data || []);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleAddSong = () => setAddSong(true);
  const handleSongAdded = () => {
    setAddSong(false);
    fetchSongs(); // refresh list when new song added
  };
  const handleOnClose = () => setAddSong(false);
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <NavBar />
      <div
        className="min-h-screen py-12 px-6 font-sans"
        style={{ backgroundColor: "#f2f0e4" }}
      >
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
            {/* Add Song Button */}
            <button
              onClick={handleAddSong}
              className="bg-[#b67f1f] hover:bg-[#8b6b2c] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Song
            </button>
            <div className="flex-1 w-full">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search your lists..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#b67f1f] focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Stats Box */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between border border-gray-100 w-full sm:w-auto">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {songs.length}
                </h2>
                <p className="text-gray-600 text-sm font-medium">Total Songs</p>
              </div>
              <div className="bg-[#b67f1f] text-white p-3 rounded-xl shadow-md ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19V6l12-2v13M9 10l12-2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Add Song Modal */}
        {addSong && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full">
              <AddSong onSongAdded={handleSongAdded} onClose={handleOnClose} />
            </div>
          </div>
        )}

        {/* Song Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {songs.length === 0 ? (
            <p className="text-gray-600 text-center w-full col-span-full">
              No songs added yet. Click “Add Song” to get started!
            </p>
          ) : (
            filteredSongs.map((card, i) => (
              <MusicCard
                key={i}
                title={card.title}
                description={card.description}
                onClick={() => setSelectedSong(card)}
              />
            ))
          )}
        </div>

        {selectedSong && (
          <SongModal
            song={selectedSong}
            onClose={() => setSelectedSong(null)}
          />
        )}
      </div>
    </>
  );
}

export default Homepg;
