
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div
        data-theme={theme}
        className="min-h-screen flex items-center justify-center bg-base-100 text-base-content"
      >
        <Loader className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-base-100 text-base-content"
    >
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              authUser ? <HomePage /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/signup"
            element={
              !authUser ? <SignUpPage /> : <Navigate to="/" replace />
            }
          />

          <Route
            path="/login"
            element={
              !authUser ? <LoginPage /> : <Navigate to="/" replace />
            }
          />

          <Route path="/settings" element={<SettingsPage />} />

          <Route
            path="/profile"
            element={
              authUser ? <ProfilePage /> : <Navigate to="/login" replace />
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
};

export default App;
