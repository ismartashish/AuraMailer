import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Verify() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/api/verify/${id}`)
      .then(res => {
        if (res.data.valid) {
          setData(res.data.certificate);
        } else {
          setError("Invalid certificate");
        }
      })
      .catch(() => setError("Certificate not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="p-10 text-center">Verifying...</p>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Certificate Verified ✅
        </h2>

        <p><b>Name:</b> {data.name}</p>
        <p><b>Event:</b> {data.event}</p>
        <p><b>Date:</b> {data.date}</p>
        <p className="text-xs text-gray-400 mt-4">
          Verified by AuraMail
        </p>
      </div>
    </div>
  );
}
