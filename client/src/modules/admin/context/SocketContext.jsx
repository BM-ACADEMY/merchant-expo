import { AuthContext } from "@/modules/landing/context/AuthContext";
import { createContext, useContext, useEffect, useRef,useState } from "react";
import { io } from "socket.io-client";
import { useSelectedUser } from "@/modules/admin/context/SelectedUserContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const { user } = useContext(AuthContext);
  const { selectedUser } = useSelectedUser(); // 💡 Add this
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [lastSeenMap, setLastSeenMap] = useState({});


  useEffect(() => {
    if (!user?.user?._id) return;

    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000", {
        transports: ["websocket"],
      });
     
      socketRef.current.emit("join", user.user._id);
      socketRef.current.on("online-users", (users) => {
        setOnlineUsers(users);
      });
      socketRef.current.on("user-disconnected", ({ userId, lastSeen }) => {
        setLastSeenMap((prev) => ({
          ...prev,
          [userId]: lastSeen,
        }));
      });
      
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user?.user?._id]);

  // 🔁 Emit when user selects a different chat
  useEffect(() => {
    if (socketRef.current && user?.user?._id && selectedUser?._id) {
      socketRef.current.emit("joinChatRoom", {
        userId: user?.user?._id,
        selectedUserId: selectedUser._id,
      });
    }
  }, [selectedUser?._id, user?.user?._id]);

  return (
    <SocketContext.Provider value={{socketRef,onlineUsers,lastSeenMap } }>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext)
