//import logo from './logo.svg';
import '../styles/Home.css';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const server_url = 'http://localhost:3000';
const user_id = 'demoEmail';

axios.defaults.baseURL = 'http://localhost:3000';

function Home() {
  const [storedURLs, setStoredURLs] = useState([]);
  const [inputURL, setInputURL] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const jwtToken = searchParams.get("token");

  const fetchStoredURLs = async () => {
    try {
      const endpoint = server_url.concat('/').concat(user_id).concat('/getCreatedUrls')
      const response = await axios.get(endpoint);
      console.log("fetch stored: " + response.data);
      if (response.data !== null) {
        setStoredURLs(response.data);
      }
    } catch (error) {
      console.error('Error fetching stored URLs:', error);
    }
  };

  const clearStoredURLs = async () => {
    setStoredURLs([]);
  };

  const createShortURL = async () => {
    try {
      if (inputURL === "") {
        console.log("empty url given");
        return;
      }
      const endpoint = server_url.concat('/?token=').concat(jwtToken);
      let formData = new FormData();
      formData.append("url", inputURL);
      // TODO: handle adding a custom expiration time
      console.log('input url: ' + inputURL);
      const response = await axios({
        method: 'post',
        url: endpoint,
        data: formData,
      });
      console.log('Short URL created:', response.data);
      if (response.data.status !== undefined && response.data.status === "unauthorized") {
        console.log("user is unauthorized");
        window.location.href = "/login";
      }
      // Handle success or update UI accordingly
      setInputURL("");
    } catch (error) {
      console.error('Error creating short URL:', error);
    }
  };

  const sendMessage = async () => {
    try {
      const endpoint = server_url.concat('/sendMessage')
      let formData = new FormData();
      formData.append("messageData", message);
      const response = await axios({
        method: 'post',
        url: endpoint,
        data: formData,
      });
      // Handle success or update UI accordingly
      console.log('Message sent:', response.data);
      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const authenticateUser = async () => {
    console.log('authenticate user');
    try {
      const endpoint = server_url.concat('/auth?provider=google')
      const response = await axios({
        method: 'get',
        url: endpoint,
      });
      console.log('Authenticated user: ', response);
    } catch (error) {
      console.error('Error authenticating user: ', error);
    }
  };

  useEffect(() => {
    //fetchStoredURLs();
    // Add any additional initial fetches if needed
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <h1>Warp Link</h1>
        <p>Generate shortened links to share with others.</p>
      </section>

      <section className="main">
        <input
          className="input"
          type="text"
          value={inputURL}
          onChange={(e) => setInputURL(e.target.value)}
          placeholder="Enter URL"
        />
        <button className="btn" onClick={createShortURL}>
          Create short URL
        </button>
      </section>

      <section className="message-section">
        <input
          className="input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button className="btn" onClick={sendMessage}>
          Send Message
        </button>
      </section>

      <section className="main">
        <button className="btn" onClick={fetchStoredURLs}>
          View stored URLs
        </button>
        <button className="btn" onClick={clearStoredURLs}>
          Clear stored URLs
        </button>
        {storedURLs.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th> Short Hash </th>
                <th> Stored URL </th>
                <th> Expiration Date </th>
                <th> Number of times used </th>
              </tr>
            </thead>
            <tbody>
              {storedURLs.map((url) => (
                <tr key={url.TinyUrl}>
                  <td>{url.TinyUrl}</td>
                  <td>{url.BigUrl}</td>
                  <td>{url.Expires}</td>
                  <td>{url.NumUsed}</td>
                </tr>
              ))}
            </tbody>
            {/* ... */}
          </table>
        )}
        {storedURLs.length === 0 && <br />}
      </section>

      <footer className="footer">
        <p>Warp Link</p>
      </footer>
    </div>
  );
};

export default Home;
