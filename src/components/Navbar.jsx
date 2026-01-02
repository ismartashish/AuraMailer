import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-white/10 border-b border-white/20">
      
      {/* LOGO */}
      <Link to="/dashboard" className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="AuraMail"
          className="h-9 w-9 rounded-lg"
        />
        <span className="text-white font-semibold text-lg">
          AuraMail
        </span>
      </Link>

      {/* OPTIONAL RIGHT SIDE */}
      <span className="text-white/70 text-sm">
        Gmail Campaigns
      </span>
    </div>
  );
}
