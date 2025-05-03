import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlusCircle, RefreshCw, MoreVertical } from 'lucide-react';
import AddStudentModal from './AddStudent';

function AllStudents() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    user_id: '',
    college_email: '',
    id_card: '',
    address_id: '',
    college_name: '',
    university_name: '',
    verified: false,
    expiry_date: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const itemsPerPage = 10;

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students when search term changes
  useEffect(() => {
    const filtered = students.filter(student =>
      student.college_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user_id.toString().includes(searchTerm)
    );
    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/v1/students/fetch-students');
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleViewDetails = async (studentId) => {
    try {
      const response = await axios.get(`/api/v1/students/fetch-students-by-id/${studentId}`);
      setSelectedStudent(response.data);
      setShowDropdown(null);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`/api/v1/students/delete-students-by-id/${studentId}`);
      fetchStudents();
      setShowDropdown(null);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.user_id) errors.user_id = 'User ID is required';
    if (!formData.college_email) errors.college_email = 'College email is required';
    if (!formData.id_card) errors.id_card = 'ID card is required';
    if (!formData.address_id) errors.address_id = 'Address ID is required';
    if (!formData.college_name) errors.college_name = 'College name is required';
    if (!formData.university_name) errors.university_name = 'University name is required';
    if (!formData.expiry_date) errors.expiry_date = 'Expiry date is required';
    return errors;
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await axios.post('/api/v1/students/create-students', formData);
      setIsAddModalOpen(false);
      setFormData({
        user_id: '',
        college_email: '',
        id_card: '',
        address_id: '',
        college_name: '',
        university_name: '',
        verified: false,
        expiry_date: '',
      });
      setFormErrors({});
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
      setFormErrors({ submit: error.response?.data?.message || 'Failed to add student' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setFormErrors({});
    setFormData({
      user_id: '',
      college_email: '',
      id_card: '',
      address_id: '',
      college_name: '',
      university_name: '',
      verified: false,
      expiry_date: '',
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 relative">
      {/* Search and Buttons Row */}
      <div className="flex items-center mb-4 space-x-4">
        <Input
          type="text"
          placeholder="Search by email or ID..."
          className="w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center bg-[#1c1b20] hover:bg-[#c0302c] text-white"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Students
        </Button>
        <Button
          onClick={fetchStudents}
          className="flex items-center bg-[#1c1b20] hover:bg-[#c0302c] text-white"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Students Table */}
      <div className="relative">
        <Table className="z-10">
          <TableHeader>
            <TableRow className="bg-black hover:bg-black">
              <TableHead className="text-white">S.No</TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">College Email</TableHead>
              <TableHead className="text-white">Verified</TableHead>
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((student, index) => (
                <TableRow key={student._id} className="bg-white hover:bg-white">
                  <TableCell className="text-black">{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell className="text-black">{student.user_id}</TableCell>
                  <TableCell className="text-black">{student.college_email}</TableCell>
                  <TableCell className="text-black">{student.verified ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-black">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-5 w-5 text-gray-600" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleViewDetails(student._id)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {/* Implement edit logic */}}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(student._id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="bg-white hover:bg-white">
                <TableCell colSpan={5} className="text-center py-4 text-black">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Student Details</h2>
            <p><strong>User ID:</strong> {selectedStudent.user_id}</p>
            <p><strong>College Email:</strong> {selectedStudent.college_email}</p>
            <p><strong>College Name:</strong> {selectedStudent.college_name}</p>
            <p><strong>University:</strong> {selectedStudent.university_name}</p>
            <p><strong>Verified:</strong> {selectedStudent.verified ? 'Yes' : 'No'}</p>
            <p><strong>Expiry Date:</strong> {new Date(selectedStudent.expiry_date).toLocaleDateString()}</p>
            <Button
              className="mt-4 bg-[#1c1b20] hover:bg-[#c0302c] text-white"
              onClick={() => setSelectedStudent(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddStudent}
        formData={formData}
        formErrors={formErrors}
        onInputChange={handleInputChange}
      />
    </div>
  );
}

export default AllStudents;