import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';  // Ensure these imports are correct
import { collection, getDocs, query, where } from 'firebase/firestore';  // Use Firestore imports
import { useNavigate } from 'react-router-dom';
import '../styles/styles3.css';

const Header = ({ onBack }) => (
  <div className="header">
    <h1>Expense Monitoring</h1>
    <button
      className="name_send"
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

const MonitorPage = () => {
  const [categorySpent, setCategorySpent] = useState({
    Housing: 0,
    'Food and Groceries': 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    'Money from Friends': 0,
    'Money to Friends': 0,
    Others: 0,
    'Sent Money': 0,
  });
  const navigate = useNavigate();
  const totalSpent = Object.values(categorySpent).reduce((acc, curr) => acc + curr, 0);

  const fetchMonitoringData = async (userId) => {
    try {
      // Fetch credits and debits and group by category
      const creditQuery = query(collection(db, 'send'), where('customerID', '==', userId));
      const creditSnapshot = await getDocs(creditQuery);
      const totalMoneyFromFriends = creditSnapshot.docs.reduce((acc, doc) => acc + doc.data().amount, 0);

      const sendQuery = query(collection(db, 'send'), where('userId', '==', userId));
      const sendSnapshot = await getDocs(sendQuery);
      const totalMoneyToFriends = sendSnapshot.docs.reduce((acc, doc) => acc + doc.data().amount, 0);

      const debitQuery = query(collection(db, 'debit'), where('userId', '==', userId));
      const debitSnapshot = await getDocs(debitQuery);
      const categoryTotals = debitSnapshot.docs.reduce((acc, doc) => {
        const data = doc.data();
        const description = data.description || 'Others';
        acc[description] = (acc[description] || 0) + data.amount;
        return acc;
      }, {});

      setCategorySpent((prevState) => ({
        ...prevState,
        ...categoryTotals,
        'Money from Friends': totalMoneyFromFriends,
        'Money to Friends': totalMoneyToFriends,
        'Sent Money': totalMoneyToFriends,
      }));
    } catch (error) {
      console.error('Error fetching monitoring data: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchMonitoringData(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const getPointerAngle = () => {
    if (totalSpent < 60000) return (totalSpent / 60000) * 90;
    else if (totalSpent < 110000) return 90 + ((totalSpent - 60000) / 50000) * 45;
    else return 135 + ((totalSpent - 110000) / 40000) * 45;
  };

  return (
    <div>
      <Header onBack={() => navigate('/home')} />
      <div className="monitoring-container">
        {Object.keys(categorySpent).map((category) => (
          <div key={category} className="box">
            {category}: ${categorySpent[category].toFixed(2)}
          </div>
        ))}
      </div>
      <div className="speedometer">
        <svg viewBox="0 0 200 100" className="speedometer-svg">
          <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="lightgray" strokeWidth="15" />
          <path d="M 10 100 A 90 90 0 0 1 100 10" fill="none" stroke="green" strokeWidth="15" />
          <path d="M 100 10 A 90 90 0 0 1 160 100" fill="none" stroke="yellow" strokeWidth="15" />
          <path d="M 160 100 A 90 90 0 0 1 190 100" fill="none" stroke="red" strokeWidth="15" />
          <line
            x1="100"
            y1="100"
            x2={100 + 80 * Math.cos((getPointerAngle() - 90) * (Math.PI / 180))}
            y2={100 + 80 * Math.sin((getPointerAngle() - 90) * (Math.PI / 180))}
            stroke="black"
            strokeWidth="4"
            className="pointer"
          />
        </svg>
        <div className="spend-amount">Total Spent: ${totalSpent.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default MonitorPage;
