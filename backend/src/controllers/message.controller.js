
import mongoose from "mongoose";

import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find({
      _id: { $ne: loggedInUserId },
    })
      .select("-password")
      .sort({ fullName: 1 });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    if (!mongoose.isValidObjectId(userToChatId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: userToChatId,
        },
        {
          senderId: userToChatId,
          receiverId: myId,
        },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Get messages error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;

    const senderId = req.user._id;

    if (!mongoose.isValidObjectId(receiverId)) {
      return res.status(400).json({
        message: "Invalid receiver ID",
      });
    }

    if (senderId.toString() === receiverId) {
      return res.status(400).json({
        message: "You cannot send a message to yourself",
      });
    }

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        message: "Receiver not found",
      });
    }

    const messageText =
      typeof text === "string" ? text.trim() : "";

    if (!messageText && !image) {
      return res.status(400).json({
        message: "Message cannot be empty",
      });
    }

    let imageUrl;

    if (image) {
      if (typeof image !== "string") {
        return res.status(400).json({
          message: "Invalid image data",
        });
      }

      const uploadResponse = await cloudinary.uploader.upload(
        image,
        {
          folder: "real-time-chat/messages",
        }
      );

      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: messageText || undefined,
      image: imageUrl,
    });

    // Send the message to every active session of the receiver.
    io.to(receiverId.toString()).emit(
      "newMessage",
      newMessage
    );

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Send message error:", error.message);

    return res.status(500).json({
      message: "Failed to send message",
    });
  }
};
