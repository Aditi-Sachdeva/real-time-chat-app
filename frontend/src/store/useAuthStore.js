
import { create } from "zustand";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios.js";

const SOCKET_URL = import.meta.env.DEV
  ? "http://localhost:5001"
  : window.location.origin;

const getErrorMessage = (error, fallback) => {
  return error?.response?.data?.message || error?.message || fallback;
};

export const useAuthStore = create((set, get) => ({
  authUser: null,

  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });

      get().connectSocket();
    } catch {
      set({ authUser: null });
      get().disconnectSocket();
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);

      set({ authUser: res.data });

      get().connectSocket();

      toast.success("Account created successfully");

      return true;
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Failed to create account")
      );

      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data });

      get().connectSocket();

      toast.success("Logged in successfully");

      return true;
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Failed to login")
      );

      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");

      get().disconnectSocket();

      set({
        authUser: null,
        onlineUsers: [],
      });

      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Failed to logout")
      );
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put(
        "/auth/update-profile",
        data
      );

      set({ authUser: res.data });

      toast.success("Profile updated successfully");

      return true;
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Failed to update profile")
      );

      return false;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser) return;

    // Reuse an existing socket connection.
    if (socket) {
      if (!socket.connected) {
        socket.connect();
      }

      return;
    }

    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: false,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket: newSocket });

    newSocket.connect();
  },

  disconnectSocket: () => {
    const { socket } = get();

    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
    }

    set({
      socket: null,
      onlineUsers: [],
    });
  },
}));
