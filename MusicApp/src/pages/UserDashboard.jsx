import { Search, Bell, Play, Pause, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import vinyl from "../assets/vinyl.png";
import { useLocation, useNavigate } from "react-router-dom";

function UserDashboard() {
  const API = import.meta.env.VITE_API_URL;

  const location = useLocation();
  const navigate = useNavigate();

  const [musics, setMusics] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentMusic, setCurrentMusic] = useState(null);

  // Logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Explore Other mode
  const isArtistExplore =
    location.pathname === "/explore" && user?.role === "artist";

  // Fetch all uploaded songs
  useEffect(() => {
    const fetchMusics = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/api/music`);

        if (!response.ok) {
          throw new Error("Failed to fetch music");
        }

        const data = await response.json();

        setMusics(data.musics || []);
      } catch (error) {
        console.log(error);
        setError("Unable to load music");
      } finally {
        setLoading(false);
      }
    };

    fetchMusics();
  }, [API]);

  // Filter songs
  const filteredMusics = musics.filter((music) => {
    const searchText = search.toLowerCase().trim();

    const title = music.title?.toLowerCase() || "";
    const artist = music.artist?.username?.toLowerCase() || "";

    // Hide current artist's own songs in Explore mode
    if (
      isArtistExplore &&
      music.artist?._id === user?._id
    ) {
      return false;
    }

    // Search by song title or artist
    return (
      title.includes(searchText) ||
      artist.includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ================= NAVBAR ================= */}

      <nav className="px-5 sm:px-8 lg:px-10 py-5 sm:py-6">

        <div className="flex items-center justify-between gap-4">

          {/* Logo */}

          <h1 className="text-2xl sm:text-3xl font-bold text-[#D4A574] shrink-0">
            Beatly
          </h1>


          {/* Desktop Right */}

          <div className="hidden lg:flex items-center gap-5">

            {/* Search */}

            <div className="flex items-center bg-[#111] border border-[#222] px-5 py-3 rounded-full w-[380px]">

              <Search
                size={18}
                className="text-gray-400 shrink-0"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  isArtistExplore
                    ? "Search other artists..."
                    : "Search music..."
                }
                className="bg-transparent outline-none ml-3 w-full placeholder:text-gray-500"
              />

            </div>

            <Bell
              size={21}
              className="cursor-pointer text-gray-300 hover:text-[#D4A574] duration-300"
            />

            <div className="w-11 h-11 rounded-full bg-[#D4A574] flex items-center justify-center text-black font-bold shrink-0">
              {user?.username?.charAt(0)?.toUpperCase() || "L"}
            </div>

          </div>


          {/* Mobile / Tablet Profile */}

          <div className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#D4A574] flex items-center justify-center text-black font-bold shrink-0">
            {user?.username?.charAt(0)?.toUpperCase() || "L"}
          </div>

        </div>


        {/* Mobile / Tablet Search */}

        <div className="lg:hidden flex items-center bg-[#111] border border-[#222] px-4 sm:px-5 py-3 rounded-full w-full mt-5">

          <Search
            size={18}
            className="text-gray-400 shrink-0"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isArtistExplore
                ? "Search other artists..."
                : "Search music..."
            }
            className="bg-transparent outline-none ml-3 w-full placeholder:text-gray-500 text-sm sm:text-base"
          />

        </div>

      </nav>


      {/* ================= EXPLORE MODE BACK ================= */}

      {isArtistExplore && (
        <div className="px-5 sm:px-8 lg:px-16 pt-2 sm:pt-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-400 hover:text-[#D4A574] duration-300 text-sm sm:text-base"
          >
            <ArrowLeft size={18} />

            Back to Artist Dashboard
          </button>

        </div>
      )}


      {/* ================= HERO ================= */}

      <section className="grid lg:grid-cols-2 items-center px-5 sm:px-8 lg:px-16 pt-10 sm:pt-12">

        {/* LEFT */}

        <div className="max-w-2xl">

          <p className="tracking-[3px] sm:tracking-[5px] lg:tracking-[7px] text-[#D4A574] mb-5 sm:mb-6 text-xs sm:text-sm lg:text-base">

            {isArtistExplore
              ? "DISCOVER OTHER ARTISTS"
              : "PREMIUM MUSIC EXPERIENCE"}

          </p>


          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif leading-[1.05]">

            {isArtistExplore ? (
              <>
                Explore
                <br />

                <span className="italic text-[#D4A574]">
                  Other Music
                </span>
              </>
            ) : (
              <>
                Feel The
                <br />

                <span className="italic text-[#D4A574]">
                  Music
                </span>
              </>
            )}

          </h1>


          <p className="text-gray-400 mt-6 sm:mt-8 text-base sm:text-lg leading-7 sm:leading-8 max-w-xl">

            {isArtistExplore
              ? "Discover music from other artists, explore new sounds, and enjoy everything uploaded to Beatly."
              : "Discover millions of songs, curated playlists, and unforgettable artists in one beautiful place."}

          </p>


          {/* Explore Button */}

          <button
            onClick={() => {
              document
                .getElementById("music-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-8 sm:mt-10 w-full sm:w-auto justify-center bg-[#D4A574] text-black px-7 sm:px-8 py-4 rounded-full font-semibold hover:scale-105 duration-300 flex items-center gap-3"
          >

            <Play size={18} />

            {isArtistExplore
              ? "Explore Songs"
              : "Explore Music"}

          </button>

        </div>


        {/* RIGHT / VINYL */}

        <div className="relative flex justify-center mt-12 lg:mt-0">

          <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full bg-[#D4A574]/20 blur-[90px] sm:blur-[110px] lg:blur-[120px]" />

          <img
            src={vinyl}
            alt="Vinyl"
            className="w-[320px] sm:w-[450px] lg:w-[620px] animate-spin-slow relative z-10"
          />

        </div>

      </section>


      {/* ================= SONGS ================= */}

      <section
        id="music-section"
        className="px-5 sm:px-8 lg:px-16 mt-16 sm:mt-20 lg:mt-24 pb-16 sm:pb-20"
      >

        {/* Section Header */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 sm:mb-10">

          <h2 className="text-2xl sm:text-3xl font-bold">

            {search
              ? "Search Results"
              : isArtistExplore
                ? "Explore Other Artists"
                : "Available Music"}

          </h2>


          {!loading && !error && (
            <p className="text-gray-400 text-sm sm:text-base">

              {filteredMusics.length} song
              {filteredMusics.length !== 1 ? "s" : ""}

            </p>
          )}

        </div>


        {/* Loading */}

        {loading && (
          <div className="text-center py-16 sm:py-20 text-gray-400">
            Loading music...
          </div>
        )}


        {/* Error */}

        {!loading && error && (
          <div className="text-center py-16 sm:py-20 text-red-400">
            {error}
          </div>
        )}


        {/* No Songs */}

        {!loading && !error && filteredMusics.length === 0 && (

          <div className="text-center py-16 sm:py-20 px-4">

            <p className="text-gray-400 text-base sm:text-lg">

              {search
                ? "No songs found."
                : isArtistExplore
                  ? "No other artists have uploaded music yet."
                  : "No music has been uploaded yet."}

            </p>

          </div>

        )}


        {/* REAL SONGS */}

        {!loading && !error && filteredMusics.length > 0 && (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">

            {filteredMusics.map((music) => (

              <div
                key={music._id}
                className="bg-[#111] rounded-3xl overflow-hidden hover:-translate-y-2 duration-300 hover:shadow-[0_0_40px_rgba(212,165,116,0.25)]"
              >

                {/* Cover */}

                <div className="h-60 sm:h-64 relative bg-[#222]">

                  <img
                    src={music.coverImage}
                    alt={music.title}
                    className="w-full h-full object-cover"
                  />


                  {/* Play Button */}

                  <button
                    onClick={() => {
                      if (currentMusic === music._id) {
                        setCurrentMusic(null);
                      } else {
                        setCurrentMusic(music._id);
                      }
                    }}
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#D4A574] text-black flex items-center justify-center hover:scale-110 duration-200"
                  >

                    {currentMusic === music._id ? (
                      <Pause size={20} />
                    ) : (
                      <Play size={20} />
                    )}

                  </button>

                </div>


                {/* Song Details */}

                <div className="p-5 sm:p-6">

                  <h3 className="text-lg sm:text-xl font-semibold truncate">
                    {music.title}
                  </h3>

                  <p className="text-gray-400 mt-2 truncate text-sm sm:text-base">
                    {music.artist?.username || "Unknown Artist"}
                  </p>


                  {/* Audio */}

                  {currentMusic === music._id && (
                    <audio
                      src={music.uri}
                      controls
                      autoPlay
                      className="w-full mt-4"
                    />
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default UserDashboard;