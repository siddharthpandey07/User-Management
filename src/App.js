import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './Components/UserList';
import UserForm from './Components/UserForm';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async (user) => {
    try {
      const response = await axios.post(API_URL, user);
      setUsers([...users, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser);
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setShowForm(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  const handleSubmit = (user) => {
    if (selectedUser) {
      updateUser({ ...selectedUser, ...user });
    } else {
      createUser(user);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {showForm && (
        <UserForm
          initialData={selectedUser}
          onSubmit={handleSubmit}
          closeModal={() => setShowForm(false)}
        />
      )}
      <button onClick={() => { setSelectedUser(null); setShowForm(true); }}>
        Create New User
      </button>
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
