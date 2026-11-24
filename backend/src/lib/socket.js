
import "dotenv/config";

import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";

export const app = express();
export const server = http.createServer(app);

const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5173";

export const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    credentials: true,
  },
});

// userId -> Set of socket IDs
const userSocketMap = new Map();

const getCookie = (cookieHeader, cookieName) => {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";");

  const cookie = cookies.find((item) =>
    item.trim().startsWith(`${cookieName}=`)
  );

  if (!cookie) return null;

  return decodeURIComponent(
    cookie.trim().substring(cookieName.length + 1)
  );
};

// Authenticate every Socket.IO connection using JWT cookie.
io.use((socket, next) => {
  try {
    const token = getCookie(
      socket.handshake.headers.cookie,
      "jwt"
    );

    if (!token) {
      return next(new Error("Unauthorized: Missing token"));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    socket.data.userId = decoded.userId;

    next();
  } catch (error) {
    next(new Error("Unauthorized: Invalid or expired token"));
  }
});

export const getReceiverSocketId = (userId) => {
  const socketIds = userSocketMap.get(userId.toString());

  if (!socketIds || socketIds.size === 0) {
    return null;
  }

  return [...socketIds];
};

io.on("connection", (socket) => {
  const userId = socket.data.userId.toString();

  console.log(`User connected: ${userId}`);

  socket.join(userId);

  if (!userSocketMap.has(userId)) {
    userSocketMap.set(userId, new Set());
  }

  userSocketMap.get(userId).add(socket.id);

  // Broadcast online users.
  io.emit(
    "getOnlineUsers",
    Array.from(userSocketMap.keys())
  );

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${userId}`);

    const socketIds = userSocketMap.get(userId);

    if (socketIds) {
      socketIds.delete(socket.id);

      // Mark user offline only when all sessions disconnect.
      if (socketIds.size === 0) {
        userSocketMap.delete(userId);
      }
    }

    io.emit(
      "getOnlineUsers",
      Array.from(userSocketMap.keys())
    );
  });
});
