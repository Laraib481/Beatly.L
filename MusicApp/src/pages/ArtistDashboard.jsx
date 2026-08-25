import {
  Search,
  Bell,
  Upload,
  Music2,
  Play,
  Pause,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import vinyl from "../assets/vinyl.png";

function ArtistDashboard() {
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const [musics, setMusics] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentMusic, setCurrentMusic] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Get logged-in artist
  const user = JSON.parse(localStorage.getItem("user"));

  // ================= FETCH MY SONGS =================

  useEffect(() => {
    const fetchMyMusics = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not logged in.");
          return;
        }

        const response = await fetch(`${API}/api/music/my-songs`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch your songs");
        }

        setMusics(data.musics || []);
      } catch (error) {
        console.log("Fetch my songs error:", error);
        setError(error.message || "Unable to load your songs");
      } finally {
        setLoading(false);
      }
    };

    fetchMyMusics();
  }, [API]);

  // ================= SEARCH =================

  const filteredMusics = musics.filter((music) => {
    const searchText = search.toLowerCase().trim();

    const title = music.title?.toLowerCase() || "";

    return title.includes(searchText);
  });

  // ================= DELETE MUSIC =================

  const handleDelete = async (musicId, musicTitle) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${musicTitle}"?`
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(musicId);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not logged in.");
        return;
      }

      const response = await fetch(`${API}/api/music/${musicId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete music");
        return;
      }

      // Remove deleted music from UI
      setMusics((previousMusics) =>
        previousMusics.filter((music) => music._id !== musicId)
      );

      // Stop player if deleted music was playing
      if (currentMusic === musicId) {
        setCurrentMusic(null);
      }

      alert(data.message || "Music deleted successfully");
    } catch (error) {
      console.log("Delete music error:", error);
      alert("Something went wrong while deleting music");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      {/* ================= NAVBAR ================= */}

      <nav className="px-5 sm:px-8 lg:px-12 py-5 sm:py-6">

        <div className="flex items-center justify-between gap-4">

          {/* Logo */}

          <h1 className="text-2xl sm:text-3xl font-bold text-[#D4A574] tracking-wide shrink-0">
            Beatly
          </h1>

          {/* Desktop / Tablet Right Side */}

          <div className="hidden sm:flex items-center gap-3 md:gap-5 lg:gap-6">

            {/* Search */}

            <div className="flex items-center bg-[#111] border border-[#222] rounded-full px-4 lg:px-5 py-3 w-[260px] md:w-[320px] lg:w-[380px]">

              <Search
                size={18}
                className="text-gray-500 shrink-0"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your songs..."
                className="bg-transparent outline-none w-full ml-3 placeholder:text-gray-500 text-sm lg:text-base"
              />

            </div>

            <Bell
              size={22}
              className="cursor-pointer hover:text-[#D4A574] duration-300 shrink-0"
            />

            <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-[#D4A574] text-black flex items-center justify-center font-bold shrink-0">
              {user?.username?.charAt(0)?.toUpperCase() || "L"}
            </div>

          </div>

          {/* Mobile Profile */}

          <div className="sm:hidden w-10 h-10 rounded-full bg-[#D4A574] text-black flex items-center justify-center font-bold shrink-0">
            {user?.username?.charAt(0)?.toUpperCase() || "L"}
          </div>

        </div>

        {/* Mobile Search */}

        <div className="sm:hidden flex items-center bg-[#111] border border-[#222] rounded-full px-4 py-3 mt-5 w-full">

          <Search
            size={18}
            className="text-gray-500 shrink-0"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your songs..."
            className="bg-transparent outline-none w-full ml-3 placeholder:text-gray-500 text-sm"
          />

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="grid lg:grid-cols-2 items-center px-5 sm:px-8 lg:px-14 pt-10 sm:pt-12 lg:pt-14">

        {/* LEFT */}

        <div className="max-w-2xl">

          <p className="tracking-[3px] sm:tracking-[5px] lg:tracking-[7px] text-[#D4A574] mb-5 sm:mb-6 text-xs sm:text-sm lg:text-base">
            CREATE • SHARE • INSPIRE
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif leading-[1.05]">

            Share Your

            <br />

            <span className="italic text-[#D4A574]">
              Music
            </span>

            <br />

            With The World

          </h1>

          <p className="mt-6 sm:mt-8 text-gray-400 text-base sm:text-lg leading-7 sm:leading-8 max-w-xl">

            Upload your music, connect with listeners,
            and grow your audience through Beatly's
            premium streaming platform.

          </p>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 lg:gap-5 mt-9 sm:mt-12">

            {/* Upload */}

            <button
              onClick={() => navigate("/upload")}
              className="w-full sm:w-auto justify-center bg-[#D4A574] hover:bg-[#e6b985] text-black px-6 sm:px-8 py-4 rounded-full flex items-center gap-3 font-semibold duration-300 hover:scale-105"
            >

              <Upload size={20} />

              Upload Music

            </button>

            {/* My Songs */}

            <button
              onClick={() =>
                document
                  .getElementById("your-songs")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full sm:w-auto justify-center border border-[#333] px-6 sm:px-8 py-4 rounded-full hover:border-[#D4A574] hover:text-[#D4A574] duration-300 flex items-center gap-3"
            >

              <Music2 size={20} />

              My Songs

            </button>

            {/* Explore Other */}

            <button
              onClick={() => navigate("/explore")}
              className="w-full sm:w-auto justify-center border border-[#333] px-6 sm:px-8 py-4 rounded-full hover:border-[#D4A574] hover:text-[#D4A574] duration-300 flex items-center gap-3"
            >

              <Music2 size={20} />

              Explore Other

            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative flex justify-center mt-12 lg:mt-0">

          <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[450px] lg:h-[450px] rounded-full bg-[#D4A574]/20 blur-[90px] sm:blur-[110px] lg:blur-[130px]" />

          <img
            src={vinyl}
            alt="Vinyl"
            className="w-[320px] sm:w-[450px] lg:w-[620px] animate-spin-slow relative z-10"
          />

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section className="px-5 sm:px-8 lg:px-14 mt-16 sm:mt-20">

        <div className="max-w-sm w-full">

          <div className="bg-[#111] rounded-3xl border border-[#222] p-6 sm:p-7 hover:border-[#D4A574] duration-300">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-gray-400">
                  Your Songs
                </p>

                <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-[#D4A574]">
                  {musics.length}
                </h2>

              </div>

              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#D4A574]/10 flex items-center justify-center shrink-0">

                <Music2
                  size={26}
                  className="text-[#D4A574]"
                />

              </div>

            </div>

            <p className="text-gray-500 text-sm mt-5">
              Total music uploaded to Beatly
            </p>

          </div>

        </div>

      </section>

      {/* ================= CONTINUE CREATING ================= */}

      <section className="px-5 sm:px-8 lg:px-14 mt-16 sm:mt-20">

        <div className="bg-gradient-to-r from-[#111] to-[#1b1b1b] rounded-3xl border border-[#222] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">

          <div>

            <p className="tracking-[3px] sm:tracking-[5px] uppercase text-[#D4A574] text-xs sm:text-sm">
              Continue Creating
            </p>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 leading-tight">
              Ready to release your next hit?
            </h2>

            <p className="text-gray-400 mt-4 max-w-xl text-sm sm:text-base leading-7">
              Upload your next masterpiece and share it with thousands of listeners.
            </p>

          </div>

          <button
            onClick={() => navigate("/upload")}
            className="w-full lg:w-auto bg-[#D4A574] text-black px-7 sm:px-8 py-4 rounded-full font-semibold hover:scale-105 duration-300 shrink-0"
          >
            Upload Song
          </button>

        </div>

      </section>

      {/* ================= YOUR SONGS ================= */}

      <section
        id="your-songs"
        className="px-5 sm:px-8 lg:px-14 mt-16 sm:mt-20 pb-16"
      >

        <div className="mb-8">

          <p className="text-[#D4A574] tracking-[3px] sm:tracking-[4px] text-xs uppercase mb-2">
            Your Library
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold">
            Your Latest Uploads
          </h2>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Manage and listen to your published music
          </p>

        </div>

        {/* Loading */}

        {loading && (
          <div className="text-center py-20 text-gray-400">
            Loading your songs...
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="text-center py-20 text-red-400">
            {error}
          </div>
        )}

        {/* No Songs */}

        {!loading && !error && filteredMusics.length === 0 && (

          <div className="text-center py-16 sm:py-20">

            <p className="text-gray-400 text-base sm:text-lg">
              {search
                ? "No matching songs found."
                : "You haven't uploaded any songs yet."}
            </p>

            {!search && (
              <button
                onClick={() => navigate("/upload")}
                className="mt-6 bg-[#D4A574] text-black px-6 py-3 rounded-full font-semibold hover:scale-105 duration-300"
              >
                Upload Your First Song
              </button>
            )}

          </div>

        )}

        {/* REAL SONGS */}

        {!loading && !error && filteredMusics.length > 0 && (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">

            {filteredMusics.map((music) => (

              <div
                key={music._id}
                className="bg-[#111] rounded-3xl overflow-hidden border border-[#222] hover:border-[#D4A574] hover:-translate-y-2 duration-300"
              >

                {/* Cover */}

                <div className="h-52 sm:h-56 relative bg-[#222]">

                  <img
                    src={music.coverImage}
                    alt={music.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Play */}

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

                {/* Details */}

                <div className="p-5 sm:p-6">

                  <h3 className="text-lg sm:text-xl font-semibold truncate">
                    {music.title}
                  </h3>

                  <p className="text-gray-400 mt-2 text-sm sm:text-base">
                    {music.artist?.username || user?.username || "Artist"}
                  </p>

                  <p className="text-gray-600 text-xs mt-2">
                    Published on Beatly
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

                  {/* Actions */}

                  <div className="flex items-center gap-3 mt-5">

                    <button
                      onClick={() => {
                        if (currentMusic === music._id) {
                          setCurrentMusic(null);
                        } else {
                          setCurrentMusic(music._id);
                        }
                      }}
                      className="flex-1 border border-[#333] py-3 rounded-xl hover:border-[#D4A574] hover:text-[#D4A574] duration-300 flex items-center justify-center gap-2"
                    >

                      {currentMusic === music._id ? (
                        <>
                          <Pause size={17} />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play size={17} />
                          Play
                        </>
                      )}

                    </button>

                    {/* DELETE */}

                    <button
                      onClick={() =>
                        handleDelete(music._id, music.title)
                      }
                      disabled={deletingId === music._id}
                      className="w-12 h-12 rounded-xl border border-red-900/40 text-red-400 hover:bg-red-500 hover:text-white duration-300 flex items-center justify-center disabled:opacity-50"
                    >

                      {deletingId === music._id ? (
                        <span className="text-xs">
                          ...
                        </span>
                      ) : (
                        <Trash2 size={18} />
                      )}

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default ArtistDashboard;

