import { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  fetchUserByUserId,
  addUser,
  updateUser,
  deleteUser,
} from "../../redux/slice/UserSlice";
import { useSidebar } from "../../hooks/useSidebar";
import { ActiveUserContext } from "../../context/ActiveUserProvider";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import Help from "@/staticPages/help";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users, userDetails, loading, error } = useSelector(
    (state) => state.userDetails
  );
  const [singleUser, setSingleUser] = useState(false);

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
      <div>
        <Help />
      </div>
    </div>
  );
};

export default Dashboard;
