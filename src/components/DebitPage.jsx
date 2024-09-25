// import React, { useState, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'; 
// import { auth, db } from '../firebase'; // Adjust the path according to your project structure
// import '../styles/styles2.css';

// const DebitPage = ({ updateMonitoring }) => {
//   const [debitAmount, setDebitAmount] = useState('');
//   const [debitDescription, setDebitDescription] = useState('');
//   const [debitHistory, setDebitHistory] = useState([]);
//   const [userId, setUserId] = useState(null);

//   // Get user ID when user is logged in
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserId(user.uid);
//         fetchDebitHistory(user.uid);
//         // Optionally fetch existing debit history for the user here
//       } else {
//         setUserId(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);
//   const fetchDebitHistory = async (userId) => {
//     try {
//       const debitQuery = query(collection(db, 'debit'), where('userId', '==', userId));
//       const querySnapshot = await getDocs(debitQuery);
//       const history = querySnapshot.docs.map(doc => doc.data());
//       setDebitHistory(history);
//     } catch (error) {
//       console.error('Error fetching debit history: ', error);
//     }
//   };
    
//   // Function to add a debit
//   const addDebit = async () => {
//     if (debitAmount && debitDescription && userId) {
//       const newDebit = { 
//         amount: parseFloat(debitAmount), 
//         description: debitDescription, 
//         userId:userId, 
//         timestamp: new Date() 
//       };

//       try {
//         await addDoc(collection(db, 'debit'), newDebit); // Save under user's debits
//         setDebitHistory([...debitHistory, newDebit]);
//         updateMonitoring(debitDescription, parseFloat(debitAmount));
//         setDebitAmount('');
//         setDebitDescription('');
//       } catch (error) {
//         console.error('Error adding debit: ', error);
//       }
//     }
//   };
   
//   return (
//     <div>
//       <div className="header">
//         <h1>Debit Management</h1>
//       </div>
//       <div className="container">
//         <div className="input-section">
//           <input
//             type="number"
//             value={debitAmount}
//             onChange={(e) => setDebitAmount(e.target.value)}
//             placeholder="Enter Amount"
//           />
//           <select
//             value={debitDescription}
//             onChange={(e) => setDebitDescription(e.target.value)}
//           >
//             <option value="">Select Description</option>
//             <option value="Housing">Housing</option>
//             <option value="Food and Groceries">Food and Groceries</option>
//             <option value="Transportation">Transportation</option>
//             <option value="Entertainment">Entertainment</option>
//             <option value="Shopping">Shopping</option>
//             <option value="Money to Friends">Money to Friends</option>
//             <option value="Others">Others</option>
//           </select>
//           <button onClick={addDebit}>Submit</button>
//         </div>

//         <div className="history-section">
//           <h3>Debit History</h3>
//           <ul>
//             {debitHistory.map((item, index) => (
//               <li key={index}>
//                 Amount: ${item.amount}, Description: {item.description}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DebitPage;


import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'; 
import { auth, db } from '../firebase'; // Adjust the path according to your project structure
import '../styles/styles2.css';

const DebitPage = ({ updateMonitoring }) => {
  const [debitAmount, setDebitAmount] = useState('');
  const [debitDescription, setDebitDescription] = useState('');
  const [debitHistory, setDebitHistory] = useState([]);
  const [userId, setUserId] = useState(null);

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
      const history = querySnapshot.docs.map(doc => doc.data());
      setDebitHistory(history);
    } catch (error) {
      console.error('Error fetching debit history: ', error);
    }
  };
    
  // Function to add a debit
  const addDebit = async () => {
    if (debitAmount && debitDescription && userId) {
      const newDebit = { 
        amount: parseFloat(debitAmount), 
        description: debitDescription, 
        userId: userId, 
        timestamp: new Date() 
      };

      try {
        await addDoc(collection(db, 'debit'), newDebit); // Save under user's debits
        setDebitHistory([...debitHistory, newDebit]);
        updateMonitoring(debitDescription, parseFloat(debitAmount));
        setDebitAmount('');
        setDebitDescription('');
      } catch (error) {
        console.error('Error adding debit: ', error);
      }
    }
  };
   
  return (
    <div>
      <div className="header">
        <h1>Debit Management</h1>
      </div>
      <div className="container input-enabled"> {/* Add input-enabled class */}
        <div className="input-section">
          <input
            type="number"
            value={debitAmount}
            onChange={(e) => setDebitAmount(e.target.value)}
            placeholder="Enter Amount"
          />
          <select
            value={debitDescription}
            onChange={(e) => setDebitDescription(e.target.value)}
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
          <button onClick={addDebit}>Submit</button>
        </div>

        <div className="history-section">
          <h3>Debit History</h3>
          <ul>
            {debitHistory.map((item, index) => (
              <li key={index}>
                Amount: ${item.amount}, Description: {item.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DebitPage;
