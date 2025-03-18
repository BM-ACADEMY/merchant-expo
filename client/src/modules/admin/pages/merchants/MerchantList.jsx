import React, { useEffect, useState } from "react";
import axios from "axios";

const MerchantList = () => {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    axios.get("/api/merchants")
      .then(res => setMerchants(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold">Merchants</h2>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Company Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          { merchants.map(merchant => (
            <tr key={merchant._id} className="border">
              <td className="px-4 py-2">{merchant.user_id}</td>
              <td className="px-4 py-2">{merchant.company_name}</td>
              <td className="px-4 py-2">{merchant.email}</td>
              <td className="px-4 py-2">{merchant.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MerchantList;
