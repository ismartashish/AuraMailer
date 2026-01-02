export default function Login() {
  const handleLogin = () => {
    // Backend Google OAuth endpoint (UNCHANGED)
    window.location.href = "https://auramail.onrender.com/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2b0f2f] via-[#1f2a44] to-[#0e3c3a] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.35),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.35),transparent_40%)]" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 text-center">
        
        <h1 className="text-3xl font-semibold text-teal-300 tracking-wider">
          MEMBER LOGIN
        </h1>

        <p className="text-gray-300 mt-4">
          Secure access to AuraMail
        </p>

        {/* Google Login */}
        <button
          onClick={handleLogin}
          className="mt-10 w-full bg-white text-gray-800 py-4 rounded-lg font-semibold tracking-wide hover:bg-gray-100 transition"
        >
          Continue with Google
        </button>

        <p className="text-xs text-gray-400 mt-6">
          We never read your inbox
        </p>
      </div>
    </div>
  );
}
