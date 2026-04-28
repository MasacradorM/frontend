import { useState } from 'react';
import Users from './components/Users';
import Products from './components/Products';
import Orders from './components/Orders';

export default function App() {
  const [tab, setTab] = useState('users');

  return (
    <div>
      <nav>
        <button onClick={() => setTab('users')}>Users</button>
        <button onClick={() => setTab('products')}>Products</button>
        <button onClick={() => setTab('orders')}>Orders</button>
      </nav>
      {tab === 'users' && <Users />}
      {tab === 'products' && <Products />}
      {tab === 'orders' && <Orders />}
    </div>
  );
}