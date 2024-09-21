// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignUp from './components/SignUp';
// import SignIn from './components/SignIn';
// import Home from './components/Home';
// import CreditPage from './components/CreditPage';
// import DebitPage from './components/DebitPage';
// import SendMoneyPage from './components/SendMoneyPage';
// import MonitorPage from './components/MonitorPage';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React from 'react';
// import CreditPage from './components/CreditPage'
// import DebitPage from './components/DebitPage';
// import SendMoneyPage from './components/SendMoneyPage';
// import MonitorPage from './components/MonitorPage';

// const App = () => {
//   const monitorRef = React.useRef();

//   const updateMonitoring = (description, amount) => {
//     if (monitorRef.current) {
//       monitorRef.current.updateMonitoring(description, amount);
//     }
//   };

//   return (
//     <div>
//       <CreditPage />
//       <DebitPage updateMonitoring={updateMonitoring} />
//       <SendMoneyPage updateMonitoring={updateMonitoring} />
//       <MonitorPage ref={monitorRef} />
//     </div>
//   );
// };

// export default App;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignUp from './components/SignUp';
// import SignIn from './components/SignIn';
// import Home from './components/Home';
// import CreditPage from './components/CreditPage';
// import DebitPage from './components/DebitPage';
// import SendMoneyPage from './components/SendMoneyPage';
// import MonitorPage from './components/MonitorPage';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<SignUp />} /> {/* Default route to SignUp */}
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/credit" element={<CreditPage />} />
//         <Route path="/debit" element={<DebitPage />} />
//         <Route path="/sendmoney" element={<SendMoneyPage />} />
//         <Route path="/monitoring" element={<MonitorPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import CreditPage from './components/CreditPage';
import DebitPage from './components/DebitPage';
import SendMoneyPage from './components/SendMoneyPage';
import MonitorPage from './components/MonitorPage';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
    <Route path="/" element={<SignUp />} />  {/* Default route to SignUp */}
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/home" element={<Home />} />
    <Route path="/credit" element={<CreditPage />} />
    <Route path="/debit" element={<DebitPage />} />
    <Route path="/sendmoney" element={<SendMoneyPage />} />
    <Route path="/monitor" element={<MonitorPage />} />
</Routes>

    </Router>
  );
}

export default App;

