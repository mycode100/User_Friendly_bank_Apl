import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import bankLogo from '../images/bank-i.jpg';
import { auth, db } from '../firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import m1 from '../images/m2.jpg';
import m2 from '../images/m1.jpg';
import m3 from '../images/m3.jpg';
import '../styles/signup.css';
import sec from '../images/sec.webp';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => setShowPopup(false);

  const handleContinue = () => {
    setShowPopup(false);
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [m1, m2, m3];

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handlePasswordFocus = () => setShowPasswordRules(true);
  const handlePasswordBlur = () => setShowPasswordRules(false);
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const isValid =
      value.length >= 8 &&
      /[a-z]/.test(value) &&
      /[A-Z]/.test(value) &&
      /\d/.test(value) &&
      /[!@#$%^&*]/.test(value);

    setPasswordValid(isValid);
  };

  const checkDuplicateEmail = async (email) => {
    const docRef = doc(db, "Users", email);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // if (!email || !password || !fname || !lname || !age || !gender) {
    //   Swal.fire({
    //     title: "Error!",
    //     text: "All fields are required.",
    //     icon: "error",
    //     animation: true,
    //   });
    //   return;
    // }
    if (!isEmailValid(email)) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid email.",
        icon: "error",
        animation: true,
      });
      return;
    }
    if (await checkDuplicateEmail(email)) {
      Swal.fire({
        title: "Error!",
        text: "An account with this email already exists.",
        icon: "error",
        animation: true,
      });
      return;
    }
    if (Number(age) < 18) {
      Swal.fire({
        title: "Error!",
        text: "You must be at least 18 years old to register.",
        icon: "error",
        animation: true,
      });
      return;
    }
    if (!passwordValid) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid password.",
        icon: "error",
        animation: true,
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          password: password,
          firstname: fname,
          lastname: lname,
          age: age,
          gender: gender,
        });

        Swal.fire({
          title: "Account Created!",
          text: "Welcome to Trst Banking! Press OK to proceed to your banking dashboard.",
          icon: "success",
          animation: true,
        }).then(() => {
          navigate("/home"); // Navigate to home after successful registration
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred. Please try again.",
        icon: "error",
        animation: true,
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
     {showPopup && (
  <div className="popup_signup">
    <button className="popup-close_signup" onClick={handleClosePopup}>X</button>
    <div className="popup-content_signup">
      <img src={bankLogo} alt="Bank Logo" className="popup-image_signup" />
      <div className="popup-text_signup">
        <p style={{color:'black'}}>Welcome to Trst Banking..Again!</p>
        
        <p>Thank you for choosing your banking partner as us.</p>
        <p>If you already have an account, please sign in.</p>
        <div className="popup-buttons_signup">
          <button onClick={handleSignIn} className="popup-signin-btn_signup">Sign In</button>
          <button onClick={handleContinue} className="popup-continue-btn_signup">Continue</button>
        </div>
      </div>
    </div>
  </div>
)}




  {/* Header */}
  <header className="header-content">
    <div className="header-left">
      <img src={bankLogo} alt="Bank Logo" className="logo" />
      <h1>Welcome to Trst Banking</h1>
    </div>
    <div className='header-right' style={{ justifyContent: 'right' }}>
      <nav className="nav-menu">
        <div className="dropdown">
          <button className="dropbtn">Banking</button>
          <div className="dropdown-content">
            <a href="#">Account Types</a>
            <a href="#">Loan Options</a>
            <a href="#">Savings Plans</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Security</button>
          <div className="dropdown-content">
            <a href="#">Fraud Protection</a>
            <a href="#">Account Security Tips</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Login</button>
          <div className="dropdown-content">
            <a href="#">Forgot Password</a>
            <a href="#">Two-Factor Authentication</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Investments</button>
          <div className="dropdown-content">
            <a href="#">Mutual Funds</a>
            <a href="#">Stock Trading</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Customer Support</button>
          <div className="dropdown-content">
            <a href="#">FAQs</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </nav>
    </div>
  </header>
  {/* Welcome Section */}
  <section className="welcome-section">
    <h2>Welcome to Trst Banking!</h2>
    <p className="subtitle">Become part of legacy banking services.</p>
    {/* Information Blocks */}
  </section>

  {/* Main Divisions */}
  <section className="main-division">
    {/* Image Slider */}
    <div className="slider-container">
      <div className="image-slider">
        <div className="slides" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div className="slide" key={index}>
              <img src={image} height={750} style={{ maxHeight: "650px" }} className='slide-name' alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Sign-Up Form */}
    <div className="form-box">
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister}>
        <div className="form-outline">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" className="form-control" onChange={(e) => setFname(e.target.value)} />
        </div>
        <div className="form-outline">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" className="form-control" onChange={(e) => setLname(e.target.value)} />
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
          <input type="number" id="age" className="form-control" onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className="form-outline">
          <label htmlFor="mailId">Mail ID</label>
          <input type="email" id="mailId" className="form-control" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-outline">
          <label htmlFor="password">Create Your Password</label>
          <input
            type="password"
            id="password"
            className={`form-control ${passwordValid ? 'valid' : 'invalid'}`}
            onChange={handlePasswordChange}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
          />
          {showPasswordRules && (
            <div className="password-rules">
              <p className={password.length >= 8 ? 'valid' : 'invalid'}># At least 8 characters</p>
              <p className={/[A-Z]/.test(password) ? 'valid' : 'invalid'}># At least one uppercase letter</p>
              <p className={/[a-z]/.test(password) ? 'valid' : 'invalid'}># At least one lowercase letter</p>
              <p className={/\d/.test(password) ? 'valid' : 'invalid'}># At least one number</p>
              <p className={/[!@#$%^&*]/.test(password) ? 'valid' : 'invalid'}># At least one special character</p>
            </div>
          )}
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
      <div className="switch">
        <p>Already have an account? <a href="/signin">Sign In Here</a></p>
      </div>
    </div>
  </section>

  {/* Why Choose Us Section */}
  <section className="features-section">
    <h2>Why Choose Us?</h2>
    <br />
    <div className="features-container">
      <div className="feature feature-one">
        <h3>Secure Banking</h3>
        <p>Your safety is our priority. We use advanced encryption and security protocols to keep your data secure.</p>
      </div>
      <div className="feature feature-two">
        <h3>24/7 Support</h3>
        <p>Get assistance whenever you need it. Our dedicated support team is available around the clock.</p>
      </div>
      <div className="feature feature-three">
        <h3>Easy Transactions</h3>
        <p>Experience seamless transactions with our user-friendly platform, designed for efficiency and ease.</p>
      </div>
      <div className="feature feature-four">
        <h3>Competitive Rates</h3>
        <p>We offer competitive interest rates on savings and loans, helping you maximize your financial growth.</p>
      </div>
      <div className="feature feature-five">
        <h3>Mobile Banking</h3>
        <p>Access your account anytime, anywhere with our fully functional mobile app, designed for your convenience.</p>
      </div>
      <div className="feature feature-six">
        <h3>Personalized Services</h3>
        <p>Receive tailored financial advice and services to meet your unique banking needs and goals.</p>
      </div>
      <div className="feature feature-seven">
        <h3>Rewards Program</h3>
        <p>Join our rewards program to earn points for every transaction, redeemable for exciting benefits.</p>
      </div>
      <div className="feature feature-eight">
        <h3>Easy Account Management</h3>
        <p>Manage your accounts effortlessly with our intuitive online dashboard that puts you in control.</p>
      </div>
    </div>
  </section>

  {/* Security Information Section */}
  <section className="security-tips-section">
  <h2>Security Information</h2>
  <div className="security-tips-container">
    <p>
      <strong>Beware of Phishing Scams:</strong> Remember that phishing scams can take many forms, including emails, texts, or phone calls. Never share your login details, and always verify the source before clicking on links or opening attachments. Our bank will never ask for your password via email or direct message.
    </p>
    <p>
      <strong>Use Strong Passwords:</strong> Create complex passwords that are difficult to guess. Use a mix of uppercase and lowercase letters, numbers, and special characters. Change your passwords regularly and avoid using the same password across multiple accounts.
    </p>
    <p>
      <strong>Enable Two-Factor Authentication:</strong> For an added layer of security, enable two-factor authentication (2FA) on your account. This requires a second form of verification in addition to your password, making it more challenging for unauthorized users to access your account.
    </p>
    <p>
      <strong>Monitor Your Account:</strong> Regularly check your account statements and transaction history for any unauthorized activity. If you notice any discrepancies, report them to our customer support immediately.
    </p>
    <img 
  src={sec} 
  alt="Security Tips" 
  className="security-image" 
  style={{ 
    maxWidth: '500px', 
    maxHeight: '500px', 
    width: 'auto', 
    height: 'auto', 
    marginLeft: 'auto', 
    marginRight: 'auto', 
    display: 'block' 
  }} 
/>


  </div>
</section>

{/* Customer Support Section */}
<section className="customer-support-section">
  <h2>Help & Customer Support</h2>
  <p>If you have any questions or need assistance, our dedicated customer support team is here to help. Reach out to us through the following channels:</p>
  <ul>
    <li><strong>Email:</strong> support@trstbanking.com</li>
    <li><strong>Phone:</strong> 1-800-TRST-BNK (1-800-878-8265)</li>
    <li><strong>Live Chat:</strong> Available on our website from 8 AM to 10 PM EST</li>
  </ul>
  <p>We’re committed to providing you with the best service possible and are here to address any concerns you may have.</p>
</section>


  <footer>
    <p>&copy; 2024 Trst Banking. All Rights Reserved.</p>
  </footer>
</div>


    
  );
};

export default SignUp;
