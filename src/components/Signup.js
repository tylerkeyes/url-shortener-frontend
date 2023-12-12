import React, { useState } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const server_url = 'http://localhost:3000';
const qs = require('qs');

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSignup = async () => {
    try {
      const endpoint = server_url.concat("/create/user")
      const signupRes = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
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
        <h2> Create Account </h2>

        <div>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className='button-container'>
          <button onClick={handleSignup}>Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
