import { Link } from "react-router-dom";
import { Menu, X, Headphones } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-5">

        <div className="flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-2 group"
          >

            <div className="w-9 h-9 rounded-xl bg-[#D4A574]/10 flex items-center justify-center group-hover:bg-[#D4A574]/20 transition">
              <Headphones
                size={19}
                className="text-[#D4A574]"
              />
            </div>

            <span className="text-2xl font-bold text-[#D4A574]">
              Beatly
            </span>

          </Link>


          {/* Desktop Navigation */}

          <div className="hidden md:flex items-center gap-2">

            <Link
              to="/"
              className="px-5 py-2.5 rounded-full text-gray-300 hover:text-[#D4A574] hover:bg-white/5 transition"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="px-5 py-2.5 rounded-full text-gray-300 hover:text-[#D4A574] hover:bg-white/5 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="ml-2 px-6 py-2.5 rounded-full bg-[#D4A574] text-black font-semibold hover:bg-[#e6b985] hover:scale-105 transition duration-300"
            >
              Sign Up
            </Link>

          </div>


          {/* Mobile Button */}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-300"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>

        </div>


        {/* Mobile Menu */}

        {open && (
          <div className="md:hidden mt-5 pb-2 flex flex-col gap-2">

            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-[#D4A574]"
            >
              Home
            </Link>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-[#D4A574]"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl bg-[#D4A574] text-black font-semibold"
            >
              Sign Up
            </Link>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;