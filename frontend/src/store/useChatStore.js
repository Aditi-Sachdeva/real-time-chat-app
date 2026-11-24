
import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

const getErrorMessage = (error, fallback) => {
  return error?.response?.data?.message || error?.message || fallback;
};

const mergeMessages = (existingMessages, incomingMessages) => {
  const messageMap = new Map();

  [...existingMessages, ...incomingMessages].forEach((message) => {
    messageMap.set(message._id, message);
  });

  return Array.from(messageMap.values()).sort(
    (a, b) =>
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime()
  );
};

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,

  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get("/messages/users");

      set({ users: res.data });
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Failed to load users")
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(
        `/messages/${userId}`
      );

      // Ignore an old request if the selected conversation changed.
      if (get().selectedUser?._id !== userId) {
        return;
      }

      // Merge with messages that may have arrived through Socket.IO
      // while the history request was in progress.
      set((state) => ({
        messages: mergeMessages(state.messages, res.data),
      }));
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Failed to load messages")
      );
    } finally {
      if (get().selectedUser?._id === userId) {
        set({ isMessagesLoading: false });
      }
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();

    if (!selectedUser) return null;

    const receiverId = selectedUser._id;

    try {
      const res = await axiosInstance.post(
        `/messages/send/${receiverId}`,
        messageData
      );

      // Do not append this message to a different conversation
      // if the user switched chats while the request was running.
      if (get().selectedUser?._id === receiverId) {
        set((state) => ({
          messages: mergeMessages(state.messages, [res.data]),
        }));
      }

      return res.data;
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Failed to send message")
      );

      return null;
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;

    if (!socket) return undefined;

    const handleNewMessage = (newMessage) => {
      const { selectedUser } = get();
      const { authUser } = useAuthStore.getState();

      if (!selectedUser || !authUser) return;

      const isCurrentConversation =
        newMessage.senderId === selectedUser._id &&
        newMessage.receiverId === authUser._id;

      if (!isCurrentConversation) return;

      set((state) => ({
        messages: mergeMessages(state.messages, [newMessage]),
      }));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  },

  setSelectedUser: (selectedUser) => {
    set({
      selectedUser,
      messages: [],
      isMessagesLoading: false,
    });
  },
}));
