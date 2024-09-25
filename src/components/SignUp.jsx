// import React,{useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/styles.css';
// import bankLogo from '../images/bank-i.jpg';
// import signUpImage from '../images/bank-c.jpg';
// import { auth,db } from '../firebase';
// import { setDoc,doc } from 'firebase/firestore';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// const SignUp = () => {
//     const navigate = useNavigate(); // Use for navigation

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [fname, setFname] = useState("");
//     const [lname, setLname] = useState("");
//     const [gender,setgender] = useState("");
//     const [age, Setage] = useState("");
  
//     const handleRegister = async(e) => {
//       e.preventDefault();
//       try {
//           await createUserWithEmailAndPassword(auth,email,password);
//           const user=auth.currentUser;
//           console.log(user);
//           if(user)
//           {
//               await setDoc(doc(db,"Users",user.uid),
//               {
//                   email: user.email,
//                   password: password,
//                   firstname: fname,
//                   lastname: lname,
//                   Age: age,
//               });
//           }
//           window.location.href='/home';
//       }
//       catch(error)
//       {
//           console.log(error.message);
//       }
//   }
  
//     return (
//       <div>
//         <header>
//           <div className="header-content">
//             <img src={bankLogo} alt="Bank Logo" className="logo" />
//             <h1 style={{ padding: '10px' }}>Welcome to Trst Banking</h1>
//           </div>
//         </header>
  
//         <section className="container" style={{ height: '900px' }}>
//           <div className="sign-up-box">
//             <div className="image-box">
//               <img src={signUpImage} alt="Sign Up Image" className="img-fluid" style={{ objectFit: 'fill' }} />
//             </div>
//             <div className="form-box">
//               <h2>Sign Up</h2>
//               <form onSubmit={handleRegister}>
//                 <div className="form-outline">
//                   <label htmlFor="firstName">First Name</label>
//                   <input type="text" id="firstName" className="form-control" onChange={(e) => setFname(e.target.value)}/>
//                 </div>
//                 <div className="form-outline">
//                   <label htmlFor="lastName">Last Name</label>
//                   <input type="text" id="lastName" className="form-control" onChange={(e) => setLname(e.target.value)}/>
//                 </div>
//                 <div className="form-outline">
//                   <label htmlFor="gender">Gender</label>
//                   <select id="gender" className="form-control">
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//                 <div className="form-outline">
//                   <label htmlFor="age">Age</label>
//                   <input type="number" id="age" className="form-control" onChange={(e) => Setage(e.target.value)}/>
//                 </div>
//                 <div className="form-outline">
//                   <label htmlFor="mailId">Mail ID</label>
//                   <input type="email" id="mailId" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
//                 </div>
//                 <div className="form-outline">
// <<<<<<< HEAD
//                   <label htmlFor="customerId">Create Your Password</label>
// =======
//                   <label htmlFor="customerId">Create Your Customer ID</label>
// >>>>>>> 9844357e83214f1f457aff9b664a8340512befb6
//                   <input type="text" id="customerId" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
//                 </div>
//                 <button type="submit" className="btn btn-primary">Sign Up</button>
//               </form>
//               <div className="switch">
//                 <p>Already have an account? <a href="/signin">Sign In Here</a></p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     );
//   };
  
//   export default SignUp;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import bankLogo from '../images/bank-i.jpg';
import signUpImage from '../images/bank-c.jpg';
import { auth, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const navigate = useNavigate(); // Use for navigation

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          password: password,
          firstname: fname,
          lastname: lname,
          Age: age,
        });
      }
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
          <h1 style={{ padding: '10px' }}>Welcome to Trst Banking</h1>
        </div>
      </header>

      <section className="container" style={{ height: '900px' }}>
        <div className="sign-up-box">
          <div className="image-box">
            <img src={signUpImage} alt="Sign Up Image" className="img-fluid" style={{ objectFit: 'fill' }} />
          </div>
          <div className="form-box">
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister}>
              <div className="form-outline">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="form-outline">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
              <div className="form-outline">
                <label htmlFor="gender">Gender</label>
                <select id="gender" className="form-control" onChange={(e) => setGender(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-outline">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  className="form-control"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
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
                <label htmlFor="password">Create Your Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
            <div className="switch">
              <p>Already have an account? <a href="/signin">Sign In Here</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
