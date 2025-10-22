import { React, useState } from 'react';
import Navbar from '@/components/Navbar.jsx';
import Customers from '../components/Customers';
import Products from '../components/Products';

const Home = () => {
  const [feature, setFeature] = useState('Home');

  return (
    <div className='flex h-full w-full flex-col'>
      <Navbar setFeature={setFeature} />
      {feature === 'Home' && (
        <div>
          <h1 className='text-4xl'>Home</h1>
        </div>
      )}
      {feature === 'Customers' && <Customers />}
      {feature === 'Products' && <Products />}
    </div>
  );
};

export default Home;
