import { useSelectedUser } from "../../../context/SelectedUserContext";

export default function Header() {
  const { selectedUser } = useSelectedUser();
  if (!selectedUser) return null;
  const userName = selectedUser?.name;
  const profilePic = selectedUser?.profile_pic;

  return (
    <div className="h-16 bg-white border-b px-4 flex items-center gap-3">
      {
        profilePic ? (
          <img src={selectedUser.profile_pic} alt="user" className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-semibold uppercase">
              {userName.charAt(0)}
            </div>
          </>
        )
      }
      <div>
        <div className="font-semibold">{selectedUser.name}</div>
        <div className="text-xs text-gray-500">Online</div>
      </div>
    </div>
  );
}
