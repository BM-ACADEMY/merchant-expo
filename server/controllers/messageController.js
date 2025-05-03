const Message = require("../models/messageModel");
const User = require("../models/userModel");


// Send a new message
exports.sendMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;

  try {
    if (!sender || !receiver || !content) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const io = req.app.get("io");
    const activeChats = req.app.get("activeChats") || new Map(); // userId => chatWithId

    // Check if receiver is actively chatting with sender
    const isReceiverInChatWithSender = activeChats.get(receiver?.toString()) === sender?.toString();

    const newMessage = new Message({
      sender,
      receiver,
      content,
      read: isReceiverInChatWithSender // ✅ auto-mark as read if chatting
    });
    await newMessage.save();

    // Emit to receiver
    io.to(receiver).emit("receiveMessage", {
      ...newMessage.toObject(),
      fromMe: false,
    });

    // Emit to sender
    io.to(sender).emit("receiveMessage", {
      ...newMessage.toObject(),
      fromMe: true,
    });

    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};


// Get all messages between two users
exports.getMessages = async (req, res) => {
  const { userId, chatPartnerId } = req.params;

  try {
    // Fetch messages between the two users from the database
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: chatPartnerId },
        { sender: chatPartnerId, receiver: userId },
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

exports.markAsRead = async (req, res) => {
  const { userId, selectedUserId } = req.body;  // Receive both userId and selectedUserId
  console.log(req.body,"mark");
  
  // Access io and onlineUsers from app
  const io = req.app.get('io');
  const onlineUsers = req.app.get('onlineUsers');

  try {
    // Find and update all messages between the two users where read is false
    const messages = await Message.updateMany(
      {
        sender: { $in: [userId, selectedUserId] },
        receiver: { $in: [userId, selectedUserId] },
        read: false,
      },
      { read: true },
      { new: true }
    );

    if (messages.nModified === 0) {
      return res.status(404).json({ error: "No unread messages found" });
    }

    // Notify the sender in real-time (you may want to notify the other user as well if needed)
    const senderSocketId = onlineUsers.get(userId);  // Using userId as the sender
    if (senderSocketId) {
      io.to(senderSocketId).emit("messagesRead", { userId, selectedUserId });
    }

    res.status(200).json({ message: "Messages marked as read", data: messages });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ error: "Failed to mark messages as read" });
  }
};



// Update a message
exports.updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const { content } = req.body;

  try {
    // Update the message content in the database
    const message = await Message.findByIdAndUpdate(
      messageId,
      { content },
      { new: true }
    );
    res.status(200).json({ message: 'Message updated successfully', data: message });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Failed to update message' });
  }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  try {
    // Delete the message from the database
    await Message.findByIdAndDelete(messageId);
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};
