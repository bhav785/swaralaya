import { React, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import CreateList from "../components/CreateList";
import { supabase } from "../supabaseclient";
import ViewListModal from "../components/ViewListModal";
function ListCard({ title, onClick }) {
  return (
    <div onClick={onClick} className="group cursor-pointer">
      <div className="block p-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 dark:bg-[#f8f4e6] h-full flex flex-col">
        <div className="flex-1">
          <h5 className="mb-3 text-xl font-bold tracking-tight text-gray-800 dark:text-[#8b6b2c] line-clamp-2">
            {title}
          </h5>
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

function Listpg() {
  const [searchTerm, setSearchTerm] = useState("");
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const fetchLists = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("song_lists")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });
    if (error) console.error("Error fetching songs:", error.message);
    else setLists(data || []);
  };
  useEffect(() => {
    fetchLists();
  }, []);
  const [showListModal, setShowListModal] = useState(false);
  const handleListAdded = () => {
    setShowListModal(false);
    fetchLists(); // re-fetch updated lists
  };
  const filteredLists = lists.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <NavBar />
      <div className="min-h-screen py-12 px-4 sm:px-6 font-sans bg-[#f2f0e4]">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          {/* Top Bar: Create Button + Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            {/* Search Bar */}
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

            {/* Create New List Button */}
            <button
              className="bg-[#b67f1f] hover:bg-[#8b6b2c] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => setShowListModal(true)}
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
              Create New List
            </button>

            {showListModal && (
              <CreateList
                onClose={() => setShowListModal(false)}
                onListAdded={handleListAdded}
              />
            )}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLists.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center px-6 py-4">
                  No Lists found.
                </td>
              </tr>
            ) : (
              filteredLists.map((card, i) => (
                <ListCard
                  key={i}
                  title={card.name}
                  //description={card.description}
                  onClick={() => {
                    setSelectedList(card);
                  }}
                />
              ))
            )}
          </div>
          {selectedList && (
            <ViewListModal
              list={selectedList}
              onClose={() => setSelectedList(null)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Listpg;
