import React, { useState } from "react";
import { supabase } from "../supabaseclient";

function AddSong({ onSongAdded, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [composer, setComposer] = useState("");
  const [ragam, setRagam] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleUpload = async () => {
    if (!title || images.length === 0) {
      alert("Enter a title and select at least one image!");
      return;
    }

    setUploading(true);
    const uploadedUrls = [];

    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const fileName = `${title.replace(/\s+/g, "_")}_${i}_${file.name}`;
      const filePath = `songs/${fileName}`;

      // Upload file
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("song-sheets")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        continue;
      }

      // Get public URL
      const { data: urlData, error: urlError } = supabase.storage
        .from("song-sheets")
        .getPublicUrl(filePath);

      if (urlError) {
        console.error("Error getting public URL:", urlError.message);
        continue;
      }

      uploadedUrls.push(urlData.publicUrl);
    }

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError.message);
      setUploading(false);
      return;
    }

    // Insert into songs table
    const { error: insertError } = await supabase.from("songs").insert([
      {
        title,
        composer,
        ragam,
        description,
        image_urls: uploadedUrls,
        user_id: user.id,
      },
    ]);

    if (insertError)
      console.error("Database insert error:", insertError.message);
    else {
      alert("Song added successfully!");
      setTitle("");
      setDescription("");
      setComposer("");
      setRagam("");
      setImages([]);
      if (onSongAdded) onSongAdded();
      if (onClose) onClose();
    }

    setUploading(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        {/* Modal Container */}
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto font-sans">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Add New Song</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Song Title
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter song title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Composer Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Composer
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter composer name"
                value={composer}
                onChange={(e) => setComposer(e.target.value)}
              />
            </div>

            {/* Ragam Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rāgam
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter rāgam"
                value={ragam}
                onChange={(e) => setRagam(e.target.value)}
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Enter song description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sheet Music Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-amber-400 transition-colors duration-200">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept="image/*"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <svg
                    className="w-8 h-8 text-gray-400 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {images.length > 0
                      ? `${images.length} file(s) selected`
                      : "Click to upload sheet music images"}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              disabled={uploading}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="flex-1 px-4 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transform hover:scale-[1.02] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Add Song
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSong;
