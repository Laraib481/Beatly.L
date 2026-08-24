import { Music2, Play } from "lucide-react";

function TrendingList({ songs }) {
  return (
    <div className="space-y-3">

      {songs.map((song, index) => (

        <div
          key={song._id}
          className="
            group
            relative
            flex
            flex-col
            sm:flex-row
            sm:items-center
            justify-between
            gap-5
            p-4
            sm:p-5
            rounded-2xl
            bg-[#0d0d0d]
            border border-white/[0.06]
            hover:border-[#D4A574]/30
            hover:bg-[#111]
            transition-all
            duration-300
          "
        >

          {/* Left side */}

          <div className="flex items-center gap-3 sm:gap-5 min-w-0">

            {/* Number */}

            <span className="
              hidden
              sm:block
              text-gray-600
              text-sm
              w-5
              shrink-0
            ">
              {String(index + 1).padStart(2, "0")}
            </span>


            {/* Cover */}

            <div className="relative shrink-0">

              <img
                src={song.coverImage}
                alt={song.title}
                className="
                  w-14
                  h-14
                  sm:w-16
                  sm:h-16
                  rounded-xl
                  object-cover
                  group-hover:scale-105
                  transition
                  duration-300
                "
              />

              <div className="
                absolute
                inset-0
                rounded-xl
                bg-black/0
                group-hover:bg-black/30
                transition
              " />

            </div>


            {/* Details */}

            <div className="min-w-0">

              <h3 className="font-semibold text-base sm:text-lg truncate">
                {song.title}
              </h3>

              <div className="flex items-center gap-2 mt-1">

                <Music2
                  size={13}
                  className="text-[#D4A574] shrink-0"
                />

                <p className="text-gray-500 text-sm truncate">
                  {song.artist?.username || "Unknown Artist"}
                </p>

              </div>

            </div>

          </div>


          {/* Audio */}

          <div className="w-full sm:w-auto sm:min-w-[280px] lg:min-w-[320px]">

            <audio
              controls
              className="w-full h-10"
            >

              <source
                src={song.uri}
                type="audio/mpeg"
              />

              Your browser does not support audio.

            </audio>

          </div>

        </div>

      ))}

    </div>
  );
}

export default TrendingList;