import { Music } from "lucide-react";
import vinyl from "../assets/vinyl.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account Created Successfully!");

        console.log(data);

        navigate("/login");
      } else {
        alert(data.messege);
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 bg-[#0b0b0b] border border-[#1d1d1d] rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}

        <div className="hidden lg:flex relative items-center justify-center p-12 bg-gradient-to-br from-black via-[#111] to-black overflow-hidden">

          <div className="absolute right-10 h-96 w-96 rounded-full bg-[#d4a574]/10 blur-[120px]" />

          <img
            src={vinyl}
            alt="Vinyl Record"
            className="absolute right-[-150px] w-[700px] opacity-90 animate-spin"
            style={{ animationDuration: "20s" }}
          />

          <div className="z-10 max-w-md">

            <p className="tracking-[8px] text-[#d4a574] text-sm mb-8">
              JOIN BEATLY
            </p>

            <h1 className="text-7xl font-serif leading-none">
              Start Your
              <br />
              <span className="text-[#d4a574] italic">
                Musical
              </span>
              <br />
              Journey
            </h1>

            <p className="mt-8 text-gray-400 text-lg">
              Create your account and explore a premium world of music.
            </p>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex items-center justify-center p-8 md:p-14">

          <div className="w-full max-w-md">

            <div className="flex items-center gap-2 mb-10">
              <Music className="text-[#d4a574]" />
              <span className="text-3xl font-bold text-[#d4a574]">
                Beatly
              </span>
            </div>

            <h2 className="text-5xl font-bold mb-3">
              Create Account
            </h2>

            <p className="text-gray-400 mb-10">
              Join Beatly and begin your musical experience.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Username */}

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full bg-[#111] border border-[#262626] rounded-xl px-5 py-4 outline-none focus:border-[#d4a574] transition"
                required
              />

              {/* Email */}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-[#111] border border-[#262626] rounded-xl px-5 py-4 outline-none focus:border-[#d4a574] transition"
                required
              />

              {/* Role */}

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-[#111] border border-[#262626] rounded-xl px-5 py-4 outline-none focus:border-[#d4a574] transition text-gray-400"
                required
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="artist">Artist</option>
              </select>

              {/* Password */}

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-[#111] border border-[#262626] rounded-xl px-5 py-4 outline-none focus:border-[#d4a574] transition"
                required
              />

              <button
                type="submit"
                className="w-full bg-[#d4a574] text-black font-semibold py-4 rounded-xl hover:bg-[#e6b985] transition-all duration-300"
              >
                Create Account
              </button>

            </form>

            <p className="text-center text-gray-500 mt-8">
              Already have an account?

              <Link
                to="/login"
                className="text-[#d4a574] cursor-pointer ml-2"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Signup;