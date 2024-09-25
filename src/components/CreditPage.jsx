// import React, { useState, useEffect } from 'react';
// import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
// import { auth, db } from '../firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import { Timestamp } from 'firebase/firestore';
// import '../styles/styles2.css';

// const CreditPage = () => {
//   const [creditAmount, setCreditAmount] = useState('');
//   const [creditDescription, setCreditDescription] = useState('');
//   const [customerID, setCustomerID] = useState('');
//   const [creditHistory, setCreditHistory] = useState([]);
//   const [userId, setUserId] = useState(null);

//   // Fetch credit history for the given userId
//   const fetchCreditHistory = async (userId) => {
//     try {
//       const creditQuery = query(collection(db, 'send'), where('customerID', '==', userId));
//       const querySnapshot = await getDocs(creditQuery);
//       const history = querySnapshot.docs.map((doc) => doc.data());
//       setCreditHistory(history);
//     } catch (error) {
//       console.error('Error fetching credit history: ', error);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserId(user.uid);
//         fetchCreditHistory(user.uid);
//       } else {
//         setUserId(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // Function to add credit to Firebase
//   const addCredit = async () => {
//     if (creditAmount && creditDescription && customerID && userId) {
//       const newCredit = {
//         amount: parseFloat(creditAmount),
//         customerID: customerID,
//         userId: userId,
//         timestamp: Timestamp.now(), // Using Firebase Timestamp for current time
//       };

//       try {
//         await addDoc(collection(db, 'send'), newCredit);
//         // Fetch the latest credit history after adding a new credit
//         fetchCreditHistory(userId);
//         setCreditAmount('');
//         setCreditDescription('');
//         setCustomerID('');
//       } catch (error) {
//         console.error('Error adding credit: ', error);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="header">
// <<<<<<< HEAD
//         <h1>Credit History</h1>
//       </div>
//       <div className="container">
//         {/* <div className="input-section">
// =======
//         <h1>Credit Management</h1>
//       </div>
//       <div className="container">
//         <div className="input-section">
// >>>>>>> 9844357e83214f1f457aff9b664a8340512befb6
//           <input
//             type="text"
//             value={customerID}
//             onChange={(e) => setCustomerID(e.target.value)}
//             placeholder="Enter Customer ID"
//           />
//           <input
//             type="number"
//             value={creditAmount}
//             onChange={(e) => setCreditAmount(e.target.value)}
//             placeholder="Enter Amount"
//           />
//           <select
//             value={creditDescription}
//             onChange={(e) => setCreditDescription(e.target.value)}
//           >
//             <option value="">Select Description</option>
//             <option value="Housing">Housing</option>
//             <option value="Food and Groceries">Food and Groceries</option>
//             <option value="Transportation">Transportation</option>
//             <option value="Entertainment">Entertainment</option>
//             <option value="Shopping">Shopping</option>
//             <option value="Money from Friends">Money from Friends</option>
//             <option value="Others">Others</option>
//           </select>
//           <button onClick={addCredit}>Submit</button>
// <<<<<<< HEAD
//         </div> */}
// =======
//         </div>
// >>>>>>> 9844357e83214f1f457aff9b664a8340512befb6

//         <div className="history-section">
//           <h3>Credit History</h3>
//           <ul>
//             {creditHistory.map((item, index) => (
//               <li key={index}>
//                 Customer ID: {item.customerID}, Amount: ${item.amount}, Description: {item.description}, Timestamp: {item.timestamp.toDate().toString()}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreditPage;


import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/styles2.css';

const CreditPage = () => {
  const [creditHistory, setCreditHistory] = useState([]);
  const [userId, setUserId] = useState(null);

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
      <div className="header">
        <h1>Credit History</h1>
      </div>
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
