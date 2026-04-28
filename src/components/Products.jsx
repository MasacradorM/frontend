import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const handleSubmit = async () => {
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
      <h2>Products</h2>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
      <button onClick={handleSubmit}>{editId ? 'Update' : 'Create'}</button>

      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.name}</td><td>{p.price}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}