import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import api from "../api/axios";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [preview, setPreview] = useState([]);

  const { setRecipients } = useData();
  const navigate = useNavigate();

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await api.post("/api/upload/parse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setRecipients(res.data.data);
      setPreview(res.data.preview);

      setStats({
        total: res.data.total,
        valid: res.data.validCount,
        invalid: res.data.invalidCount,
      });
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [setRecipients]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [],
      "application/vnd.ms-excel": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
  });

  return (
    <>
      <Navbar />

      {/* BACKGROUND */}
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-teal-500 animate-gradient" />
        <div className="absolute top-24 left-10 w-72 h-72 bg-indigo-400/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-24 right-10 w-72 h-72 bg-teal-400/30 rounded-full blur-3xl animate-float-delay" />

        {/* CONTENT */}
        <div className="relative z-10 p-10">
          <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/15 border border-white/20 rounded-2xl shadow-2xl p-8">

            <h1 className="text-2xl font-semibold text-white mb-6">
              Upload Recipients
            </h1>

            {/* DROPZONE */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition
              ${isDragActive
                ? "border-teal-400 bg-teal-400/20 scale-[1.02]"
                : "border-white/30 hover:border-white/60"
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-white/80 text-lg">
                Drag & drop Excel / CSV here
              </p>
              <p className="text-white/50 text-sm mt-2">
                or click to select a file
              </p>
            </div>

            {/* LOADING */}
            {loading && (
              <p className="mt-4 text-sm text-white/70 animate-pulse">
                Processing file…
              </p>
            )}

            {/* STATS */}
            {stats && (
              <>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <Stat label="Total Rows" value={stats.total} />
                  <Stat label="Valid" value={stats.valid} />
                  <Stat label="Invalid" value={stats.invalid} />
                </div>

                <button
                  onClick={() => navigate("/compose")}
                  className="mt-8 bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition shadow-lg"
                >
                  Continue to Compose →
                </button>
              </>
            )}

            {/* PREVIEW */}
            {preview.length > 0 && (
              <div className="mt-10">
                <h3 className="font-semibold text-white mb-3">
                  Preview (First 5 Rows)
                </h3>

                <div className="overflow-x-auto rounded-xl border border-white/20">
                  <table className="w-full text-sm text-white">
                    <thead className="bg-white/10">
                      <tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Event</Th>
                        <Th>Date</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((row, i) => (
                        <tr key={i} className="hover:bg-white/5 transition">
                          <Td>{row.name}</Td>
                          <Td>{row.email}</Td>
                          <Td>{row.event}</Td>
                          <Td>{row.date}</Td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function Stat({ label, value }) {
  return (
    <div className="bg-white/20 backdrop-blur border border-white/20 rounded-xl p-4 text-center">
      <p className="text-sm text-white/70">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="p-3 text-left font-medium border-b border-white/20">
      {children}
    </th>
  );
}

function Td({ children }) {
  return (
    <td className="p-3 border-b border-white/10">
      {children}
    </td>
  );
}
