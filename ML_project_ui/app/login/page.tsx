"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import loginData from '../../data/loginData.json';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const user = loginData.users.find(
      (u) => u.username.trim() === username.trim() && u.password === password
    );

    if (user) {
      console.log('Login successful:', user);
      localStorage.setItem("isAuthenticated", "true");
      router.push('/'); // Redirect to the main page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>
        <Button onClick={handleLogin} className="w-full">Login</Button>
      </Card>
    </div>
  );
};

export default LoginPage;