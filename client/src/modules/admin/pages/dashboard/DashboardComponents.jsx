import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, User } from 'lucide-react';

function DashboardComponents() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [paidSubscribers, setPaidSubscribers] = useState(0);
  const [freeSubscribers, setFreeSubscribers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total users
        const usersResponse = await fetch('http://localhost:5000/api/v1/users/count', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!usersResponse.ok) {
          throw new Error('Failed to fetch user count');
        }

        const usersData = await usersResponse.json();
        if (usersData.success) {
          setTotalUsers(usersData.totalUsers);
        } else {
          throw new Error(usersData.message || 'Error fetching user count');
        }

        // Simulating paid and free subscribers data (replace with actual API calls)
        setPaidSubscribers(1234); // Replace with actual API call
        setFreeSubscribers(5678); // Replace with actual API call
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Card 1: Total Users */}
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : (
                <>
                  <span className="text-xl font-bold">{totalUsers}</span>
                  <p className="text-xs text-gray-500">All Users</p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Card 2: Paid Subscribers */}
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-semibold flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                Paid Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : (
                <>
                  <span className="text-xl font-bold">{paidSubscribers}</span>
                  <p className="text-xs text-gray-500">Premium Users</p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Card 3: Free Subscribers */}
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-semibold flex items-center">
                <User className="w-5 h-5 mr-2 text-purple-500" />
                Free Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : (
                <>
                  <span className="text-xl font-bold">{freeSubscribers}</span>
                  <p className="text-xs text-gray-500">Basic Users</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardComponents;