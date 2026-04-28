import { useState, useEffect } from 'react';
import { getOrders, createOrder, updateOrder, deleteOrder, getUsers, getProducts } from '../api/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ user: { id: '' }, product: { id: '' }, quantity: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchOrders();
    getUsers().then(r => setUsers(r.data));
    getProducts().then(r => setProducts(r.data));
  }, []);

  const fetchOrders = async () => {
    const res = await getOrders();
    setOrders(res.data);
  };

  const handleSubmit = async () => {
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
      <h2>Orders</h2>
      <select value={form.user.id} onChange={e => setForm({ ...form, user: { id: e.target.value } })}>
        <option value="">Select User</option>
        {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
      </select>
      <select value={form.product.id} onChange={e => setForm({ ...form, product: { id: e.target.value } })}>
        <option value="">Select Product</option>
        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <input placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
      <button onClick={handleSubmit}>{editId ? 'Update' : 'Create'}</button>

      <table>
        <thead><tr><th>ID</th><th>User</th><th>Product</th><th>Quantity</th><th>Actions</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.user?.name}</td>
              <td>{o.product?.name}</td>
              <td>{o.quantity}</td>
              <td>
                <button onClick={() => handleEdit(o)}>Edit</button>
                <button onClick={() => handleDelete(o.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}