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

import { auth, db } from '../firebase'; // Import Firebase auth and db
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const Home = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [fname, setFname] = useState(''); // State for the first name
    const [lname, setLname] = useState(''); // State for the last name
    const navigate = useNavigate(); // Initialize useNavigate for page navigation

    // Function to fetch the user's first and last name from Firestore
    const fetchUserDetails = async (uid) => {
        try {
            const userDocRef = doc(db, 'Users', uid); // Reference to user's document in the Users collection
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                setFname(userData.firstname); // Set first name from Firestore
                setLname(userData.lastname); // Set last name from Firestore
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error fetching user details: ', error);
        }
    };

    // Monitor authentication state and fetch user details once authenticated
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserDetails(user.uid); // Fetch user's first and last name
            } else {
                setFname(''); // Clear the first name when no user is logged in
                setLname(''); // Clear the last name when no user is logged in
            }
        });

        return () => unsubscribe(); // Clean up on component unmount
    }, []);

    const autoSlideShow = () => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % 3);
    };

    useEffect(() => {
        const interval = setInterval(autoSlideShow, 2500); // Slide every 2.5 seconds
        return () => clearInterval(interval); // Clean up on unmount
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

    return (
        <div>
            <div className="header">
                <div className="header-left">
                    <img src={bankLogo} alt="Bank Logo" />
                    <span className="bank-name">Trst Bank</span>
                </div>
                <div className="user">
                    <img src={userLogo} alt="User Logo" />
                    <span className="username">{fname} {lname}</span> {/* Display the full name */}
                    <div className="dropdown">
                        <span><a href="#">User Info</a></span>
                        <span><a onClick={handleLogout}>Logout</a></span> {/* Logout link */}
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="left-side">
                    <h2>Welcome, {fname} {lname}!</h2> {/* Use the full name dynamically */}
                    <a onClick={handleCreditPage}>Credit</a>
                    <a onClick={handleDebitPage}>Debit</a>
                    <a onClick={handleSendMoneyPage}>Send Money</a>
                    <a onClick={handleMonitorPage}>Monitor Spendings</a>
                    <a href="#">Check Balance</a>
                    <a href="#">Customer Support</a>
                </div>

                <div className="main-content">
                    <div className="welcome-message">
                        <h1>Welcome to Trst Bank</h1>
                        <p>
                            At Trst Bank, we are committed to providing you with a secure, fast, and convenient banking experience.
                            Whether you are managing your daily finances, transferring money, or monitoring your accounts, our platform
                            is designed to make banking simpler for you.
                        </p>
                        <h3>Why Choose Us?</h3>
                        <ul>
                            <li><b>Seamless Transactions:</b> Easily transfer money between accounts or to other users in just a few clicks.</li>
                            <li><b>Real-time Monitoring:</b> Keep track of your balances, credits, and debits in real time.</li>
                            <li><b>Secure and Reliable:</b> Your safety is our priority with advanced encryption and authentication.</li>
                            <li><b>24/7 Customer Support:</b> Our team is available round the clock.</li>
                        </ul>
                    </div>

                    <div className="cards">
                        <div className="card" onClick={handleCreditPage}>
                            <h3>Credit</h3>
                            <img src={creditLogo} alt="Credit Logo" />
                        </div>
                        <div className="card" onClick={handleDebitPage}>
                            <h3>Debit</h3>
                            <img src={debitLogo} alt="Debit Logo" />
                        </div>
                        <div className="card" onClick={handleSendMoneyPage}>
                            <h3>Send Money</h3>
                            <img src={sendMoneyLogo} alt="Send Money Logo" />
                        </div>
                        <div className="card" onClick={handleMonitorPage}>
                            <h3>Monitoring</h3>
                            <img src={monitoringLogo} alt="Monitoring Logo" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="slideshow-container">
                <div className="slides">
                    <div className="slide" style={{ display: slideIndex === 0 ? 'block' : 'none' }}>
                        <img src={slide1} alt="Slide 1" />
                    </div>
                    <div className="slide" style={{ display: slideIndex === 1 ? 'block' : 'none' }}>
                        <img src={slide2} alt="Slide 2" />
                    </div>
                    <div className="slide" style={{ display: slideIndex === 2 ? 'block' : 'none' }}>
                        <img src={slide3} alt="Slide 3" />
                    </div>
                </div>

                <div className="navigation">
                    <span className="nav-dot" style={{ backgroundColor: slideIndex === 0 ? '#717171' : '#bbb' }}></span>
                    <span className="nav-dot" style={{ backgroundColor: slideIndex === 1 ? '#717171' : '#bbb' }}></span>
                    <span className="nav-dot" style={{ backgroundColor: slideIndex === 2 ? '#717171' : '#bbb' }}></span>
                </div>
            </div>

            <div className="footer">
                <p>&copy; 2024 Banking Application. All rights reserved. | <a href="#">Contact Us</a> | <a href="#">Help</a></p>
            </div>
        </div>
    );
};

export default Home;
