import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useGetStudentsQuery, useAddStudentMutation, useUpdateStudentMutation, useDeleteStudentMutation } from "@/redux/api/Studentapi";

export default function AddStudent() {
  const { data: students, refetch } = useGetStudentsQuery();
  const [addStudent] = useAddStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();
  
  const [formData, setFormData] = useState({
    id: null,
    id_card_image: "",
    college_name: "",
    university_name: "",
    college_city: "",
    college_state: "",
    college_country: "",
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      await updateStudent(formData);
    } else {
      await addStudent(formData);
    }
    refetch();
    setIsModalOpen(false);
  };

  const handleEdit = (student) => {
    setFormData(student);
    setIsModalOpen(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    await deleteStudent(deleteId);
    refetch();
    setIsDeleteConfirmOpen(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <Button onClick={() => setIsModalOpen(true)}>Add Student</Button>
      <div className="mt-6 space-y-4">
        {students?.map((student) => (
          <Card key={student._id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p>{student.college_name} ({student.university_name})</p>
                <p>{student.college_city}, {student.college_state}, {student.college_country}</p>
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => handleEdit(student)}>Edit</Button>
                <Button variant="destructive" onClick={() => confirmDelete(student._id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Add / Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogTitle>{formData.id ? "Edit Student" : "Add Student"}</DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="id_card_image" value={formData.id_card_image} onChange={handleChange} placeholder="ID Card Image URL" required />
            <Input name="college_name" value={formData.college_name} onChange={handleChange} placeholder="College Name" required />
            <Input name="university_name" value={formData.university_name} onChange={handleChange} placeholder="University Name" required />
            <Input name="college_city" value={formData.college_city} onChange={handleChange} placeholder="College City" required />
            <Input name="college_state" value={formData.college_state} onChange={handleChange} placeholder="College State" required />
            <Input name="college_country" value={formData.college_country} onChange={handleChange} placeholder="College Country" required />
            <Button type="submit">{formData.id ? "Update" : "Save"}</Button>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
