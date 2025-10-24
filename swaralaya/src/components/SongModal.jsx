import React, { useState } from "react";

export default function SongModal({ song, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!song) return null; // no song selected

  const images = song.image_urls || [];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-gray-300"
      >
        &times;
      </button>

      {/* Image Display */}
      <div className="w-11/12 md:w-3/4 lg:w-2/4 flex justify-center items-center relative">
        <button
          onClick={prevImage}
          className="absolute left-0 text-white text-4xl font-bold px-4 hover:text-gray-300"
        >
          &#8249;
        </button>

        <img
          src={images[currentIndex]}
          alt={`Page ${currentIndex + 1}`}
          className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-lg"
        />

        <button
          onClick={nextImage}
          className="absolute right-0 text-white text-4xl font-bold px-4 hover:text-gray-300"
        >
          &#8250;
        </button>
      </div>

      {/* Page Indicator */}
      <p className="text-white mt-4">
        Page {currentIndex + 1} of {images.length}
      </p>
    </div>
  );
}
