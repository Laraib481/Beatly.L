import { Music } from "lucide-react";
import vinyl from "../assets/vinyl.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: "",
      email: "",
      password: formData.password,
    };

    // Detect if user entered email or username
    if (formData.username.includes("@")) {
      payload.email = formData.username;
    } else {
      payload.username = formData.username;
    }

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.messege || data.message);
        return;
      }

      // Save Token & User
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful!");

      // Redirect according to role
      if (data.user.role === "artist") {
        navigate("/dashboard");
      } else {
        navigate("/user-dashboard");
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 bg-[#0b0b0b] border border-[#1d1d1d] rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="hidden lg:flex relative items-center justify-center p-12 bg-gradient-to-br from-black via-[#111] to-black overflow-hidden">

          <img
            src={vinyl}
            alt="Vinyl Record"
            className="absolute right-[-150px] w-[700px] opacity-90 animate-spin"
            style={{ animationDuration: "20s" }}
          />

          <div className="z-10 max-w-md">
            <p className="tracking-[8px] text-[#d4a574] text-sm mb-8">
              BEATLY EXPERIENCE
            </p>

            <h1 className="text-7xl font-serif leading-none">
              Feel the
              <br />
              <span className="text-[#d4a574] italic">
                Rhythm
              </span>
              <br />
              of Music
            </h1>

            <p className="mt-8 text-gray-400 text-lg">
              Discover a premium listening experience crafted for music lovers.
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
              Welcome Back
            </h2>

            <p className="text-gray-400 mb-10">
              Sign in to continue your musical journey.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Username / Email */}
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username or Email"
                className="w-full bg-[#111] border border-[#262626] rounded-xl px-5 py-4 outline-none focus:border-[#d4a574] transition"
              />

              {/* Password */}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-[#111] border border-[#262626] rounded-xl px-5 py-4 outline-none focus:border-[#d4a574] transition"
              />

              <button
                type="submit"
                className="w-full bg-[#d4a574] text-black font-semibold py-4 rounded-xl hover:bg-[#e6b985] transition-all duration-300"
              >
                Log In
              </button>

            </form>

            <p className="text-center text-gray-500 mt-8">
              Don't have an account?
              <Link
                to="/signup"
                className="text-[#d4a574] ml-2"
              >
                Sign Up
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;