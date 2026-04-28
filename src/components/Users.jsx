import { useState, useEffect, useCallback } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editId, setEditId] = useState(null);

  const fetchUsers = useCallback(async () => {
    const res = await getUsers();
    setUsers(res.data);
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
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
      <div className="header">
        <h2>Users</h2>
        <p>Manage all users in the database</p>
      </div>
      <div className="form-card">
        <div className="field">
          <label>Name</label>
          <input placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="field">
          <label>Email</label>
          <input placeholder="john@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <button className="btn" onClick={handleSubmit}>{editId ? 'Update' : 'Create'}</button>
        {editId && <button className="btn-secondary" onClick={() => { setEditId(null); setForm({ name: '', email: '' }); }}>Cancel</button>}
      </div>
      <div className="table-card">
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Actions</th></tr></thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="4" className="empty">No users found</td></tr>
            ) : users.map(u => (
              <tr key={u.id}>
                <td><span className="badge">#{u.id}</span></td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><div className="actions">
                  <button className="btn-sm" onClick={() => handleEdit(u)}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(u.id)}>Delete</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}