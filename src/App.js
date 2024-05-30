import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModelsClient from '@ably-labs/models';
import { Realtime } from 'ably';


function App() {
  const [orderbook, setOrderbook] = useState({ asks: [], bids: [] });

  const fetchOrderbook = async () => {
    try {
      const response = await axios.get('http://localhost:3000/orderbook');
      setOrderbook(response.data);
    } catch (error) {
      console.error('Error fetching order book:', error);
    }
  };

  const initializeOrderbook = async () => {
    try {
      await axios.get('http://localhost:3000/initialize');
      fetchOrderbook();
    } catch (error) {
      console.error('Error initializing order book:', error);
    }
  };

  useEffect(() => {
    fetchOrderbook();
  }, []);

  return (
    <div className="App">
      <h1>Order Book</h1>
      <button onClick={initializeOrderbook}>Initialize Order Book</button>
      <h2>Asks</h2>
      <ul>
        {orderbook.asks.map((ask, index) => (
          <li key={index}>
            Price: {ask.price}, Amount: {ask.amount}
          </li>
        ))}
      </ul>
      <h2>Bids</h2>
      <ul>
        {orderbook.bids.map((bid, index) => (
          <li key={index}>
            Price: {bid.price}, Amount: {bid.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
