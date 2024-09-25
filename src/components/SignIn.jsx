// // import React from 'react';
// // import '../styles/styles.css'; // Importing the CSS file
// // import bankLogo from '../images/bank-i.jpg'; // Importing the bank logo
// // import signInImage from '../images/bank-c.jpg'; // Importing the sign-in image

// // const SignIn = () => {
// //   const handleSignIn = (e) => {
// //     e.preventDefault();
// //     // Handle form submission logic here
// //     console.log("Sign in form submitted");
// //   };

// //   return (
// //     <div>
// //       <header>
// //         <div className="header-content">
// //           <img src={bankLogo} alt="Bank Logo" className="logo" />
// //           <h1 style={{ paddingTop: '12px' }}>Welcome to Trst Banking</h1>
// //         </div>
// //       </header>

// //       <section className="container">
// //         <div className="sign-in-box">
// //           <div className="image-box">
// //             <img src={signInImage} alt="Sign In Image" className="img-fluid" />
// //           </div>
// //           <div className="form-box">
// //             <h2>Sign In</h2>
// //             <form onSubmit={handleSignIn}>
// //               <div className="form-outline">
// //                 <label htmlFor="mailId">Mail ID</label>
// //                 <input type="email" id="mailId" className="form-control" />
// //               </div>
// //               <div className="form-outline">
// //                 <label htmlFor="customerId">Customer ID</label>
// //                 <input type="text" id="customerId" className="form-control" />
// //               </div>
// //               <button type="submit" className="btn btn-primary">Login</button>
// //             </form>
// //             <div className="switch">
// //               <p>Don't have an account? <a href="/signup">Sign Up Here</a></p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default SignIn;



// import React,{useState} from 'react';
// import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
// import '../styles/styles.css'; // Importing the CSS file
// import bankLogo from '../images/bank-i.jpg'; // Importing the bank logo
// import signInImage from '../images/bank-c.jpg'; // Importing the sign-in image
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';

// const SignIn = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");


//   const navigate = useNavigate(); // Hook to navigate

//   // const handleSignIn = (e) => {
//   //   e.preventDefault();
//   //   // Handle form submission logic here
//   //   console.log("Sign in form submitted");

//   //   // After successful login, navigate to Home
//   //   navigate('/home');
//   // };


//   const handleSubmit = async(e) => {
//     e.preventDefault();

//     try 
//     {
//       await signInWithEmailAndPassword(auth,email,password);
//       console.log("Login successfull!!");
//       window.location.href='/home';
//     }
//     catch(error)
//     {
//       console.log(error.message);
//     }
//   }

//   return (
//     <div>
//       <header>
//         <div className="header-content">
//           <img src={bankLogo} alt="Bank Logo" className="logo" />
//           <h1 style={{ paddingTop: '12px' }}>Welcome to Trst Banking</h1>
//         </div>
//       </header>

//       <section className="container">
//         <div className="sign-in-box">
//           <div className="image-box">
//             <img src={signInImage} alt="Sign In Image" className="img-fluid" />
//           </div>
//           <div className="form-box">
//             <h2>Sign In</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="form-outline">
//                 <label htmlFor="mailId">Mail ID</label>
//                 <input type="email" id="mailId" className="form-control" 
//                 onChange={(e) => setEmail(e.target.value)}/>
//               </div>
//               <div className="form-outline">
// <<<<<<< HEAD
//                 <label htmlFor="customerId">Enter Your Password</label>
// =======
//                 <label htmlFor="customerId">Customer ID</label>
// >>>>>>> 9844357e83214f1f457aff9b664a8340512befb6
//                 <input type="text" id="customerId" className="form-control" 
//                 onChange={(e) => setPassword(e.target.value)}/>
//               </div>
//               <button type="submit" className="btn btn-primary">Login</button>
//             </form>
//             <div className="switch">
//               <p>Don't have an account? <a href="/signup">Sign Up Here</a></p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SignIn;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../styles/styles.css'; // Importing the CSS file
import bankLogo from '../images/bank-i.jpg'; // Importing the bank logo
import signInImage from '../images/bank-c.jpg'; // Importing the sign-in image
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful!!");
      window.location.href = '/home';
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <header>
        <div className="header-content">
          <img src={bankLogo} alt="Bank Logo" className="logo" />
          <h1 style={{ paddingTop: '12px' }}>Welcome to Trst Banking</h1>
        </div>
      </header>

      <section className="container">
        <div className="sign-in-box">
          <div className="image-box">
            <img src={signInImage} alt="Sign In Image" className="img-fluid" />
          </div>
          <div className="form-box">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-outline">
                <label htmlFor="mailId">Mail ID</label>
                <input
                  type="email"
                  id="mailId"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-outline">
                <label htmlFor="password">Enter Your Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <div className="switch">
              <p>Don't have an account? <a href="/signup">Sign Up Here</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
