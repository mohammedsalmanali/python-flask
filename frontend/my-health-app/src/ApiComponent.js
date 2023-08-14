import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from './api'; // Import registerUser function from your API file
import DisplayActivities from './DisplayActivities';

function ApiComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRegistered, setUserRegistered] = useState(false);

  const handleRegister = async () => {
    try {
      const userData = { username, password };
      const response = await registerUser(userData);
      console.log(response.message); // Display server response
      setUserRegistered(true); // Update state to indicate user is registered
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <h2>Register User</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {userRegistered && (
        <div>
          <p>User registered successfully!</p>
          {/* Replace 'userId' with the actual user ID */}
          <Link to={`/activities/${userId}`}>View Activities</Link>
        </div>
      )}
    </div>
  );
}

export default ApiComponent;
