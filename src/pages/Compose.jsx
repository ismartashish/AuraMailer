import { useState } from "react";
import api from "../api/axios";
import { useData } from "../context/DataContext";

export default function Compose() {
  const { recipients } = useData();

  const [mode, setMode] = useState("certificate");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [template, setTemplate] = useState(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);

  const [attachments, setAttachments] = useState([]);
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [result, setResult] = useState(null);

  /* ================= GUARD ================= */
  if (!recipients || recipients.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
        <p className="text-white/80">Upload recipients first</p>
      </div>
    );
  }

  /* ================= PREVIEW ================= */
  const handlePreview = async () => {
    if (!template) return alert("Upload template first");

    const fd = new FormData();
    fd.append("template", template);

    const res = await api.post("/api/mailer/preview", fd, {
      responseType: "blob",
    });

    setPdfPreviewUrl(URL.createObjectURL(res.data));
  };

  /* ================= SEND ================= */
  const handleSend = async () => {
    if (!subject || !body) return alert("Subject & body required");
    if (mode === "certificate" && !template)
      return alert("Template required");

    try {
      setSending(true);
      setProgress(10);
      setStatusText("Preparing campaign…");

      const fd = new FormData();
      fd.append("subject", subject);
      fd.append("html", body);
      fd.append("recipients", JSON.stringify(recipients));
      fd.append("mode", mode);

      if (template) fd.append("template", template);
      attachments.forEach((f) => fd.append("attachments", f));

      setProgress(40);
      setStatusText("Uploading files…");

      const res = await api.post("/api/mailer/send", fd);

      setProgress(90);
      setStatusText("Finalizing…");

      setTimeout(() => {
        setProgress(100);
        setStatusText("Completed ✅");
        setResult(res.data.report);
      }, 600);
    } catch {
      alert("Sending failed");
      setProgress(0);
      setStatusText("");
    } finally {
      setSending(false);
    }
  };

  /* ================= RESULT ================= */
  if (result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 p-6">
        <div className="backdrop-blur-xl bg-white/15 border border-white/20 rounded-2xl shadow-2xl p-8 text-center text-white w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-4">
            Campaign Sent 🎉
          </h2>
          <p>Total: {result.total}</p>
          <p className="text-green-300">Sent: {result.sent.length}</p>
          <p className="text-red-300">Failed: {result.failed.length}</p>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-teal-500 animate-gradient" />
      <div className="absolute top-24 left-10 w-72 h-72 bg-indigo-400/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-24 right-10 w-72 h-72 bg-teal-400/30 rounded-full blur-3xl animate-float-delay" />

      {/* CONTENT */}
      <div className="relative z-10 p-10">
        <div className="max-w-3xl mx-auto backdrop-blur-xl bg-white/15 border border-white/20 rounded-2xl shadow-2xl p-8">

          {/* HEADER */}
          <h1 className="text-2xl font-semibold text-white mb-6">
            Compose Campaign
          </h1>

          {/* MODE TOGGLE */}
          <div className="flex mb-6 bg-white/20 rounded-xl p-1">
            {["certificate", "mail"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                  mode === m
                    ? "bg-white text-gray-900"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {m === "certificate" ? "Certificate" : "Mass Mail"}
              </button>
            ))}
          </div>

          {/* SUBJECT */}
          <input
            className="w-full mb-4 rounded-xl bg-white/20 border border-white/20 px-4 py-3 text-white placeholder-white/50 outline-none"
            placeholder="Email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          {/* BODY */}
          <textarea
            className="w-full rounded-xl bg-white/20 border border-white/20 px-4 py-3 text-white placeholder-white/50 outline-none h-32"
            placeholder="Write message… (HTML supported)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          {/* CERTIFICATE */}
          {mode === "certificate" && (
            <div className="mt-6 bg-white/20 rounded-xl p-4 border border-white/20">
              <p className="text-sm text-white mb-2">
                Certificate Template
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setTemplate(e.target.files[0])}
              />

              {template && (
                <button
                  onClick={handlePreview}
                  className="mt-3 text-sm text-teal-300 font-medium"
                >
                  Preview PDF
                </button>
              )}

              {pdfPreviewUrl && (
                <iframe
                  src={pdfPreviewUrl}
                  className="w-full h-64 mt-3 rounded-xl"
                  title="Preview"
                />
              )}
            </div>
          )}

          {/* ATTACHMENTS */}
          <div className="mt-6 bg-white/20 rounded-xl p-4 border border-white/20">
            <p className="text-sm text-white mb-2">
              Attachments (optional)
            </p>
            <input
              type="file"
              multiple
              onChange={(e) => setAttachments([...e.target.files])}
            />
          </div>

          {/* VARIABLES */}
          <div className="mt-6 bg-white/10 rounded-xl p-4 text-sm text-white">
            <b>Variables:</b>{" "}
            <code>{"{{name}}"}</code>{" "}
            <code>{"{{event}}"}</code>{" "}
            <code>{"{{verify_link}}"}</code>
          </div>

          {/* PROGRESS */}
          {sending && (
            <div className="mt-6">
              <p className="text-sm text-white/70 mb-1">{statusText}</p>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* SEND */}
          <button
            onClick={handleSend}
            disabled={sending}
            className="mt-8 w-full bg-white text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-100 transition disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send Campaign"}
          </button>

        </div>
      </div>
    </div>
  );
}
