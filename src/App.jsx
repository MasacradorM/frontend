import { useState } from 'react';
import Users from './components/Users';
import Products from './components/Products';
import Orders from './components/Orders';

export default function App() {
  const [tab, setTab] = useState('users');

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">DB Manager</div>
        <nav className="nav">
          <div className={`nav-item ${tab === 'users' ? 'active' : ''}`} onClick={() => setTab('users')}>
            <span className="nav-dot"></span> Users
          </div>
          <div className={`nav-item ${tab === 'products' ? 'active' : ''}`} onClick={() => setTab('products')}>
            <span className="nav-dot"></span> Products
          </div>
          <div className={`nav-item ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>
            <span className="nav-dot"></span> Orders
          </div>
        </nav>
      </aside>
      <main className="main">
        {tab === 'users' && <Users />}
        {tab === 'products' && <Products />}
        {tab === 'orders' && <Orders />}
      </main>
    </div>
  );
}