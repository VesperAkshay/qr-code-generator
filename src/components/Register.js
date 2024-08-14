import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Create an Account</h1>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md"
        >
          Register
        </button>
        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full mt-4 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors duration-300 shadow-md flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M47.48 24.31c0-1.51-.13-2.92-.37-4.31H24v8.16h13.24c-.57 3.08-2.26 5.68-4.82 7.44v6.17h7.75c4.55-4.2 7.31-10.42 7.31-17.46z"/>
            <path fill="#34A853" d="M24 48c6.28 0 11.54-2.09 15.38-5.67l-7.75-6.17c-2.13 1.43-4.82 2.28-7.63 2.28-5.9 0-10.88-3.98-12.67-9.3H3.28v5.84C7.06 43.08 14.91 48 24 48z"/>
            <path fill="#FBBC05" d="M11.33 29.14A14.97 14.97 0 019.62 24c0-1.79.32-3.5.89-5.14V13h-7.05A23.96 23.96 0 000 24c0 3.95.92 7.69 2.55 11.02l8.78-5.88z"/>
            <path fill="#EA4335" d="M24 9.54c3.28 0 6.21 1.13 8.53 3.36l6.42-6.42C34.08 2.61 29.82 1 24 1 14.91 1 7.06 5.92 3.28 13l8.06 6.16C13.12 14.52 18.1 9.54 24 9.54z"/>
          </svg>
          Register with Google
        </button>
      </form>
    </div>
  );
}
