import { useState } from "react";

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
    <div className="max-w-5xl mx-auto p-6 eagle-lake-regular">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold mb-6 text-center text-[#b67f1f]">
          List Of Songs
        </h1>
        <input
          type="text"
          placeholder="Search songs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-[#e6dab8] text-gray-700">
            <th className="border border-gray-300 px-6 py-3 text-left">
              Title
            </th>
            <th className="border border-gray-300 px-6 py-3 text-left">
              Composer
            </th>
            <th className="border border-gray-300 px-6 py-3 text-left">
              Ragam
            </th>
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
            // <tr key={index} >className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <tr key={index} className="hover:bg-[#c7c3b8] ">
              <td className="border border-gray-300 px-6 py-3">{song.title}</td>
              <td className="border border-gray-300 px-6 py-3">
                {song.composer}
              </td>
              <td className="border border-gray-300 px-6 py-3">{song.ragam}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Indexpg;
