import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="ph-spinner-large">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Support for both wrapped children (<ProtectedRoute><Dashboard/></ProtectedRoute>)
  // AND nested routing (<Route element={<ProtectedRoute/>}>)
  return children ? children : <Outlet />;
}
