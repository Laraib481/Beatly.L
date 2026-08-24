import { useEffect, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrendingList from "../components/TrendingList";

function Home() {
  const API = import.meta.env.VITE_API_URL;

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`${API}/api/music`);

        if (!response.ok) {
          throw new Error("Failed to fetch music");
        }

        const result = await response.json();

        setSongs(result.musics || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [API]);

  const scrollToMusic = () => {
    document
      .getElementById("trending")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      <Navbar />

      <Hero />


      {/* ================= INTRO ================= */}

      <section className="px-5 sm:px-8 lg:px-12 py-20 sm:py-28">

        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-10 items-end">

            <div>

              <div className="flex items-center gap-3 mb-5">

                <Sparkles
                  size={17}
                  className="text-[#D4A574]"
                />

                <p className="text-[#D4A574] tracking-[4px] text-xs uppercase">
                  The Beatly Sound
                </p>

              </div>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">

                Music is not just

                <span className="text-[#D4A574] italic">
                  {" "}heard.
                </span>

                <br />

                It's felt.

              </h2>

            </div>


            <div>

              <p className="text-gray-500 text-base sm:text-lg leading-8 max-w-xl lg:ml-auto">

                Discover fresh music from artists who have something
                to say. Put on your headphones and let the sound take over.

              </p>

              <button
                onClick={scrollToMusic}
                className="mt-6 flex items-center gap-2 text-[#D4A574] hover:text-[#e6b985] transition"
              >

                Explore the collection

                <ArrowDown
                  size={17}
                  className="animate-bounce"
                />

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================= TRENDING ================= */}

      <section
        id="trending"
        className="px-5 sm:px-8 lg:px-12 py-20 border-t border-white/5"
      >

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">

            <div>

              <p className="text-[#D4A574] tracking-[4px] text-xs uppercase mb-3">
                Fresh on Beatly
              </p>

              <h2 className="text-4xl sm:text-5xl font-bold">
                Trending Now
              </h2>

            </div>

            {!loading && songs.length > 0 && (
              <p className="text-gray-600 text-sm">
                {songs.length} songs available
              </p>
            )}

          </div>


          {loading && (

            <div className="py-20 text-center">

              <div className="w-9 h-9 mx-auto rounded-full border-2 border-[#333] border-t-[#D4A574] animate-spin" />

              <p className="text-gray-500 mt-4">
                Loading music...
              </p>

            </div>

          )}


          {!loading && songs.length === 0 && (

            <div className="py-20 text-center bg-[#0d0d0d] rounded-3xl border border-white/5">

              <p className="text-gray-500">
                No music has been uploaded yet.
              </p>

            </div>

          )}


          {!loading && songs.length > 0 && (
            <TrendingList songs={songs} />
          )}

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="px-5 sm:px-8 lg:px-12 py-20 sm:py-28">

        <div className="max-w-7xl mx-auto">

          <div className="
            relative
            overflow-hidden
            rounded-[2rem]
            border border-[#D4A574]/10
            bg-[#0b0b0b]
            px-6
            sm:px-10
            lg:px-16
            py-12
            sm:py-16
          ">

            <div className="
              absolute
              right-[-100px]
              top-[-100px]
              w-72
              h-72
              rounded-full
              bg-[#D4A574]/10
              blur-[100px]
              animate-pulse
            " />

            <div className="relative">

              <p className="text-[#D4A574] text-xs tracking-[4px] uppercase">
                Keep Listening
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl max-w-2xl leading-tight mt-4">

                Your next favorite song

                <span className="text-[#D4A574] italic">
                  {" "}might be waiting.
                </span>

              </h2>

              <button
                onClick={scrollToMusic}
                className="mt-8 bg-[#D4A574] text-black px-7 py-3.5 rounded-full font-semibold hover:bg-[#e6b985] hover:scale-105 transition duration-300"
              >
                Start Listening
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/5 px-5 sm:px-8 lg:px-12 py-8">

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

          <span className="text-xl font-bold text-[#D4A574]">
            Beatly
          </span>

          <span className="text-gray-600 text-sm">
            Music. Artists. Moments.
          </span>

          <span className="text-gray-700 text-sm">
            © 2026
          </span>

        </div>

      </footer>

    </div>
  );
}

export default Home;