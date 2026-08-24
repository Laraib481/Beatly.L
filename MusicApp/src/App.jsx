import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ArtistDashboard from "./pages/ArtistDashboard";
import UploadMusic from "./pages/UploadMusic";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ArtistDashboard />} />
        <Route path="/upload" element={<UploadMusic />} />
        <Route path="user-Dashboard" element={<UserDashboard/>}/>
        <Route path="/explore" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;