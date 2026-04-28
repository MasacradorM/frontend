import { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateUser(editId, form);
      setEditId(null);
    } else {
      await createUser(form);
    }
    setForm({ name: '', email: '' });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({ name: user.name, email: user.email });
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
      <h2>Users</h2>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <button onClick={handleSubmit}>{editId ? 'Update' : 'Create'}</button>

      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Edit</button>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}