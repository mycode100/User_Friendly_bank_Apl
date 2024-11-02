import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // SweetAlert2 for popups
import '../styles/signin.css'; // Import CSS file
import bankLogo from '../images/bank-i.jpg'; // Bank logo
import signInImage from '../images/bank-c.jpg'; // Sign-in image
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import sec from '../images/sec.webp'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect to sign-in page on refresh
  useEffect(() => {
    navigate('/signin');
  }, [navigate]);

  // Validation and submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      // Show validation popup if fields are empty
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please enter both your email and password to proceed.',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // Success popup and redirect on successful login
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back! Redirecting to your home page...',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        navigate('/home');
      });
    } catch (error) {
      // Error popup if login fails
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password. Please try again.',
        confirmButtonText: 'Retry',
      });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent pasting
    Swal.fire({
      icon: 'warning',
      title: 'Pasting Disabled',
      text: 'Pasting your password is not allowed. Please type your password manually.',
      confirmButtonText: 'OK',
    });
  };
  return (
    <div>
      {/* Header */}
      <header className="header-content">
        <div className="header-left">
          <img src={bankLogo} alt="Bank Logo" className="logo" />
          <h1>Welcome to Trst Banking</h1>
        </div>
        <div className='header-right'>
          <nav className="nav-menu">
            {/* Dropdown Menu */}
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
      {/* Sign In Section */}
      <section 
  className="sign-in-section" 
  style={{ 
    margin: '0', 
    padding: '0' 
  }}
>
<div className="sign-in-container">
      <div className="sign-in-image">
        <img src={signInImage} alt="Sign In" className="image-fluid" />
      </div>
      <div className="sign-in-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="mailId">Mail ID</label>
            <input
              type="email"
              id="mailId"
              className="form-input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Enter Your Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              onChange={handlePasswordChange}
              onPaste={handlePaste} // Add onPaste event
              value={password}
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
        <div className="switch-account">
          <p>Don't have an account? <a href="/signup">Sign Up Here</a></p>
        </div>
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
      {/* Features Section */}
      <section className="features-section-s">
        <h2>Why Choose Us?</h2>
        <br />
    <div className="features-container-s">
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


      {/* Footer */}
      <footer>
        <p>&copy; 2024 Trst Banking. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default SignIn;
