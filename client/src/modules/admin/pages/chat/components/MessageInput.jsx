import { Smile, Paperclip, Mic } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { useSocket } from "@/modules/admin/context/SocketContext";
import { useSelectedUser } from "@/modules/admin/context/SelectedUserContext";
import { AuthContext } from "@/modules/landing/context/AuthContext";
import { useSendMessageMutation,useMarkAsReadMutation } from "@/redux/api/MessageApi";
import ChatAttachmentUploader from "./helper/ChatAttachmentUploader";

export default function MessageInput() {
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);
  const socket = useSocket();
  const { selectedUser } = useSelectedUser(); // ✅ Assuming correct key name now
  const [sendMessageToDB] = useSendMessageMutation();
   const [markAsRead, { isLoading: isMarkingRead }] = useMarkAsReadMutation();
 
  // ✅ Emit joinChatRoom when user and selectedUser are set
  useEffect(() => {
    if (user?.user?._id && selectedUser?._id) {
      socket.emit("joinChatRoom", {
        userId: user?.user?._id,
        selectedUserId: selectedUser._id,
      });
  
      // ✅ Async wrapper for markAsRead
      const markMessagesAsRead = async () => {
        try {
          const payload = {
            userId: user?.user?._id,
            selectedUserId: selectedUser._id,
          };
          const res = await markAsRead(payload).unwrap();
          console.log("✅ Messages marked as read", res);
        } catch (err) {
          console.error("❌ Failed to mark messages as read", err);
        }
      };
  
      markMessagesAsRead();
    }
  }, [user?.user?._id, selectedUser?._id, socket]);
  

  const handleSend = async () => {
    if (!content.trim() || !selectedUser || !user?.user?._id) return;

    const messageData = {
      sender: user.user._id,
      receiver: selectedUser._id,
      content,
    };

    // 1. Emit via socket
    socket.emit("sendMessage", {
      ...messageData,
      fromMe: true,
    });

    // 2. Save to DB via RTK
    try {
      await sendMessageToDB(messageData).unwrap();
        
    } catch (error) {
      console.error("Failed to save message:", error);
    }

    setContent(""); // Clear input
  };

  return (
    <div className="p-4 border-t bg-white flex items-center gap-2">
      <button><Smile size={20} /></button>
      {/* <button><Paperclip size={20} /></button>
       */}
  <ChatAttachmentUploader />

      <Input
        placeholder="Type a message..."
        className="flex-1"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}><Mic size={20} /></button>
    </div>
  );
}
