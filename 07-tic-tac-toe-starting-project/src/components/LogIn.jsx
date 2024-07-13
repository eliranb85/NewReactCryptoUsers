import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { TabContext } from './TabContext';
import Register from './Register'; 
import '../index.css';

export default function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn, setSelectedTopic } = useContext(TabContext);
    const [message, setMessage] = useState('');
    const [showRegister, setShowRegister] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login submitted:', { username, password });
        
        try {
            const response = await Axios.post('http://localhost:3001/login', { username, password });
            console.log(response.data);
            setIsLoggedIn(true);
            setSelectedTopic('component 1');
            setMessage('WELCOME');
        } catch (error) {
            console.error('Error logging in user:', error);
            setIsLoggedIn(false);
            setMessage('User not found or incorrect password');
        }
    };

    if (showRegister) {
        return <Register />;
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
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
                    <button id='loginbtn' type="submit">Log In</button>
                </div>
                <span>Don't have a user? <a href="#" onClick={() => setShowRegister(true)}>Register</a></span>
            </form>
        </div>
    );
}
