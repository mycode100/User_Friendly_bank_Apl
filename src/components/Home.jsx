import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import '../styles/main.css';

// Import images
import bankLogo from '../images/bank-i.jpg';
import userLogo from '../images/user 2.png';
import creditLogo from '../images/cc1.png';
import debitLogo from '../images/dd2.png';
import sendMoneyLogo from '../images/sm2.png';
import monitoringLogo from '../images/m2.png';
import slide1 from '../images/slide1.jpg';
import slide2 from '../images/slide2.jpg';
import slide3 from '../images/slide3.jpg';
import p1 from '../images/p1.jpg';
import p2 from '../images/p2.png';
import p3 from '../images/p3.png';
import p4 from '../images/p4.png';
import p5 from '../images/p5.png';
import { auth, db } from '../firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore,doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
const Home = () => {
    const [slideIndex, setSlideIndex] = useState(0); // Main slideshow index
    const [popupSlideIndex, setPopupSlideIndex] = useState(0); // Popup slideshow index
    const [fname, setFname] = useState(''); // State for first name
    const [lname, setLname] = useState(''); // State for last name
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility
    const navigate = useNavigate(); // Initialize useNavigate for navigation
    
    // Function to fetch user details from Firestore
    const fetchUserDetails = async (uid) => {
        try {
            const userDocRef = doc(db, 'Users', uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                setFname(userData.firstname);
                setLname(userData.lastname);
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
    
      
    // Monitor authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserDetails(user.uid);
            } else {
                navigate('/SignUp'); // Redirect to signup if not logged in
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    // Auto slideshow for main content
    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
     
      // Navigation functions
    const handleLogout = () => {
        navigate('/SignUp'); // Redirect to the signup page after logout
    };

    const handleCreditPage = () => {
        navigate('/credit');
    };

    const handleDebitPage = () => {
        navigate('/debit');
    };

    const handleSendMoneyPage = () => {
        navigate('/sendmoney');
    };

    const handleMonitorPage = () => {
        navigate('/monitor');
    };

    // Log out after 20 minutes of inactivity
    useEffect(() => {
        const logOutAfterInactivity = () => {
            navigate('/SignUp'); // Redirect to signup after inactivity
        };

        const resetInactivityTimeout = () => {
            clearTimeout(window.inactivityTimeout);
            window.inactivityTimeout = setTimeout(logOutAfterInactivity, 20 * 60 * 1000); // 20 minutes
        };

        resetInactivityTimeout(); // Initialize timer

        // Listen for user activity
        window.addEventListener('mousemove', resetInactivityTimeout);
        window.addEventListener('keydown', resetInactivityTimeout);

        return () => {
            clearTimeout(window.inactivityTimeout);
            window.removeEventListener('mousemove', resetInactivityTimeout);
            window.removeEventListener('keydown', resetInactivityTimeout);
        };
    }, [navigate]);
    
    // Show popup if not yet shown this session
    useEffect(() => {
        if (!sessionStorage.getItem('popupShown')) {
            setShowPopup(true);
            sessionStorage.setItem('popupShown', 'true'); // Prevents popup from reappearing in this session
        }
    }, []);

    // Popup navigation functions
    const handlePrevPopupSlidep = () => {
        setPopupSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };
    
    const handleNextPopupSlidep = () => {
        if (popupSlideIndex === slides.length - 1) {
            setShowPopup(false); // Close popup at the end of slides
        } else {
            setPopupSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }
    };
    
    const handleClosePopup = () => setShowPopup(false);
     
    // Slide data for the popup
    const slides = [
        { imgSrc: p1, description: 'Welcome to Trst Banking. Enjoy! Happy Banking!' },
        { imgSrc: p2, description: 'View all credits made to your account on the Credit History page.' },
        { imgSrc: p3, description: 'Debit amounts based on description key on the Debit Management page.' },
        { imgSrc: p4, description: 'Transfer funds to friends or relatives using their email IDs on the Send Money page.' },
        { imgSrc: p5, description: 'Track your spending by category on the Monitor page.' },
    ];
    

    return (
        <div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <button className="close-button" onClick={handleClosePopup}>X</button>
                        <img src={slides[popupSlideIndex].imgSrc} alt="Slide" className="popup-image" />
                        <p className="popup-description">{slides[popupSlideIndex].description}</p>
                        <div className="popup-navigation">
                            <button onClick={handlePrevPopupSlidep} disabled={popupSlideIndex === 0}>Prev</button>
                            <button onClick={handleNextPopupSlidep}>
                                {popupSlideIndex === slides.length - 1 ? 'OK' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

<div className="header">
    <div className="header-left">
        <img src={bankLogo} alt="Bank Logo" />
        <span className="bank-name">Trst Bank</span>
    </div>
    <div className="user">
        <img src={userLogo} alt="User Logo" />
        <span className="username" style={{ color: 'white' }}>{fname} {lname}</span>
        <div className="dropdown">
            <span><a href="#">User Info</a></span>
            <span><a onClick={handleLogout}>Logout</a></span>
        </div>
    </div>
</div>

<nav className="nav_home">
    <ul className="nav-menu_home">
        <li className="nav-item_home">
            <a href="#">Cards</a>
            <ul className="dropdown-menu_home">
                <li><a href="#">Credit Card</a></li>
                <li><a href="#">Debit Card</a></li>
                <li><a href="#">Prepaid Card</a></li>
            </ul>
        </li>
        <li className="nav-item_home">
            <a href="#">Loans</a>
            <ul className="dropdown-menu_home">
                <li><a href="#">Personal Loan</a></li>
                <li><a href="#">Home Loan</a></li>
                <li><a href="#">Car Loan</a></li>
            </ul>
        </li>
        <li className="nav-item_home">
            <a href="#">Insurance</a>
            <ul className="dropdown-menu_home">
                <li><a href="#">Life Insurance</a></li>
                <li><a href="#">Health Insurance</a></li>
                <li><a href="#">Travel Insurance</a></li>
            </ul>
        </li>
        <li className="nav-item_home">
            <a href="#">Credit</a>
            <ul className="dropdown-menu_home">
                <li><a href="#" onClick={handleCreditPage}>Credit History</a></li>
                <li><a href="#">Credit Analysis</a></li>
            </ul>
        </li>
        <li className="nav-item_home">
            <a href="#">Debit</a>
            <ul className="dropdown-menu_home">
                <li><a href="#" onClick={handleDebitPage}>Debit History</a></li>
                <li><a href="#">Spending Patterns</a></li>
            </ul>
        </li>
        <li className="nav-item_home">
            <a href="#">Monitor</a>
            <ul className="dropdown-menu_home">
                <li><a href="#" onClick={handleMonitorPage}>Spending Monitor</a></li>
                <li><a href="#">Monthly Reports</a></li>
            </ul>
        </li>
        <li className="nav-item_home">
            <a href="#">Check Balance</a>
            <ul className="dropdown-menu_home">
                <li><a href="#">Account Balance</a></li>
                <li><a href="#">Balance Alerts</a></li>
            </ul>
        </li>
        <li className="nav-item_home"><a href="#">CIBIL Score</a></li>
        <li className="nav-item_home"><a href="#">Report</a></li>
    </ul>
</nav>
<div className="container_h">
    <div className="left-side_h"style={{maxHeight:'100vh'}}>
        <h2 style={{ color: 'white' }}>Welcome, {fname} {lname}!</h2>
        <a onClick={handleCreditPage}>Credit</a>
        <a onClick={handleDebitPage}>Debit</a>
        <a onClick={handleSendMoneyPage}>Send Money</a>
        <a onClick={handleMonitorPage}>Monitor Spendings</a>
        <a href="#">Check Balance</a>
        <a href="#">Customer Support</a>
    </div>

    <div className="main-content_h">
        <div className="welcome-message_h">
            <h1>Welcome to Trst Bank</h1>
            <p>
                At Trst Bank, we are committed to providing you with a secure, fast, and convenient banking experience.
                Whether you are managing your daily finances, transferring money, or monitoring your accounts, our platform
                is designed to make banking simpler for you.
            </p>
            <br />
            <br />
            <h3>Why Choose Us?</h3>
            <ul>
                <li><b>Seamless Transactions:</b> Easily transfer money between accounts or to other users in just a few clicks.</li>
                <li><b>Real-time Monitoring:</b> Keep track of your balances, credits, and debits in real time.</li>
                <li><b>Secure and Reliable:</b> Your safety is our priority with advanced encryption and authentication.</li>
                <li><b>24/7 Customer Support:</b> Our team is available round the clock.</li>
            </ul>
        </div>
        <br />
        <br />
        <div className="cards_h">
    <div className="card_h" 
        onClick={handleCreditPage} 
        style={{ backgroundImage: 'linear-gradient(to bottom right, #ffcccb, #ffe4b5)', padding: '20px', borderRadius: '8px', cursor: 'pointer' }}>
        <h3>Credit</h3>
        <img src={creditLogo} alt="Credit Logo" />
    </div>
    <div className="card_h" 
        onClick={handleDebitPage} 
        style={{ backgroundImage: 'linear-gradient(to bottom right, #add8e6, #b0e0e6)', padding: '20px', borderRadius: '8px', cursor: 'pointer' }}>
        <h3>Debit</h3>
        <img src={debitLogo} alt="Debit Logo" />
    </div>
    <div className="card_h" 
        onClick={handleSendMoneyPage} 
        style={{ backgroundImage: 'linear-gradient(to bottom right, #e6e6fa, #f0f8ff)', padding: '20px', borderRadius: '8px', cursor: 'pointer' }}>
        <h3>Send Money</h3>
        <img src={sendMoneyLogo} alt="Send Money Logo" />
    </div>
    <div className="card_h" 
        onClick={handleMonitorPage} 
        style={{ backgroundImage: 'linear-gradient(to bottom right, #f5fffa, #f0fff0)', padding: '20px', borderRadius: '8px', cursor: 'pointer' }}>
        <h3>Monitoring</h3>
        <img src={monitoringLogo} alt="Monitoring Logo" />
    </div>
</div>


        
    </div>
</div>
<div className="slideshow-container_home" style={{ height: '700px', width: '1200px', overflow: 'hidden', margin: '0 auto' }}>
    <div className="slides_home" style={{ display: 'flex', height: '100%' }}>
        <div className="slide_home" style={{ display: slideIndex === 0 ? 'block' : 'none', height: '100%' }}>
            <img src={slide1} alt="Slide 1" className="slide-image_home" style={{ width: '1200px', height: '700px', objectFit: 'cover', margin: '0 auto', display: 'block' }} />
        </div>
        <div className="slide_home" style={{ display: slideIndex === 1 ? 'block' : 'none', height: '100%' }}>
            <img src={slide2} alt="Slide 2" className="slide-image_home" style={{ width: '1200px', height: '700px', objectFit: 'cover', margin: '0 auto', display: 'block' }} />
        </div>
        <div className="slide_home" style={{ display: slideIndex === 2 ? 'block' : 'none', height: '100%' }}>
            <img src={slide3} alt="Slide 3" className="slide-image_home" style={{ width: '1200px', height: '700px', objectFit: 'cover', margin: '0 auto', display: 'block' }} />
        </div>
    </div>
</div>


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

<div className="footer">
                <p>&copy; 2024 Trst Bank. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Home;
