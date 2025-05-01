import React, { useState } from 'react';
import { useSidebar } from '../../hooks/useSidebar';
import { Search, PlusCircle, RefreshCw, MoreVertical } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const StudentList = () => {
  const { isSidebarOpen } = useSidebar();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const studentsPerPage = 10;

  // Mock data
  const students = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Student ${index + 1}`,
    email: `student${index + 1}@college.edu`,
    college: `College ${index % 5 + 1}`,
    university: `University ${index % 3 + 1}`,
    passoutYear: 2020 + (index % 5),
  }));

  // Filter students
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginated data
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Toggle dropdown
  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div >
      <h1 className="text-2xl font-bold mb-4">Student List</h1>

      {/* Controls Row */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Button
          className="flex items-center bg-[#1c1b20] hover:bg-[#c0302c] text-white"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Student
        </Button>
        <Button
          onClick={() => window.location.reload()}
          className="flex items-center bg-[#1c1b20] hover:bg-[#c0302c] text-white"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by Name or Email..."
            className="w-72 pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>College Email</TableHead>
              <TableHead>College Name</TableHead>
              <TableHead>University Name</TableHead>
              <TableHead>Passout Year</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.college}</TableCell>
                  <TableCell>{student.university}</TableCell>
                  <TableCell>{student.passoutYear}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="w-5 h-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredStudents.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-white border border-gray-300 text-black hover:bg-gray-200"
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-white border border-gray-300 text-black hover:bg-gray-200"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentList;