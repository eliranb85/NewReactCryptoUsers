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
        
        <ul >
          {users.map(user => (
            <li key={user.id} id="userlis">
              <p>ID: {user.id}</p>
              <p>Name: {user.name}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <div className='delbtnera'>
              <button onClick={() => handleDeleteUser(user.id)} id="delbtn">Delete</button>
              </div>
            </li>
          ))}
          <button onClick={handleDeleteAllUsers} id="delallusers">Delete All Users</button>
        </ul>
      </div>
    );
  }