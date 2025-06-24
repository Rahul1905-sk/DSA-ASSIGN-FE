import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Topics from "./pages/Topics";
import Progress from "./pages/Progress";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { isAuthenticated } from "./utils/auth";

export default function App() {
  const auth = isAuthenticated();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={auth ? "/profile" : "/login"} replace />} />

        <Route
          path="/login"
          element={auth ? <Navigate to="/profile" replace /> : <LoginPage />}
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/topics"
          element={
            <ProtectedRoute>
              <Topics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to={auth ? "/profile" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
