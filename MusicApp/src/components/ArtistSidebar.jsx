import {
  LayoutDashboard,
  Music,
  Upload,
  Disc3,
  BarChart3,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function ArtistSidebar() {
  const location = useLocation();

  const menu = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/artist-dashboard",
    },
    {
      title: "Upload Music",
      icon: <Upload size={20} />,
      path: "/upload",
    },
    {
      title: "My Songs",
      icon: <Music size={20} />,
      path: "/songs",
    },
    {
      title: "Albums",
      icon: <Disc3 size={20} />,
      path: "/albums",
    },
    {
      title: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/analytics",
    },
    {
      title: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-[#0B0B0B] border-r border-[#222] p-8">

      <h1 className="text-3xl font-bold text-[#D4A574] mb-12">
        Beatly
      </h1>

      <div className="space-y-2">

        {menu.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition

            ${
              location.pathname === item.path
                ? "bg-[#D4A574] text-black"
                : "text-gray-300 hover:bg-[#1a1a1a]"
            }`}
          >
            {item.icon}

            <span>{item.title}</span>

          </Link>
        ))}

      </div>

      <button className="flex items-center gap-3 mt-20 text-red-400 hover:text-red-300">

        <LogOut />

        Logout

      </button>

    </aside>
  );
}

export default ArtistSidebar;