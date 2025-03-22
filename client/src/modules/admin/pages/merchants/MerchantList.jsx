import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSidebar } from "../../hooks/useSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Filter, PlusCircle } from "lucide-react";

const MerchantList = () => {
  const { isSidebarOpen } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState([]);
  const [planFilter, setPlanFilter] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [plans, setPlans] = useState([]);

  // Fetch merchants, statuses, and plans from the database
  useEffect(() => {
    async function fetchData() {
      try {
        const [merchantRes, statusRes, planRes] = await Promise.all([
          axios.get("/api/merchants"),
          axios.get("/api/status"),
          axios.get("/api/plans")
        ]);

        // Ensure data is an array or set an empty array as fallback
        setMerchants(Array.isArray(merchantRes.data) ? merchantRes.data : []);
        setStatuses(Array.isArray(statusRes.data) ? statusRes.data : []);
        setPlans(Array.isArray(planRes.data) ? planRes.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMerchants([]); // Ensure merchants is always an array
      }
    }
    fetchData();
  }, []);

  // Filter merchants based on search and selected filters
  const filteredMerchants = merchants?.filter((merchant) => {
    return (
      merchant.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter.length === 0 || statusFilter.includes(merchant.status)) &&
      (planFilter.length === 0 || planFilter.includes(merchant.plan))
    );
  }) || [];

  return (
    <div className={`${isSidebarOpen ? 'p-6 lg:ml-56' : 'p-4 lg:ml-16'}`}>
      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search merchants..."
          className="w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" /> Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {statuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={statusFilter.includes(status)}
                onCheckedChange={(checked) => {
                  setStatusFilter((prev) =>
                    checked ? [...prev, status] : prev.filter((s) => s !== status)
                  );
                }}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Plan Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" /> Plans
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {plans.map((plan) => (
              <DropdownMenuCheckboxItem
                key={plan}
                checked={planFilter.includes(plan)}
                onCheckedChange={(checked) => {
                  setPlanFilter((prev) =>
                    checked ? [...prev, plan] : prev.filter((p) => p !== plan)
                  );
                }}
              >
                {plan}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add Merchant Button */}
        <Button className="ml-auto flex items-center bg-blue-600 hover:bg-blue-700 text-white">
          <PlusCircle className="w-4 h-4 mr-2" /> Add Merchant
        </Button>
      </div>

      {/* Merchant Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">More</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMerchants.map((merchant) => (
            <TableRow key={merchant.id}>
              <TableCell>{merchant.name || "N/A"}</TableCell>
              <TableCell>{merchant.email || "N/A"}</TableCell>
              <TableCell>{merchant.number || "N/A"}</TableCell>
              <TableCell>{merchant.plan || "N/A"}</TableCell>
              <TableCell>{merchant.status || "N/A"}</TableCell>
              <TableCell className="text-right">
                {/* More Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => console.log("Viewing", merchant)}>View</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Editing", merchant)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log("Deleting", merchant)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MerchantList;
