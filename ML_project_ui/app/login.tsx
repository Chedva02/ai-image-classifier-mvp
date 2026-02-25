import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', { username, password });
    // Add logic to authenticate using the loginData.json file
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <Button onClick={handleLogin} className="w-full">Login</Button>
      </Card>
    </div>
  );
};

export default LoginPage;