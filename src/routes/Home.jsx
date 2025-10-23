import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar.jsx';
import Customers from '../components/Customers';
import Products from '../components/Products';
import { apolloClient } from '../services/apollo';
import { GET_ORDERS, DELETE_ORDER } from '../graphql/queries';

const Home = () => {
  const [feature, setFeature] = useState('Home');
  const [orders, setOrders] = useState([]);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await apolloClient.query({
          query: GET_ORDERS,
        });
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Delete order handler
  const handleDeleteOrder = async (orderId) => {
    try {
      await apolloClient.mutate({
        mutation: DELETE_ORDER,
        variables: { id: parseInt(orderId) },
      });
      // Remove the order from the local state
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className='flex h-full w-full flex-col'>
      <Navbar setFeature={setFeature} />
      {feature === 'Home' && (
        <div>
          <h1 className='text-4xl'>Home</h1>
          {orders.map((order) => (
            <div key={order.id} className='mb-4 rounded border p-4 flex justify-between items-center'>
              <div>
                <h2 className='text-2xl'>Order ID: {order.id}</h2>
                <p>Status: {order.status}</p>
                <p>Total: ${order.total}</p>
              </div>
              <button
                aria-label={`Delete order ${order.id}`}
                onClick={() => handleDeleteOrder(order.id)}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
      {feature === 'Customers' && <Customers />}
      {feature === 'Products' && <Products />}
    </div>
  );
};

export default Home;
