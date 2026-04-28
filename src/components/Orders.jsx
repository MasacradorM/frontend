import { useState, useEffect, useCallback } from 'react';
import { getOrders, createOrder, updateOrder, deleteOrder, getUsers, getProducts } from '../api/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ user: { id: '' }, product: { id: '' }, quantity: '' });
  const [editId, setEditId] = useState(null);

  const fetchOrders = useCallback(async () => {
    const res = await getOrders();
    setOrders(res.data);
  }, []);

  useEffect(() => {
    fetchOrders();
    getUsers().then(r => setUsers(r.data));
    getProducts().then(r => setProducts(r.data));
  }, [fetchOrders]);

  const handleSubmit = async () => {
    if (!form.user.id || !form.product.id || !form.quantity) return;
    if (editId) {
      await updateOrder(editId, form);
      setEditId(null);
    } else {
      await createOrder(form);
    }
    setForm({ user: { id: '' }, product: { id: '' }, quantity: '' });
    fetchOrders();
  };

  const handleEdit = (order) => {
    setEditId(order.id);
    setForm({ user: { id: order.user.id }, product: { id: order.product.id }, quantity: order.quantity });
  };

  const handleDelete = async (id) => {
    await deleteOrder(id);
    fetchOrders();
  };

  return (
    <div>
      <div className="header">
        <h2>Orders</h2>
        <p>Manage all orders in the database</p>
      </div>
      <div className="form-card">
        <div className="field">
          <label>User</label>
          <select value={form.user.id} onChange={e => setForm({ ...form, user: { id: e.target.value } })}>
            <option value="">Select user</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Product</label>
          <select value={form.product.id} onChange={e => setForm({ ...form, product: { id: e.target.value } })}>
            <option value="">Select product</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="field" style={{ maxWidth: '120px' }}>
          <label>Quantity</label>
          <input type="number" placeholder="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
        </div>
        <button className="btn" onClick={handleSubmit}>{editId ? 'Update' : 'Create'}</button>
        {editId && <button className="btn-secondary" onClick={() => { setEditId(null); setForm({ user: { id: '' }, product: { id: '' }, quantity: '' }); }}>Cancel</button>}
      </div>
      <div className="table-card">
        <table>
          <thead><tr><th>ID</th><th>User</th><th>Product</th><th>Quantity</th><th>Actions</th></tr></thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan="5" className="empty">No orders found</td></tr>
            ) : orders.map(o => (
              <tr key={o.id}>
                <td><span className="badge">#{o.id}</span></td>
                <td>{o.user?.name}</td>
                <td>{o.product?.name}</td>
                <td>{o.quantity}</td>
                <td><div className="actions">
                  <button className="btn-sm" onClick={() => handleEdit(o)}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(o.id)}>Delete</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}