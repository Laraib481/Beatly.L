import vinyl from "../assets/vinyl.png";
import { Headphones, Play } from "lucide-react";

function Hero() {

  const scrollToMusic = () => {
    document
      .getElementById("trending")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#070707]">

      {/* Background glow */}

      <div className="absolute top-20 right-[-120px] sm:right-[-80px] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#D4A574]/10 blur-[100px] sm:blur-[140px] animate-pulse pointer-events-none" />

      <div className="absolute bottom-[-150px] left-[-150px] w-[300px] h-[300px] rounded-full bg-[#D4A574]/5 blur-[100px] pointer-events-none" />


      {/* Main content */}

      <div className="relative max-w-7xl mx-auto min-h-[calc(100vh-80px)] px-5 sm:px-8 lg:px-12 flex items-center">

        <div className="w-full grid lg:grid-cols-2 gap-10 lg:gap-4 items-center py-16 lg:py-10">


          {/* ================= LEFT ================= */}

          <div className="relative z-10 text-center lg:text-left">

            <div className="inline-flex items-center gap-2 border border-[#D4A574]/20 bg-[#D4A574]/5 rounded-full px-4 py-2 mb-7">

              <span className="w-2 h-2 rounded-full bg-[#D4A574] animate-pulse" />

              <span className="text-[#D4A574] text-xs sm:text-sm tracking-[3px] uppercase">
                Beatly Experience
              </span>

            </div>


            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.95] text-[#f4f1ec]">

              Feel the

              <br />

              <span className="text-[#D4A574] italic">
                Warmth
              </span>

              <br />

              <span className="text-white/90">
                of Sound
              </span>

            </h1>


            <p className="text-gray-400 text-base sm:text-lg lg:text-xl leading-8 max-w-xl mx-auto lg:mx-0 mt-7">

              Immerse yourself in the rich, analog warmth of Beatly.
              Discover music, artists and sounds worth remembering.

            </p>


            {/* Buttons */}

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-9">

              <button
                onClick={scrollToMusic}
                className="group bg-[#D4A574] text-black px-7 sm:px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-[#e6b985] hover:scale-105 transition duration-300 shadow-[0_0_30px_rgba(212,165,116,0.12)]"
              >

                <Headphones size={20} />

                Start Listening

                <Play
                  size={16}
                  className="group-hover:translate-x-1 transition"
                />

              </button>


              <button
                onClick={scrollToMusic}
                className="border border-white/10 bg-white/[0.03] px-7 sm:px-8 py-4 rounded-full text-gray-300 hover:border-[#D4A574]/50 hover:text-[#D4A574] transition duration-300"
              >
                Explore Music
              </button>

            </div>


            {/* Small stats */}

            <div className="flex justify-center lg:justify-start gap-8 sm:gap-12 mt-10">

              <div>
                <p className="text-2xl font-bold text-white">
                  ∞
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Sounds
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">
                  24/7
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Listening
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">
                  100%
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Passion
                </p>
              </div>

            </div>

          </div>


          {/* ================= RIGHT ================= */}

          <div className="relative flex items-center justify-center min-h-[360px] sm:min-h-[500px] lg:min-h-[600px]">

            {/* Glow */}

            <div className="absolute w-[250px] sm:w-[380px] lg:w-[500px] aspect-square rounded-full bg-[#D4A574]/15 blur-[80px] sm:blur-[110px] animate-pulse" />


            {/* Vinyl */}

            <img
              src={vinyl}
              alt="Beatly Vinyl"
              className="
                relative z-10
                w-[280px]
                sm:w-[400px]
                md:w-[470px]
                lg:w-[560px]
                xl:w-[620px]
                drop-shadow-[0_0_60px_rgba(212,165,116,0.15)]
                animate-spin-slow
                transition-transform
              "
            />


            {/* Floating music card */}

            <div className="
              absolute
              z-20
              bottom-3
              sm:bottom-8
              left-1/2
              -translate-x-1/2
              w-[calc(100%-40px)]
              max-w-[330px]
              sm:max-w-[360px]
              bg-black/75
              backdrop-blur-xl
              border border-white/10
              rounded-2xl
              px-4 sm:px-5
              py-3 sm:py-4
              shadow-2xl
              animate-bounce
            "
            style={{ animationDuration: "4s" }}
            >

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-[#D4A574]/15 flex items-center justify-center shrink-0">

                  <Headphones
                    size={20}
                    className="text-[#D4A574]"
                  />

                </div>

                <div className="min-w-0">

                  <p className="text-[#D4A574] font-semibold truncate">
                    Golden Hour
                  </p>

                  <p className="text-gray-500 text-sm truncate">
                    Beatly Original
                  </p>

                </div>

                <div className="ml-auto flex items-end gap-1 h-6">

                  <span className="w-1 h-2 bg-[#D4A574] rounded-full animate-pulse" />
                  <span className="w-1 h-4 bg-[#D4A574] rounded-full animate-pulse" />
                  <span className="w-1 h-6 bg-[#D4A574] rounded-full animate-pulse" />
                  <span className="w-1 h-3 bg-[#D4A574] rounded-full animate-pulse" />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;