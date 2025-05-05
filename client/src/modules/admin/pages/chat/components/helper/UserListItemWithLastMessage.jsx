import { useGetLastMessageBetweenUsersQuery } from "@/redux/api/MessageApi";
import UserListItem from "../UserListItem";

export default function UserListItemWithLastMessage({
  user,
  currentUserId,
  selectedUser,
  setSelectedUser,
}) {
  const { data: lastMsgData, isLoading } = useGetLastMessageBetweenUsersQuery(
    {
      userId: currentUserId,
      contactId: user._id,
    },
    {
      skip: !currentUserId || !user._id,
    }
  );


  const lastMessage = lastMsgData?.lastMessage || (isLoading ? "Loading..." : "No messages");
  const lastMessageTime = lastMsgData?.timestamp || "";

  return (
    <div onClick={() => setSelectedUser(user)}>
      <UserListItem
        user={{
          ...user,
          lastMessage,
          lastMessageTime,
        }}
        isActive={selectedUser?._id === user._id}
      />
    </div>
  );
}
