import { useState, useEffect, useCallback } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '' });
  const [editId, setEditId] = useState(null);

  const fetchProducts = useCallback(async () => {
    const res = await getProducts();
    setProducts(res.data);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleSubmit = async () => {
    if (!form.name || !form.price) return;
    if (editId) {
      await updateProduct(editId, form);
      setEditId(null);
    } else {
      await createProduct(form);
    }
    setForm({ name: '', price: '' });
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setForm({ name: product.name, price: product.price });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div>
      <div className="header">
        <h2>Products</h2>
        <p>Manage all products in the database</p>
      </div>
      <div className="form-card">
        <div className="field">
          <label>Name</label>
          <input placeholder="Product name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="field">
          <label>Price</label>
          <input placeholder="0.00" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        </div>
        <button className="btn" onClick={handleSubmit}>{editId ? 'Update' : 'Create'}</button>
        {editId && <button className="btn-secondary" onClick={() => { setEditId(null); setForm({ name: '', price: '' }); }}>Cancel</button>}
      </div>
      <div className="table-card">
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Actions</th></tr></thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="4" className="empty">No products found</td></tr>
            ) : products.map(p => (
              <tr key={p.id}>
                <td><span className="badge">#{p.id}</span></td>
                <td>{p.name}</td>
                <td>${Number(p.price).toFixed(2)}</td>
                <td><div className="actions">
                  <button className="btn-sm" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}