import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Page/Page.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5001/users/get');
        const sortedUsers = response.data.sort((a, b) => new Date(b.time) - new Date(a.time));
        setUsers(sortedUsers.reverse());
        setTotalUsers(sortedUsers.length);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (PID) => {
    try {
      await axios.delete('http://127.0.0.1:5001/users/delete', { data: { PID } });
      const updatedUsers = users.filter(user => user.PID !== PID);
      setUsers(updatedUsers);
      setTotalUsers(updatedUsers.length);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <header style={{ textAlign: 'center' }}>User List</header>
      <div style={{ textAlign: 'center' }}>
        <ul>
          {users.map(user => (
            <div key={user._id}>
              <h5 style={{ display: 'inline-block' }}>{user.PID} - {user.time}</h5>
              <button onClick={() => handleDeleteUser(user.PID)} style={{ marginLeft: '10px' }}>Delete</button>
            </div>
          ))}
        </ul>
        <h4>จำนวนคนทั้งสิน: {totalUsers}</h4>
      </div>
    </div>
  );
};

export default UserList;
