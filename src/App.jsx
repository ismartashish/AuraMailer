import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Compose from "./pages/Compose";
import Verify from "./pages/Verify";
import Loading from "./pages/Loading";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/verify/:id" element={<Verify />} />

            <Route path="/dashboard" element={
              <Protected><Dashboard /></Protected>
            } />
            <Route path="/upload" element={
              <Protected><Upload /></Protected>
            } />
            <Route path="/compose" element={
              <Protected><Compose /></Protected>
            } />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}
