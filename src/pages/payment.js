import React, { useState, useEffect } from 'react'; // Added useEffect
import { useLocation } from 'react-router-dom';
import './payment.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios

const Payment = () => {
  const [activeTab, setActiveTab] = useState('menu2');
  const [sidebarToggled, setSidebarToggled] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); //  Loading state

  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;
  const cartItems = location.state?.cartItems || []; //  Get cart items from location state

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  //  Check login and get email on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        
        setUserEmail(payload.email || 'your email');
      } catch (err) {
        console.error('Invalid token', err);
        setIsLoggedIn(false);
        localStorage.removeItem('token'); // Remove invalid token
      }
    }
  }, []);
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setPaymentMessage('❗ Please log in to make a payment.');
      return;
    }
  
    setIsLoading(true);
    setPaymentMessage('');
  
    try {
      const purchaseData = cartItems.map((item) => ({
        Email: userEmail,
        BookName: item.title,
        Cost: parseFloat(item.price), //  Ensure it's a number
        Quantity: item.quantity || 1,
        DateOfPurchase: new Date().toISOString(), //  Match C# DateTime format
      }));
  
      const token = localStorage.getItem('token');
      if (!token) {
        setPaymentMessage('❌ Authentication failed! Please log in again.');
        return;
      }
  
      console.log('Sending Data:', JSON.stringify(purchaseData, null, 2)); // Debugging
  
      const response = await axios.post(
        "http://localhost:5197/api/Purchase",
        purchaseData,  // Send purchase data
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass JWT token
          },
        }
      );
      
      console.log('Response:', response);
      if (response.status === 200) {
        setPaymentMessage(`✅ Payment successful! A confirmation has been sent to ${userEmail}`);
      }
    } catch (error) {
      console.error('Error during payment:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        setPaymentMessage(`❌ Payment failed: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        setPaymentMessage('❌ No response from the server. Please try again.');
      } else {
        setPaymentMessage('❌ An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="payment-container container-fluid px-0">
      <div className="row justify-content-center">
        <div className="col-lg-9 col-12">
          <div className="payment-card card card0">
            <div className={`d-flex ${sidebarToggled ? 'toggled' : ''}`} id="wrapper">
              {/* Sidebar */}
              <div className="bg-light border-right payment-sidebar" id="sidebar-wrapper">
                <div className="sidebar-heading pt-5 pb-4"><strong>PAY WITH</strong></div>
                <div className="list-group list-group-flush">
                  <button
                    onClick={() => handleTabClick('menu1')}
                    className={`tabs list-group-item ${activeTab === 'menu1' ? 'active1' : 'bg-light'}`}
                  >
                    <div className="list-div my-2">
                      <i className="fa fa-home"></i>&nbsp;&nbsp; Bank
                    </div>
                  </button>

                  <button
                    onClick={() => handleTabClick('menu2')}
                    className={`tabs list-group-item ${activeTab === 'menu2' ? 'active1' : 'bg-light'}`}
                  >
                    <div className="list-div my-2">
                      <FontAwesomeIcon icon={faCartShopping} />&nbsp;&nbsp; Card
                    </div>
                  </button>

                  <button
                    onClick={() => handleTabClick('menu3')}
                    className={`tabs list-group-item ${activeTab === 'menu3' ? 'active1' : 'bg-light'}`}
                  >
                    <div className="list-div my-2">
                      <i className="fa fa-qrcode"></i>&nbsp;&nbsp;&nbsp; Visa QR
                    </div>
                  </button>
                </div>
              </div>

              {/* Page Content */}
              <div id="page-content-wrapper">
                <div className="row pt-3" id="border-btm">
                  <div className="col-4">
                    <button className="btn btn-success mt-4 ml-3 mb-3" id="menu-toggle" onClick={toggleSidebar}>
                      <div className="bar4"></div>
                      <div className="bar4"></div>
                      <div className="bar4"></div>
                    </button>
                  </div>
                  <div className="col-8 text-right">
                    <p className="mb-0 mr-4 mt-4"></p>
                    <p className="mb-0 mr-4">Pay <span className="top-highlight">₹ {totalAmount.toFixed(2)}</span></p>
                  </div>
                </div>

                <div className="tab-content">
                  {/* Bank Payment Form */}
                  {activeTab === 'menu1' && (
                    <div className="tab-pane active">
                      <div className="form-card">
                        <h3 className="text-center">Enter bank details to pay</h3>
                        <form onSubmit={handlePayment}>
                          <div className="form-group">
                            <label>BANK NAME</label>
                            <input type="text" className="form-control" placeholder="BBB Bank" required />
                          </div>
                          <div className="form-group">
                            <label>BENEFICIARY NAME</label>
                            <input type="text" className="form-control" placeholder="John Smith" required />
                          </div>
                          <div className="form-group">
                            <label>SWIFT CODE</label>
                            <input type="text" className="form-control" placeholder="ABCDAB1S" minLength="8" maxLength="11" required />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-success btn-block"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Processing...
                              </>
                            ) : (
                              `Pay ₹ ${totalAmount.toFixed(2)}`
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Card Payment Form */}
                  {activeTab === 'menu2' && (
                    <div className="tab-pane active">
                      <div className="form-card">
                        <h3 className="text-center">Enter your card details to pay</h3>
                        <form onSubmit={handlePayment}>
                          <div className="form-group">
                            <label>CARD NUMBER</label>
                            <input type="text" className="form-control" placeholder="0000 0000 0000 0000" minLength="19" maxLength="19" required />
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label>CARD EXPIRY</label>
                              <input type="text" className="form-control" placeholder="MM/YY" minLength="5" maxLength="5" required />
                            </div>
                            <div className="form-group col-md-6">
                              <label>CVV</label>
                              <input type="password" className="form-control" placeholder="•••" minLength="3" maxLength="3" required />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-success btn-block"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Processing...
                              </>
                            ) : (
                              `Pay ₹ ${totalAmount.toFixed(2)}`
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* QR Code Payment */}
                  {activeTab === 'menu3' && (
                    <div className="tab-pane active text-center">
                      <h3>Scan the QR code to pay ₹ {totalAmount.toFixed(2)}</h3>
                      <img src="https://i.imgur.com/DD4Npfw.jpg" width="200px" height="200px" alt="QR Code" />
                      <button
                        onClick={handlePayment}
                        className="btn btn-success btn-block mt-4"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                            Processing...
                          </>
                        ) : (
                          'Confirm Payment'
                        )}
                      </button>
                    </div>
                  )}

                  {/*  Payment Status Message */}
                  {paymentMessage && (
                    <div className="alert alert-info mt-3 text-center">
                      {paymentMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
