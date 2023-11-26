import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const server_url = 'http://localhost:3001';
const qs = require('qs');

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const endpoint = server_url.concat(`/auth?provider=me`)
      console.log(`authenticate using username=${username}&password=${password}`)
      const data = qs.stringify({
        'username': username,
        'password': password,
      });
      const loginRes = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: endpoint,
        data: data,
      });
      setUsername('');
      setPassword('');
      console.log("got login response: ", loginRes);
    } catch (error) {
      console.log("Error logging in: ", error);
    }
  };

  const handleSignup = async () => {
    try {
      const endpoint = server_url.concat("/create/user")
      const signupRes = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        url: endpoint,
        data: {
          username: username,
          password: password,
        },
      });
      console.log("got signup response: ", signupRes);
    } catch (error) {
      console.log("Error signing in: ", error);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
        <h2> Login </h2>
        <div>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='button-container'>
          <button onClick={handleLogin}>Login In</button>
          <button onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
