import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const server_url = 'http://localhost:3000';
const qs = require('qs');

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const userState = searchParams.get("status");

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

  const handleGoogleLogin = () => {
    window.location.href = server_url.concat("/auth/google");
  };

  const clearQueryString = () => {
    setSearchParams(`?`);
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
        <h2> Login </h2>

        <div>
          <section>
            <div className="container">
              <div className="text-center text-success">
                <button className="btn btn-danger" onClick={handleGoogleLogin}>
                  <span className="fa fa-google"> SignIn with Google</span>
                </button>
              </div>
            </div>
          </section>
        </div>

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
          <Link to="/signup" className="btn btn-primary login-button">Sign Up</Link>
        </div>
        {userState === "notfound" && (
          <div className='banner'>
            <button onClick={clearQueryString}>This account was not found, please create a new account</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
