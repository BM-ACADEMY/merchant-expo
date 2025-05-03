import { useContext, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useGetAllUsersQuery } from "@/redux/api/MessageApi";
import UserListItem from "./UserListItem";
import { useSelectedUser } from "@/modules/admin/context/SelectedUserContext";
import { useMarkAsReadMutation } from "@/redux/api/MessageApi";  // Import the mutation hook
import { AuthContext } from "@/modules/landing/context/AuthContext";

export default function Sidebar() {
  const {user}=useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);
  const { selectedUser, setSelectedUser } = useSelectedUser();
  const { data, isFetching, isSuccess } = useGetAllUsersQuery({ page, limit: 10 });

  // Import the RTK Query mutation hook
  const [markAsRead, { isLoading: isMarkingRead }] = useMarkAsReadMutation();

  // Update user list when new data is fetched
  useEffect(() => {
    if (isSuccess && data?.users) {
      setAllUsers((prev) => {
        const existingIds = new Set(prev.map((user) => user._id));
        const newUsers = data.users.filter((user) => !existingIds.has(user._id));
        return [...prev, ...newUsers];
      });
    }
  }, [data, isSuccess]);

  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container || isFetching) return;

      const scrollHeight = container.scrollHeight;
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;

      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      if (scrollPercentage >= 0.98 && data?.hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    const container = containerRef.current;
    if (container) container.addEventListener("scroll", handleScroll);
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, [data?.hasMore, isFetching]);

  // Filter users based on the search term
  const filteredUsers = allUsers.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mark messages as read when the selected user changes
  useEffect( () => {
    if (selectedUser && user) {
  
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
  
      markMessagesAsRead(); // Assuming markAsRead is a function that triggers an API call
    }
  }, [selectedUser, user, markAsRead]);
  

  // Handle user selection and mark messages as read
  const handleUserClick = (user) => {
    setSelectedUser(user);
    markAsRead(user._id); // Mark as read when the user is clicked
  };

  return (
    <div className="w-72 bg-gray-100 border-r h-full flex flex-col p-2">
      <Input
        placeholder="Search users..."
        className="mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div
        ref={containerRef}
        className="space-y-2 overflow-y-scroll"
        style={{ height: "560px" }}
      >
        {filteredUsers.map((user) => (
          <div key={user._id} onClick={() => handleUserClick(user)}>
            <UserListItem user={user} isActive={selectedUser?._id === user._id} />
          </div>
        ))}
        {isFetching && (
          <p className="text-center text-xs text-gray-500 py-2">Loading more users...</p>
        )}
      </div>
    </div>
  );
}

