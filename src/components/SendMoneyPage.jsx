import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import '../styles/styles2.css';

const SendMoneyPage = () => {
  const [sendAmount, setSendAmount] = useState('');
  const [sendMoneyHistory, setSendMoneyHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch send money history for the logged-in user
  const fetchSendMoneyHistory = async (userId) => {
    try {
      const sendQuery = query(collection(db, 'send'), where('userId', '==', userId));
      const querySnapshot = await getDocs(sendQuery);
      const history = querySnapshot.docs.map((doc) => doc.data());
      setSendMoneyHistory(history);
    } catch (error) {
      console.error('Error fetching send money history: ', error);
    }
  };

  // Fetch customers to match with email input
  const fetchCustomers = async () => {
    try {
      const customersQuery = collection(db, 'Users'); // Assuming you have a 'Users' collection
      const querySnapshot = await getDocs(customersQuery);
      const customerList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customerList);
    } catch (error) {
      console.error('Error fetching customers: ', error);
    }
  };

  // Get user ID and fetch their send money history when user logs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchSendMoneyHistory(user.uid);
      } else {
        setUserId(null);
        setSendMoneyHistory([]);
      }
    });

    // Fetch customers list
    fetchCustomers();

    return () => unsubscribe();
  }, []);

  // Function to send money
  const sendMoney = async () => {
    const customer = customers.find(cust => cust.email === customerEmail);
    if (sendAmount && customer && userId) {
      const newTransaction = {
        amount: parseFloat(sendAmount),
        customerID: customer.id, // Using customerID from the matched customer
        userId,
        timestamp: new Date(),
      };

      try {
        await addDoc(collection(db, 'send'), newTransaction);
        setSendMoneyHistory([...sendMoneyHistory, newTransaction]);
        setSendAmount(''); // Reset amount input
        setCustomerEmail(''); // Reset customer email input
      } catch (error) {
        console.error('Error sending money: ', error);
      }
    } else {
      console.error('Error: Customer not found or missing data.');
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Send Money</h1>
      </div>
      <div className="container input-enabled"> {/* Add input-enabled class */}
        <div className="input-section">
          <input
            type="number"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
            placeholder="Enter Amount"
          />
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="Enter Customer Email"
          />
          <button onClick={sendMoney}>Submit</button>
        </div>

        <div className="history-section">
          <h3>Send Money History</h3>
          <ul>
            {sendMoneyHistory.map((item, index) => (
              <li key={index}>
                Amount: ${item.amount}, Customer ID: {item.customerID}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyPage;
