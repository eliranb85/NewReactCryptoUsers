import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../index.css';

export default function Component3(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUsers = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
        setLoading(false);
      }
    };


    useEffect(() => {
      fetchUsers();
    }, []);
    
    const handleDeleteUser = async (id) => {
      try {
        await Axios.delete(`http://localhost:3001/users/${id}`);
        fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Error deleting user');
      }
    };
  
    const handleDeleteAllUsers = async () => {
      try {
        await Axios.delete('http://localhost:3001/users');
        fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error('Error deleting all users:', error);
        setError('Error deleting all users');
      }
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
    
    return (
      <div className="user-list">
        <h2>All Users</h2>
        <button onClick={handleDeleteAllUsers}>Delete All Users</button>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <p>Name: {user.name}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }