import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseclient";

function CreateList({ onClose, onListAdded }) {
  const [name, setName] = useState("");
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user songs
  useEffect(() => {
    const fetchSongs = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("songs")
        .select("id, title")
        .eq("user_id", user.id);
      if (!error) setSongs(data);
    };
    fetchSongs();
  }, []);

  const handleSelect = (songId) => {
    setSelectedSongs((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    );
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("List name cannot be empty");
      return;
    }
    if (selectedSongs.length === 0) {
      setError("Please select at least one song");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Step 1: Create the list
      const { data: listData, error: listError } = await supabase
        .from("song_lists")
        .insert([{ name, user_id: user.id }])
        .select()
        .single();

      if (listError) throw listError;

      // Step 2: Add songs to song_list_songs
      const songEntries = selectedSongs.map((songId) => ({
        list_id: listData.id,
        song_id: songId,
      }));

      const { error: songListError } = await supabase
        .from("song_lists_songs")
        .insert(songEntries);

      if (songListError) throw songListError;

      onListAdded();
      onClose();
    } catch (err) {
      console.error(err.message);
      setError("Failed to create list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Create New List</h2>

        <form onSubmit={handleCreate}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              List Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#b67f1f]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Select Songs
            </label>
            <div className="max-h-40 overflow-y-scroll border border-gray-200 rounded-lg p-2">
              {songs.map((song) => (
                <label
                  key={song.id}
                  className="flex items-center space-x-2 py-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={song.id}
                    onChange={() => handleSelect(song.id)}
                    checked={selectedSongs.includes(song.id)}
                  />
                  <span className="text-gray-700">{song.title}</span>
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#b67f1f] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#a66e1c] ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating..." : "Create List"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateList;
