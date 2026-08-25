// import { ArrowLeft, ImagePlus, Music2, Upload } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// function UploadMusic() {
//   const navigate = useNavigate();

//   const API = import.meta.env.VITE_API_URL;

//   const [formData, setFormData] = useState({
//     title: "",
//     cover: null,
//     music: null,
//   });

//   const [coverPreview, setCoverPreview] = useState("");
//   const [musicName, setMusicName] = useState("");

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       const file = files[0];

//       setFormData({
//         ...formData,
//         [name]: file,
//       });

//       if (name === "cover") {
//         setCoverPreview(URL.createObjectURL(file));
//       }

//       if (name === "music") {
//         setMusicName(file.name);
//       }
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.title) {
//       return alert("Please enter title");
//     }

//     if (!formData.cover) {
//       return alert("Please select cover image");
//     }

//     if (!formData.music) {
//       return alert("Please select music file");
//     }

//     try {
//       const token = localStorage.getItem("token");

//       const data = new FormData();

//       data.append("title", formData.title);
//       data.append("cover", formData.cover);
//       data.append("music", formData.music);

//       const response = await fetch(`${API}/api/music/upload`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: data,
//       });

//       console.log("Status:", response.status);

//       const result = await response.json();

//       console.log(result);

//       if (!response.ok) {
//         alert(result.message);
//         return;
//       }

//       alert("Music uploaded successfully 🎉");

//       navigate("/dashboard");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

//       {/* ================= NAVBAR ================= */}

//       <nav className="flex items-center justify-between px-5 sm:px-8 lg:px-12 py-5 sm:py-6 border-b border-[#181818]">

//         <h1 className="text-2xl sm:text-3xl font-bold text-[#D4A574]">
//           Beatly
//         </h1>

//         <button
//           onClick={() => navigate("/dashboard")}
//           className="flex items-center gap-2 text-[#D4A574] hover:text-white duration-300 text-sm sm:text-base"
//         >
//           <ArrowLeft size={18} />

//           <span>Back</span>
//         </button>

//       </nav>


//       {/* ================= PAGE TITLE ================= */}

//       <section className="text-center mt-12 sm:mt-16 px-5">

//         <p className="tracking-[3px] sm:tracking-[6px] text-[#D4A574] uppercase text-xs sm:text-sm">
//           Create • Upload • Inspire
//         </p>

//         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif mt-5 sm:mt-6 leading-tight">

//           Upload Your

//           <span className="text-[#D4A574] italic">
//             {" "}Music
//           </span>

//         </h1>

//         <p className="text-gray-400 mt-5 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-7 sm:leading-8">

//           Share your songs with listeners around the world.
//           Complete the details below and publish your next masterpiece.

//         </p>

//       </section>


//       {/* ================= FORM ================= */}

//       <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16">

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

//           {/* ================= LEFT ================= */}

//           <div className="space-y-5 sm:space-y-6">

//             {/* Song Title */}

//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Song Title"
//               className="w-full bg-[#111] border border-[#222] rounded-2xl px-5 sm:px-6 py-4 outline-none focus:border-[#D4A574] transition text-sm sm:text-base"
//             />


//             {/* Artist */}

//             <input
//               type="text"
//               placeholder="Artist Name"
//               className="w-full bg-[#111] border border-[#222] rounded-2xl px-5 sm:px-6 py-4 outline-none focus:border-[#D4A574] transition text-sm sm:text-base"
//             />


//             {/* Album */}

//             <input
//               type="text"
//               placeholder="Album Name"
//               className="w-full bg-[#111] border border-[#222] rounded-2xl px-5 sm:px-6 py-4 outline-none focus:border-[#D4A574] transition text-sm sm:text-base"
//             />


//             {/* Genre */}

//             <select
//               className="w-full bg-[#111] border border-[#222] rounded-2xl px-5 sm:px-6 py-4 outline-none focus:border-[#D4A574] transition text-sm sm:text-base"
//             >
//               <option>Select Genre</option>
//               <option>Pop</option>
//               <option>Rock</option>
//               <option>Hip Hop</option>
//               <option>Lo-fi</option>
//               <option>Jazz</option>
//             </select>


//             {/* Description */}

//             <textarea
//               rows="6"
//               placeholder="Song Description..."
//               className="w-full bg-[#111] border border-[#222] rounded-2xl px-5 sm:px-6 py-4 outline-none resize-none focus:border-[#D4A574] transition text-sm sm:text-base"
//             ></textarea>

//           </div>


//           {/* ================= RIGHT ================= */}

//           <div className="space-y-6 sm:space-y-8">

//             {/* ================= COVER ================= */}

//             <label className="cursor-pointer block">

//               <input
//                 type="file"
//                 name="cover"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="hidden"
//               />

//               <div className="h-64 sm:h-72 lg:h-80 border-2 border-dashed border-[#333] rounded-3xl flex flex-col justify-center items-center hover:border-[#D4A574] duration-300 overflow-hidden bg-[#090909]">

//                 {coverPreview ? (

//                   <img
//                     src={coverPreview}
//                     alt="Cover Preview"
//                     className="h-full w-full object-cover rounded-3xl"
//                   />

//                 ) : (

//                   <>
//                     <ImagePlus
//                       size={50}
//                       className="text-[#D4A574] sm:w-[60px] sm:h-[60px]"
//                     />

//                     <h3 className="mt-5 sm:mt-6 text-xl sm:text-2xl font-semibold text-center px-4">
//                       Upload Cover Image
//                     </h3>

//                     <p className="text-gray-400 mt-2 text-sm sm:text-base">
//                       JPG • PNG
//                     </p>
//                   </>

//                 )}

//               </div>

//             </label>


//             {/* ================= AUDIO ================= */}

//             <label className="cursor-pointer block">

//               <input
//                 type="file"
//                 name="music"
//                 accept="audio/*"
//                 onChange={handleChange}
//                 className="hidden"
//               />

//               <div className="min-h-48 sm:h-52 border-2 border-dashed border-[#333] rounded-3xl flex flex-col justify-center items-center hover:border-[#D4A574] duration-300 px-5 text-center bg-[#090909]">

//                 <Music2
//                   size={48}
//                   className="text-[#D4A574] sm:w-[55px] sm:h-[55px]"
//                 />

//                 <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-semibold max-w-full break-words">

//                   {musicName || "Upload Audio File"}

//                 </h3>

//                 <p className="text-gray-400 mt-2 text-sm sm:text-base">

//                   {musicName
//                     ? "Selected Successfully ✅"
//                     : "MP3 • WAV"}

//                 </p>

//               </div>

//             </label>

//           </div>

//         </div>


//         {/* ================= BUTTON ================= */}

//         <div className="flex justify-center mt-10 sm:mt-14">

//           <button
//             onClick={handleSubmit}
//             className="w-full sm:w-auto justify-center bg-[#D4A574] text-black px-8 sm:px-10 py-4 rounded-full font-semibold hover:bg-[#e6b985] hover:scale-105 duration-300 flex items-center gap-3"
//           >

//             <Upload size={20} />

//             Publish Song

//           </button>

//         </div>

//       </section>

//     </div>
//   );
// }

// export default UploadMusic;


import { ArrowLeft, ImagePlus, Music2, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UploadMusic() {
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    cover: null,
    music: null,
  });

  const [coverPreview, setCoverPreview] = useState("");
  const [musicName, setMusicName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      if (name === "cover") {
        setCoverPreview(URL.createObjectURL(file));
      }

      if (name === "music") {
        setMusicName(file.name);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert("Please enter song title");
      return;
    }

    if (!formData.cover) {
      alert("Please select a cover image");
      return;
    }

    if (!formData.music) {
      alert("Please select a music file");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("title", formData.title);
      data.append("cover", formData.cover);
      data.append("music", formData.music);

      const response = await fetch(`${API}/api/music/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      console.log("Upload response:", result);

      if (!response.ok) {
        alert(result.message || "Upload failed");
        return;
      }

      alert("Music uploaded successfully 🎉");

      navigate("/dashboard");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong while uploading");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      {/* ================= NAVBAR ================= */}

      <nav className="flex items-center justify-between px-5 sm:px-8 lg:px-12 py-5 sm:py-6 border-b border-[#181818]">

        <h1 className="text-2xl sm:text-3xl font-bold text-[#D4A574]">
          Beatly
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-[#D4A574] hover:text-white duration-300 text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

      </nav>


      {/* ================= PAGE TITLE ================= */}

      <section className="text-center mt-12 sm:mt-16 px-5">

        <p className="tracking-[3px] sm:tracking-[6px] text-[#D4A574] uppercase text-xs sm:text-sm">
          Create • Upload • Inspire
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif mt-5 sm:mt-6 leading-tight">
          Upload Your{" "}
          <span className="text-[#D4A574] italic">
            Music
          </span>
        </h1>

        <p className="text-gray-400 mt-5 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-7 sm:leading-8">
          Share your songs with listeners around the world.
        </p>

      </section>


      {/* ================= FORM ================= */}

      <section className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16">

        {/* ================= SONG TITLE ================= */}

        <div className="mb-8">

          <label className="block text-gray-300 mb-3">
            Song Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter song title"
            className="w-full bg-[#111] border border-[#222] rounded-2xl px-5 sm:px-6 py-4 outline-none focus:border-[#D4A574] transition text-sm sm:text-base"
          />

        </div>


        {/* ================= FILES ================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

          {/* ================= COVER ================= */}

          <label className="cursor-pointer block">

            <input
              type="file"
              name="cover"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />

            <div className="h-64 sm:h-72 border-2 border-dashed border-[#333] rounded-3xl flex flex-col justify-center items-center hover:border-[#D4A574] duration-300 overflow-hidden bg-[#090909]">

              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Cover Preview"
                  className="h-full w-full object-cover rounded-3xl"
                />
              ) : (
                <>
                  <ImagePlus
                    size={55}
                    className="text-[#D4A574]"
                  />

                  <h3 className="mt-5 text-xl font-semibold text-center px-4">
                    Upload Cover Image
                  </h3>

                  <p className="text-gray-400 mt-2 text-sm">
                    JPG • PNG
                  </p>
                </>
              )}

            </div>

          </label>


          {/* ================= MUSIC ================= */}

          <label className="cursor-pointer block">

            <input
              type="file"
              name="music"
              accept="audio/*"
              onChange={handleChange}
              className="hidden"
            />

            <div className="h-64 sm:h-72 border-2 border-dashed border-[#333] rounded-3xl flex flex-col justify-center items-center hover:border-[#D4A574] duration-300 px-5 text-center bg-[#090909]">

              <Music2
                size={55}
                className="text-[#D4A574]"
              />

              <h3 className="mt-5 text-xl font-semibold max-w-full break-words">
                {musicName || "Upload Audio File"}
              </h3>

              <p className="text-gray-400 mt-2 text-sm">
                {musicName
                  ? "Selected Successfully ✅"
                  : "MP3 • WAV"}
              </p>

            </div>

          </label>

        </div>


        {/* ================= BUTTON ================= */}

        <div className="flex justify-center mt-10 sm:mt-14">

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto justify-center bg-[#D4A574] text-black px-8 sm:px-10 py-4 rounded-full font-semibold hover:bg-[#e6b985] hover:scale-105 duration-300 flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >

            <Upload size={20} />

            {loading ? "Uploading..." : "Publish Song"}

          </button>

        </div>

      </section>

    </div>
  );
}

export default UploadMusic;