import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="relative min-h-screen flex justify-center items-start overflow-hidden">

      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-teal-500 animate-gradient" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl animate-float-delay" />

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-md mt-10 mb-10 backdrop-blur-xl bg-white/15 border border-white/20 rounded-2xl shadow-2xl flex flex-col">

        {/* HEADER */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/20">
          <img
            src="/logo.png"
            alt="AuraMail"
            className="h-10 w-10 rounded-lg bg-white p-1"
          />
          <div>
            <h1 className="text-lg font-semibold text-white">
              AuraMail
            </h1>
            <p className="text-xs text-white/70">
              Gmail Campaign Dashboard
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-6 space-y-5">

          {/* WELCOME */}
          <div className="bg-white/20 backdrop-blur rounded-xl p-4 border border-white/20">
            <h2 className="font-semibold text-white">
              👋 Welcome back
            </h2>
            <p className="text-sm text-white/70 mt-1">
              Send mass emails & certificates securely using Gmail.
            </p>
          </div>

          {/* UPLOAD */}
          <Link
            to="/upload"
            className="group block bg-white/20 backdrop-blur rounded-xl border border-white/20 p-5 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-teal-400/30 flex items-center justify-center text-2xl">
                📤
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">
                  Upload Recipients
                </h3>
                <p className="text-sm text-white/70">
                  CSV or Excel file
                </p>
              </div>
              <span className="text-white/50 text-xl group-hover:translate-x-1 transition">
                →
              </span>
            </div>
          </Link>

          {/* COMPOSE */}
          <Link
            to="/compose"
            className="group block bg-white/20 backdrop-blur rounded-xl border border-white/20 p-5 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-indigo-400/30 flex items-center justify-center text-2xl">
                ✉️
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">
                  Compose Campaign
                </h3>
                <p className="text-sm text-white/70">
                  Certificates or mass emails
                </p>
              </div>
              <span className="text-white/50 text-xl group-hover:translate-x-1 transition">
                →
              </span>
            </div>
          </Link>

          {/* TIP */}
          <div className="bg-teal-400/20 border border-teal-300/30 rounded-xl p-4 text-sm text-white">
            💡 <b>Tip:</b> Upload recipients first, then compose your campaign.
          </div>

        </div>

        {/* FOOTER */}
        <div className="text-center text-xs text-white/60 py-4 border-t border-white/20">
          Powered by AuraMail 🚀
        </div>
      </div>
    </div>
  );
}
