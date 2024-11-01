import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/credit.css';
import { useNavigate } from 'react-router-dom';

// Header Component
const Header = ({ onBack }) => {
  return (
    <div className="header">
      <h1>Credit History</h1>
      <button 
          className="name_cred" 
          onClick={onBack}
          style={{
              backgroundColor: '#333', // Dark background color
              color: 'white', // Text color
              border: 'none', // No border
              borderRadius: '5px', // Rounded corners
              padding: '10px 15px', // Padding for the button
              cursor: 'pointer', // Pointer cursor on hover
              float: 'right', // Align to the right
              marginTop: '10px' // Spacing from the top
          }}
          onMouseEnter={(e) => {
              e.currentTarget.style.backgroundImage = 'linear-gradient(to right, #555, #777)'; // Gradient on hover
          }}
          onMouseLeave={(e) => {
              e.currentTarget.style.backgroundImage = 'none'; // Remove gradient on mouse leave
          }}
      >
          Back to Home Page
      </button>
    </div>
  );
};

// Main CreditPage Component
const CreditPage = () => {
  const [creditHistory, setCreditHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Function to navigate back to the home page
  const handleBackToHomePage = () => {
      navigate('/home'); // Adjust the path based on your routing setup
  };

  // Fetch credit history for the given userId
  const fetchCreditHistory = async (userId) => {
    try {
      const creditQuery = query(collection(db, 'send'), where('customerID', '==', userId));
      const querySnapshot = await getDocs(creditQuery);
      const history = querySnapshot.docs.map((doc) => doc.data());
      setCreditHistory(history);
    } catch (error) {
      console.error('Error fetching credit history: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchCreditHistory(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Header onBack={handleBackToHomePage} /> {/* Using the Header component */}
      <div className="container">
        <div className="history-section">
          <h3>Your Credit History</h3>
          <ul>
            {creditHistory.length > 0 ? (
              creditHistory.map((item, index) => (
                <li key={index}>
                  Customer ID: {item.customerID}, Amount: ${item.amount}, Description: {item.description}, Timestamp: {item.timestamp.toDate().toString()}
                </li>
              ))
            ) : (
              <p>No credit history available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreditPage;
