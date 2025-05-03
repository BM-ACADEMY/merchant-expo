import { useContext, useEffect, useState,useRef } from "react";
import { useSocket } from "../../../context/SocketContext";
import { useSelectedUser } from "../../../context/SelectedUserContext";
import MessageInput from "./MessageInput";
// import { MessageSquare } from "lucide-react";
import { useGetMessagesQuery,useDeleteMessageMutation,useUpdateMessageMutation } from "@/redux/api/MessageApi";
import { AuthContext } from "@/modules/landing/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash2,MessageSquare } from 'lucide-react';

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
dayjs.extend(isToday);
dayjs.extend(isYesterday);

function groupMessagesByDate(messages) {
  const grouped = {};

  messages.forEach((msg) => {
    const date = dayjs(msg.createdAt);
    const key = date.isToday()
      ? "Today"
      : date.isYesterday()
        ? "Yesterday"
        : date.format("DD MMM YYYY");

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(msg);
  });

  return grouped;
}



export default function ChatWindow() {
  const socket = useSocket();
  const { selectedUser } = useSelectedUser();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [editMessage, setEditMessage] = useState(null);
  const [atBottom, setAtBottom] = useState(true); // Track if the user is at the bottom
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [editMessageId,setEditMessageId]=useState(null);
  const messageContainerRef = useRef(null);
  const bottomRef = useRef(null);

  // Fetch messages from DB when selectedUser changes
  const { data, isSuccess } = useGetMessagesQuery(
    {
      userId: user?.user?._id,
      chatPartnerId: selectedUser?._id,
    },
    { skip: !selectedUser }
  );

const [updateMessage]=useUpdateMessageMutation();
const [deleteMessage]=useDeleteMessageMutation();

  useEffect(() => {
    if (messageContainerRef.current) {
      setMessages([]); // Optionally clear messages before loading new ones
      scrollToBottom(); // Scroll to the bottom after selecting a user
    }
  }, [selectedUser]); // Trigger on selectedUser change
  
  // When DB data comes, set as initial messages
  useEffect(() => {
    if (isSuccess && data) {
      const formatted = data.map((msg) => ({
        ...msg,
        fromMe: msg.sender === user?.user?._id,
      }));
      setMessages(formatted);
      // Scroll after setting messages
      setTimeout(scrollToBottom, 0);
    }
  }, [isSuccess, data, user?.user?._id]);
  const groupedMessages = groupMessagesByDate(messages);

  // Real-time message handler
  useEffect(() => {
    if (!socket || !selectedUser) return;

    const handleReceiveMessage = (msg) => {
      // Only add if the message is from/to current selected user
      const isRelated =
        (msg.sender === user?.user?._id && msg.receiver === selectedUser._id) ||
        (msg.sender === selectedUser._id && msg.receiver === user?.user?._id);

      if (isRelated) {
        setMessages((prev) => [
          ...prev,
          { ...msg, fromMe: msg.sender === user?.user?._id },
        ]);
        // Scroll to bottom when a new message arrives
        if (messageContainerRef.current && atBottom) {
          messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, selectedUser, user?.user?._id, atBottom]);

  // Handle marking messages as read
  useEffect(() => {
    if (!socket || !selectedUser) return;

    const handleMarkMessageAsRead = (messageId) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, read: true } : msg
        )
      );
    };

    socket.on("messageRead", handleMarkMessageAsRead);

    return () => {
      socket.off("messageRead", handleMarkMessageAsRead);
    };
  }, [socket, selectedUser]);

  // Scroll to bottom handler
  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check if the user is at the bottom of the chat
  const handleScroll = () => {
    const container = messageContainerRef.current;
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;
      setAtBottom(isAtBottom);
    }
  };
  const handleEdit = (msg) => {
    console.log(msg,"edit");
    setEditMessageId(msg?._id);
    setIsEditing(true);
    setEditMessage(msg); 
  };

  const handleEditSubmit = async () => {
    if (editMessage) {
      const payload={
        messageId:editMessageId,
        updatedData:editMessage
      }
    const res=await updateMessage(payload).unwrap();
      setIsEditing(false); // Exit editing mode
      setEditMessage(null);
    }
  };

  // Handle Delete
  const handleDeleteConfirm = (msgId) => {
    setMessageToDelete(msgId);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (messageToDelete) {
      const res= await deleteMessage({messageId:messageToDelete}).unwrap();
      setShowDeleteConfirm(false); 
      setMessageToDelete(null);
    }
  };
  // Automatically scroll to bottom when selectedUser changes
  useEffect(() => {
    if (messageContainerRef.current && atBottom) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [selectedUser, atBottom]); // Trigger when selectedUser changes

  // UI fallback
  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
        <MessageSquare className="w-48 h-48 text-gray-500 mb-4" />
        <p className="text-gray-500 text-sm">
          Select a user to start the conversation
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Scrollable message container */}
      <div
        className="flex-1 overflow-y-scroll p-4 space-y-4 bg-gray-50"
        ref={messageContainerRef}
        onScroll={handleScroll}
      >
        {/* Grouped messages */}
        {Object.entries(groupMessagesByDate(messages)).map(([date, msgs]) => (
          <div key={date}>
            <div className="text-center text-xs text-gray-500 my-2">{date}</div>
            {msgs.map((msg, i) => (
              <div key={msg._id || i} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-4 py-2 rounded-xl max-w-xs shadow relative mb-2 ${msg.fromMe ? "bg-[#d8fdd1] text-black" : "bg-white"}`}
                >
                  <div>{msg.content}</div>
                  <div className="text-xs mt-1 flex justify-end gap-1 items-center">
                    <span>{dayjs(msg.createdAt).format("hh:mm A")}</span>
                    {msg.fromMe && (
                      <span className={`${msg.read ? "text-blue-400" : "text-gray-400"}`}>
                        {msg.read ? "✓✓" : "✓"}
                      </span>
                    )}

                    {/* Hoverable dropdown */}
                    {msg.fromMe && (
                      <div className="relative group">
                        <button className="text-gray-400 hover:text-blue-400">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>

                        {/* Dropdown menu */}
                        <div className="absolute right-0 z-50  hidden group-hover:block bg-white shadow-md p-2 rounded-lg w-32">
                          <div onClick={() => handleEdit(msg)} className="flex items-center px-3 py-2 cursor-pointer text-gray-700 hover:bg-gray-100">
                            <Edit className="mr-2" /> Edit
                          </div>
                          <div onClick={() => handleDeleteConfirm(msg._id)} className="flex items-center px-3 py-2 cursor-pointer text-gray-700 hover:bg-gray-100">
                            <Trash2 className="mr-2" /> Delete
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Scroll target for auto-scrolling */}
        <div ref={bottomRef} />
      </div>

      {/* Floating button to scroll to the bottom */}
      {!atBottom && (
        <Button
          className="fixed bottom-20 right-4 bg-white text-black p-3 rounded-full shadow-lg"
          onClick={scrollToBottom}
        >
          ⬇
        </Button>
      )}

      {/* Message Input */}
      <MessageInput  />

      {/* Edit Message Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">Edit Message</h3>
            <textarea
              className="w-full p-2 border rounded-lg mb-4"
              value={editMessage.content}
              onChange={(e) => setEditMessage({ ...editMessage, content: e.target.value })}
            />
            <div className="flex justify-between">
              <Button className="bg-gray-300" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button className="bg-blue-500 text-white" onClick={handleEditSubmit}>Save</Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this message?</p>
            <div className="flex justify-between mt-4">
              <Button className="bg-gray-300" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
              <Button className="bg-red-500 text-white" onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
