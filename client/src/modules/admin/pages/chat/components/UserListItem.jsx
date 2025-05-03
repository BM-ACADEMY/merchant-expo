import { CheckCheck } from "lucide-react";

export default function UserListItem({ user ,isActive }) {
  const profilePic = user?.profile_pic;
  const userName = user?.name || "User";

  return (
    <div  className={`flex items-center gap-3 px-2 py-3 rounded-lg cursor-pointer h-14 
      ${isActive ? "bg-blue-100" : "hover:bg-gray-200"}`}>
      <div className="relative">
        {profilePic ? (
          <img
            src={profilePic}
            alt={userName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-semibold uppercase">
            {userName.charAt(0)}
          </div>
        )}
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-medium text-sm truncate">{userName}</span>
          <span className="text-xs text-gray-500">{user?.lastActiveTime || "2:45 PM"}</span>
        </div>
        <div className="flex items-center text-xs text-gray-600 gap-1">
          <CheckCheck size={14} />
          <span className="truncate">{user?.lastMessage || "Last message..."}</span>
        </div>
      </div>
    </div>
  );
}
