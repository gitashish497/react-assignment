import React, { useState } from 'react';

function LoginPage({ setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your authentication logic here (e.g., Firebase, etc.)
    // For now, we simulate a successful login
    setLoggedIn(true); // This will redirect to the students page
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
