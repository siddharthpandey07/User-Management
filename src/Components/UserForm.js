import React, { useState, useEffect } from 'react';

const UserForm = ({ initialData, onSubmit, closeModal }) => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    if (initialData) {
      setUser(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <div>
      <h2>{initialData ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={user.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleChange} required />
        </label>
        <button type="submit">{initialData ? 'Update' : 'Create'}</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;
