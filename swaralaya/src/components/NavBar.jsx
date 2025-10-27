import { useState,useEffect } from "react";
import { supabase } from "../supabaseclient";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut(); 
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      console.log("User logged out successfully");
      
      navigate("/");
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user when component mounts
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.error(error);
      else setUser(data.user);
    };
    fetchUser();
  }, []);
  if (!user) return null;

  return (
    <nav className="bg-[#f2f0e4] sticky top-0 relative z-10 w-full border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16 justify-between">
        {/* Logo / Title on the left */}
        <div className="flex items-center">
          <h1 className="text-[#CB9D06] eagle-lake-regular font-bold text-2xl sm:text-3xl">
            Swaralaya
          </h1>
        </div>

        {/* Desktop navigation links */}
        <div className="hidden sm:flex space-x-8 items-center eagle-lake-regular font-medium text-gray-900">
          <a
            href="/index"
            className="text-lg hover:text-amber-800 transition-colors hover:-translate-y-1"
          >
            INDEX
          </a>
          <a
            href="/home"
            className="text-lg hover:text-amber-800 transition-transform hover:-translate-y-1"
          >
            NOTATIONS
          </a>
          <a
            href="/lists"
            className="text-lg hover:text-amber-800 transition-colors hover:-translate-y-1"
          >
            LISTS
          </a>
        </div>

        {/* User menu for desktop */}
        <div className="hidden sm:flex items-center">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 text-gray-700 hover:text-amber-800 transition-colors"
            >
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  user.user_metadata.name.charAt(0).toUpperCase()
                )}
              </div>
              <span className="eagle-lake-regular text-lg">{user.name}</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* User dropdown menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">
                    {user.user_metadata.full_name}
                  </p>
                 
                </div>
                <div className="border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-[#CB9D06]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden bg-[#f2f0e4] border-t border-gray-300 eagle-lake-regular">
          <a
            href="/index"
            className="block px-4 py-3 text-gray-900 hover:bg-amber-200 transition flex items-center gap-2"
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            INDEX
          </a>
          <a
            href="/home"
            className="block px-4 py-3 text-gray-900 hover:bg-amber-200 transition flex items-center gap-2"
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            NOTATIONS
          </a>
          <a
            href="/lists"
            className="block px-4 py-3 text-gray-900 hover:bg-amber-200 transition flex items-center gap-2"
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
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            LISTS
          </a>

          {/* Mobile user section */}
          <div className="border-t border-gray-300 mt-2 pt-2">
            <div className="px-4 py-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                     user.user_metadata.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {user.user_metadata.name}
                  </p>
                  
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for closing dropdowns when clicking outside */}
      {(menuOpen || userMenuOpen) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setMenuOpen(false);
            setUserMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
}

export default NavBar;
