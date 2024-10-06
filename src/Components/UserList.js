import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
    const rowStyles = {
        oddRow: {
          backgroundColor: '#30D5C8'
        },
        evenRow: {
          backgroundColor: '#6CDAE7'
        }
    };

  return (
    <div>
      <h2>User List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}
          
            style={index % 2 === 0 ? rowStyles.evenRow : rowStyles.oddRow}
            >
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => onEdit(user)}>Edit</button>
                <button onClick={() => onDelete(user.id)}>Delete</button>
                <button onClick={() => (console.log("HELLO"))}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
