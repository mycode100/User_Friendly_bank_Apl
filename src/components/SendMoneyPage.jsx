import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/send.css';

const SendMoneyPage = () => {
  const [sendAmount, setSendAmount] = useState('');
  const [sendMoneyHistory, setSendMoneyHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [customerEmail, setCustomerEmail] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

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
        Swal.fire({
          icon: 'success',
          title: 'Transaction Successful',
          text: 'Money sent successfully!',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.error('Error sending money: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Transaction Failed',
          text: 'There was an error sending money.',
          confirmButtonText: 'OK',
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Input Error',
        text: 'Please fill in all fields correctly.',
        confirmButtonText: 'OK',
      });
    }
  };

  const Header = ({ onBack }) => {
    return (
      <div className="header">
        <h1>Send Money</h1>
        <button
          className="name_send" // Keep class name consistent with DebitPage
          onClick={onBack}
          style={{
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 15px',
            cursor: 'pointer',
            float: 'right',
            marginTop: '10px'
          }}
        >
          Back to Home
        </button>
      </div>
    );
  };

  return (
    <div className="container debit-container"> {/* Added debit-container class */}
      <Header onBack={() => navigate('/home')} /> {/* Navigation function to go back */}
        <br />
        <br />
      <div className="input-section">
        <input
          type="number"
          value={sendAmount}
          onChange={(e) => setSendAmount(e.target.value)}
          placeholder="Enter Amount"
          className="amount-input" // Keep class name consistent with DebitPage
        />
        <input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="Enter Customer Email"
          className="email-input" // New class for styling
        />
      </div>
      <div className="submit-section">
        <button className="submit-button" onClick={sendMoney}>Submit</button>
      </div>
      <div className="history-section">
        <h3>Send Money History</h3>
        <ul className="history-list">
          {sendMoneyHistory.map((item, index) => (
            <li key={index}>
              Amount: ${item.amount}, Customer ID: {item.customerID}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SendMoneyPage;
