import { useEffect, useContext,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, fetchUserByUserId, addUser, updateUser, deleteUser }  from "../../redux/slice/UserSlice";
import { useSidebar } from "../../hooks/useSidebar";
import { ActiveUserContext } from "../../context/ActiveUserProvider";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogTrigger } from "../../../../components/ui/dialog";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users, userDetails, loading, error } = useSelector((state) => state.userDetails);
  const [singleUser,setSingleUser]=useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleViewDetails = (userId) => {
    dispatch(fetchUserByUserId(userId));
    setSingleUser(true);
    setOpenModal(true);
  };

  const handleAddUser = () => {
    dispatch(addUser(newUser));
    setNewUser({ title: "", body: "" });
    setOpenModal(false);
  };

  const handleEditUser = () => {
    dispatch(updateUser(selectedUser));
    setOpenEditModal(false);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };


  const { isSidebarOpen } = useSidebar();
  const { points } = useContext(ActiveUserContext);
  
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ title: "", body: "" });

  return (
    <div className={`${isSidebarOpen ? "p-6 lg:ml-56" : "p-4 lg:ml-16"}`}>
      <h1>Welcome to Dashboard, Points: {points}</h1>
  <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="flex justify-between mb-4">
        <Button onClick={() => setOpenModal(true)}>+ Add User</Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3">ID</th>
              <th className="border p-3">Title</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border p-3">{user.id}</td>
                <td className="border p-3">{user.title}</td>
                <td className="border p-3 space-x-2">
                  <Button size="sm" onClick={() => handleViewDetails(user.id)}>View</Button>
                  <Button size="sm" onClick={() => { setSelectedUser(user); setOpenEditModal(true); }}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogTitle>Add User</DialogTitle>
          <Input placeholder="Title" value={newUser.title} onChange={(e) => setNewUser({ ...newUser, title: e.target.value })} />
          <Input placeholder="Body" value={newUser.body} onChange={(e) => setNewUser({ ...newUser, body: e.target.value })} />
          <DialogFooter>
            <Button onClick={handleAddUser}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      {selectedUser && (
        <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
          <DialogContent>
            <DialogTitle>Edit User</DialogTitle>
            <Input value={selectedUser.title} onChange={(e) => setSelectedUser({ ...selectedUser, title: e.target.value })} />
            <DialogFooter>
              <Button onClick={handleEditUser}>Update</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
  
    </div>
  );
};

export default Dashboard;
