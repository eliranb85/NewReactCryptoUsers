import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { TabContext } from './TabContext';
import '../index.css';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setSelectedTopic, setIsNewUser } = useContext(TabContext);
  const [message, setMessage] = useState('');

  const handleSubmitBtn = async (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000000); // Generate a random ID
    console.log('Register submitted:', { id, name, username, email, password });

    if (username === '' || password === '' || name === '' || email === '') {
      setIsNewUser(false);
      setMessage('Please fill all fields');
    } else {
      try {
        const response = await Axios.post('http://localhost:3001/register', {
          id, name, username, email, password
        });
        console.log(response.data);
        setIsNewUser(true);
        setMessage('WELCOME');
        setSelectedTopic('component1'); // This will trigger a re-render in TabContent
      } catch (error) {
        console.error('Error registering user:', error);
        setMessage('Error registering user');
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmitBtn}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">User Name:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <span id='error'>{message}</span>
        <div className='btnera'>
          <button id='createuserbtn' type="submit">Create User</button>
        </div>
      </form>
    </div>
  );
}
