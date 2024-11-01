import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'; 
import { auth, db } from '../firebase'; // Adjust the path according to your project structure
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/debit.css';
import Swal from 'sweetalert2';

const DebitPage = ({ updateMonitoring }) => {
  const [debitAmount, setDebitAmount] = useState('');
  const [debitDescription, setDebitDescription] = useState('');
  const [debitHistory, setDebitHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Define navigate using useNavigate

  // Get user ID when user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchDebitHistory(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchDebitHistory = async (userId) => {
    try {
      const debitQuery = query(collection(db, 'debit'), where('userId', '==', userId));
      const querySnapshot = await getDocs(debitQuery);
      const history = querySnapshot.docs.map(doc => ({ 
        ...doc.data(), 
        id: doc.id,
        timestamp: doc.data().timestamp.toDate() // Convert Firestore timestamp to JavaScript Date
      }));
      setDebitHistory(history);
    } catch (error) {
      console.error('Error fetching debit history: ', error);
    }
  };

  // Function to show success alert
  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Debit Added',
      text: 'Money debited successfully!',
      confirmButtonText: 'OK',
    });
  };

  // Function to show server error alert
  const showServerErrorAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'There was a problem adding your debit.',
      confirmButtonText: 'OK',
    });
  };

  // Function to add a debit
  const addDebit = async () => {
    if (debitAmount && debitDescription && userId) {
      const newDebit = { 
        amount: parseFloat(debitAmount), 
        description: debitDescription, 
        userId: userId, 
        timestamp: new Date() // Store as a JavaScript Date
      };

      try {
        // Save under user's debits in Firestore
        await addDoc(collection(db, 'debit'), newDebit);
        
        // Fetch updated debit history
        fetchDebitHistory(userId);

        // Show success alert after adding the debit
        showSuccessAlert();

        // Reset input fields
        setDebitAmount('');
        setDebitDescription('');
      } catch (error) {
        console.error('Error adding debit: ', error);
        showServerErrorAlert(); // Show server error alert
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Input Error',
        text: 'Please fill in all fields.',
        confirmButtonText: 'OK',
      });
    }
  };

  const Header = ({ onBack }) => {
    return (
      <div className="header">
        <h1>Debit Management</h1>
        <button 
          className="name_debit" 
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
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundImage = 'linear-gradient(to right, #555, #777)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundImage = 'none';
          }}
        >
          Back to Home Page
        </button>
      </div>
    );
  };

  return (
    <div>
      <Header onBack={() => navigate('/home')} /> {/* Navigation function to go back */}
      <div className="container debit-container">
        <div className="input-section">
          <input
            type="number"
            value={debitAmount}
            onChange={(e) => setDebitAmount(e.target.value)}
            placeholder="Enter Amount"
            className="amount-input" // Specific class for styling
          />
          <select
            value={debitDescription}
            onChange={(e) => setDebitDescription(e.target.value)}
            className="description-select" // Specific class for styling
          >
            <option value="">Select Description</option>
            <option value="Housing">Housing</option>
            <option value="Food and Groceries">Food and Groceries</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Money to Friends">Money to Friends</option>
            <option value="Others">Others</option>
          </select>
        </div>
        
        <div className="submit-section">
          <button className="submit-button" onClick={addDebit}>Submit</button>
        </div>

        <div className="history-section">
          <h3>Debit History</h3>
          <ul className="history-list">
            {debitHistory.map((item, index) => (
              <li key={index}>
                Amount: ${item.amount}, Description: {item.description}, Timestamp: {item.timestamp.toString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DebitPage;
