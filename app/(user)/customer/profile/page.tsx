'use client'

import { client } from '@/sanity/lib/client';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

type User = {
  _id: string;
  userID: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  addresses: Address[];
};

type Address = {
  _id: string;
  street: string;
  city: string;
  district: string;
};

const UserDetailsPage = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<User | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Added loading state

  useEffect(() => {
    // Check if user is present before fetching data
    if (user) {
      setLoading(true); // Set loading to true when fetching starts

      client
        .fetch<User[]>(`*[_type == "user" && userID == $userID]`, { userID: user.id })
        .then((data) => {
          if (data?.length > 0) {
            setUserData(data[0]); // Set user data
          }
        })
        .finally(() => setLoading(false)); // Set loading to false after fetch
    }
  }, [user]);

  if (loading) return <p>Loading...</p>; // Show loading until data is fetched
  if (!userData) return <p>No user data found</p>; // Handle case where no data is found

  return (
    <div className="container mx-auto p-4">
      {/* User Information */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold">{userData.firstName} {userData.lastName}</h1>
        <p className="text-gray-600">Email: {userData.email}</p>
        <p className="text-gray-600">Mobile: {userData.mobile}</p>
      </div>

      {/* Address Selection */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Select a Shipping Address</h2>

        {/* Show all addresses as radio buttons */}
        <div className="space-y-4 mt-4">
          {userData.addresses.map((address) => (
            <label
              key={address._id}
              className="flex items-center gap-3 border p-4 rounded-md cursor-pointer"
            >
              <input
                type="radio"
                name="selectedAddress"
                value={address._id}
                checked={selectedAddress === address._id}
                onChange={() => setSelectedAddress(address._id)}
                className="h-4 w-4"
              />
              <div className="flex justify-between w-full">
                <div className="ml-2">
                  <p className="text-gray-700">
                    {address.street}, {address.city}
                  </p>
                  <p className="text-gray-500">{address.district}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
