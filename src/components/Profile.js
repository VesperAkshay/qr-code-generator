import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { currentUser } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Email: {currentUser.email}</p>
    </div>
  );
}
