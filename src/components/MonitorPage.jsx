// import React, { useState } from 'react';
// import '../styles/styles3.css';
// const MonitorPage = () => {
//   const [categorySpent, setCategorySpent] = useState({
//     Housing: 0,
//     'Food and Groceries': 0,
//     Transportation: 0,
//     Entertainment: 0,
//     Shopping: 0,
//     'Money from Friends': 0,
//     'Money to Friends': 0,
//     Others: 0,
//     'Sent Money': 0,
//   });


//   return (
//     <div>
//       <div className="header">
//         <h1>Expense Monitoring</h1>
//       </div>
//       <div className="monitoring-container">
//         {Object.keys(categorySpent).map((category) => (
//           <div key={category} className="box">
//             {category}: ${categorySpent[category]}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MonitorPage;

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import '../styles/styles3.css';

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
  const [userId, setUserId] = useState(null);

  // Fetch data for "Money from Friends", "Money to Friends", "Sent Money" and debit categories
  const fetchMonitoringData = async (userId) => {
    try {
      // Fetch credits (Money from Friends)
      const creditQuery = query(collection(db, 'send'), where('customerID', '==', userId));
      const creditSnapshot = await getDocs(creditQuery);
      const totalMoneyFromFriends = creditSnapshot.docs.reduce((acc, doc) => acc + doc.data().amount, 0);

      // Fetch sent money (Money to Friends and Sent Money)
      const sendQuery = query(collection(db, 'send'), where('userId', '==', userId));
      const sendSnapshot = await getDocs(sendQuery);
      const totalMoneyToFriends = sendSnapshot.docs.reduce((acc, doc) => acc + doc.data().amount, 0);

      // Fetch debit history to categorize by description (Housing, Food, etc.)
      const debitQuery = query(collection(db, 'debit'), where('userId', '==', userId));
      const debitSnapshot = await getDocs(debitQuery);

      // Group debit history by description and sum the amounts
      const categoryTotals = debitSnapshot.docs.reduce((acc, doc) => {
        const data = doc.data();
        const description = data.description || 'Others';  // Default to "Others" if no description is provided
        acc[description] = (acc[description] || 0) + data.amount;
        return acc;
      }, {});

      // Update the state with the fetched data
      setCategorySpent((prevState) => ({
        ...prevState,
        ...categoryTotals,  // Update the debit category totals
        'Money from Friends': totalMoneyFromFriends,
        'Money to Friends': totalMoneyToFriends,
        'Sent Money': totalMoneyToFriends,  // Assuming Sent Money = Money to Friends
      }));
    } catch (error) {
      console.error('Error fetching monitoring data: ', error);
    }
  };

  // Monitor user authentication and fetch data when user logs in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchMonitoringData(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Expense Monitoring</h1>
      </div>
      <div className="monitoring-container">
        {Object.keys(categorySpent).map((category) => (
          <div key={category} className="box">
            {category}: ${categorySpent[category].toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonitorPage;
