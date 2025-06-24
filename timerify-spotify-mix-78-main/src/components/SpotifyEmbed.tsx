import { useState } from "react";

const SoundCloudEmbed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songUrl, setSongUrl] = useState("");

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const clientId = "YOUR_SOUNDCLOUD_CLIENT_ID"; // Replace with your SoundCloud API Client ID
      const response = await fetch(
        `https://api.soundcloud.com/tracks?client_id=${clientId}&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setSongUrl(data[0].permalink_url); // Use the first search result
      } else {
        alert("No results found for your search.");
      }
    } catch (error) {
      console.error("Error fetching song data:", error);
      alert("An error occurred while searching for songs. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 text-center">SoundCloud Song Search</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search for your favorite song..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-l px-4 py-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-orange-500 text-white px-4 py-2 rounded-r hover:bg-orange-600"
        >
          Search
        </button>
      </div>

      {songUrl && (
        <div className="mt-4">
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(songUrl)}&color=%23ff5500&auto_play=true`}
            className="rounded-xl"
          />
        </div>
      )}
    </div>
  );
};

export default SoundCloudEmbed;
