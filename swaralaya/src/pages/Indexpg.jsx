import { useState } from "react";
import NavBar from "../components/NavBar";
function Indexpg() {
  const [searchTerm, setSearchTerm] = useState("");
  const songs = [
    { title: "Varavallabha", composer: "Composer A", ragam: "Hamsadhvani" },
    { title: "Song Two", composer: "Composer B", ragam: "Ragam Y" },
    { title: "Song Three", composer: "Composer C", ragam: "Ragam Z" },
  ];
  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.composer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.ragam.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <NavBar />
    <div className="max-w-5xl mx-auto p-6 font-sans">
      <div className="flex items-center justify-between mb-6">
        {/* <h1 className="text-4xl sm:text-5xl font-bold text-[#8b6b2c] mb-3 eagle-lake-regular">
          List Of Songs
        </h1> */}
        <div className="relative w-full max-w-md">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-md focus:ring-2 focus:ring-[#b67f1f] focus:border-transparent outline-none transition-all duration-300 text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>

      <table className="min-w-full table-auto rounded-xl shadow-2xl overflow-hidden bg-white">
        <thead>
          <tr className="bg-[#f8f4e6] text-gray-700">
            <th className="px-6 py-3 text-left font-semibold">Title</th>
            <th className="px-6 py-3 text-left font-semibold">Composer</th>
            <th className="px-6 py-3 text-left font-semibold">Ragam</th>
          </tr>
        </thead>
        <tbody>
          {filteredSongs.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center px-6 py-4">
                No songs found.
              </td>
            </tr>
          ) : null}
          {filteredSongs.map((song, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-[#e3e0d0] transition`}
            >
              <td className="px-6 py-3">{song.title}</td>
              <td className="px-6 py-3">{song.composer}</td>
              <td className="px-6 py-3">{song.ragam}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Indexpg;
