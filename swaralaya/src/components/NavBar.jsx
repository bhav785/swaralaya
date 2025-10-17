import { useState } from 'react';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <a href="/" className="text-lg hover:text-amber-800 transition-colors hover:-translate-y-1">INDEX</a>
          <a href="/home" className="text-lg hover:text-amber-800 transition-transform hover:-translate-y-1">HOME</a>
          <a href="/lists" className="text-lg hover:text-amber-800 transition-colors hover:-translate-y-1">LISTS</a>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden bg-[#f2f0e4] border-t border-gray-300 eagle-lake-regular">
          <a href="/" className="block px-4 py-2 text-gray-900 hover:bg-amber-200 transition">INDEX</a>
          <a href="/home" className="block px-4 py-2 text-gray-900 hover:bg-amber-200 transition">HOME</a>
          <a href="/lists" className="block px-4 py-2 text-gray-900 hover:bg-amber-200 transition">LISTS</a>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
