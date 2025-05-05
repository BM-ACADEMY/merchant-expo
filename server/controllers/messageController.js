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
    const activeChats = req.app.get("activeChats") || new Map();

    const isReceiverInChatWithSender = activeChats.get(receiver?.toString()) === sender?.toString();

    const newMessage = new Message({
      sender,
      receiver,
      content,
      read: isReceiverInChatWithSender
    });

    await newMessage.save();

    // Emit to both users
    io.to(receiver).emit("receiveMessage", {
      ...newMessage.toObject(),
      fromMe: false,
    });

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
// Get all messages between two users
exports.getMessages = async (req, res) => {
  const { userId, chatPartnerId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 15;

  // Validate input parameters
  if (isNaN(page) || isNaN(pageSize)) {
    return res.status(400).json({ error: 'Invalid pagination parameters' });
  }

  try {
    const query = {
      $or: [
        { sender: userId, receiver: chatPartnerId },
        { sender: chatPartnerId, receiver: userId },
      ],
    
    };

    const totalMessages = await Message.countDocuments(query);
    const skip = (page - 1) * pageSize;
    const hasMore = totalMessages > (page * pageSize);

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const orderedMessages = messages.reverse();

    res.status(200).json({
      data: orderedMessages,
      hasMore,
      totalMessages,
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
// GET /chat/last-message?userId=xxx&contactId=yyy
exports.getLastMessage = async (req, res) => {
  const { userId, contactId } = req.query;

  try {
    const lastMessage = await Message.findOne({
      $or: [
        { sender: userId, receiver: contactId },
        { sender: contactId, receiver: userId },
      ],
    })
    .sort({ createdAt: -1 }); // Get the latest one

    res.status(200).json({
      lastMessage: lastMessage?.content || "", // assuming you store text as message
      timestamp: lastMessage?.createdAt || null,
    });
  } catch (error) {
    console.error("Error fetching last message:", error);
    res.status(500).json({ error: "Failed to fetch last message" });
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

// Delete a message// Delete (Soft delete) a message
exports.deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  try {
    // Soft delete the message by setting deleted to true
    const message = await Message.findByIdAndUpdate(
      messageId,
      { deleted: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};
