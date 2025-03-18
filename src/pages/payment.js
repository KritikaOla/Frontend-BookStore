
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './payment.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Payment = () => {
  const [activeTab, setActiveTab] = useState('menu2');
  const [sidebarToggled, setSidebarToggled] = useState(false);

  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0; // fallback if no amount is passed

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
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
                    <p className="mb-0 mr-4 mt-4">           </p>
                    <p className="mb-0 mr-4">Pay <span className="top-highlight">₹ {totalAmount.toFixed(2)}</span></p>
                  </div>
                </div>

                <div className="tab-content">

                  {/* Bank */}
                  {activeTab === 'menu1' && (
                    <div className="tab-pane active">
                      <div className="form-card">
                        <h3 className="text-center">Enter bank details to pay</h3>
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className="form-group">
                            <label>BANK NAME</label>
                            <input type="text" className="form-control" placeholder="BBB Bank" />
                          </div>
                          <div className="form-group">
                            <label>BENEFICIARY NAME</label>
                            <input type="text" className="form-control" placeholder="John Smith" />
                          </div>
                          <div className="form-group">
                            <label>SWIFT CODE</label>
                            <input type="text" className="form-control" placeholder="ABCDAB1S" minLength="8" maxLength="11" />
                          </div>
                          <button type="submit" className="btn btn-success btn-block">Pay ₹ {totalAmount.toFixed(2)}</button>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  {activeTab === 'menu2' && (
                    <div className="tab-pane active">
                      <div className="form-card">
                        <h3 className="text-center">Enter your card details to pay</h3>
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className="form-group">
                            <label>CARD NUMBER</label>
                            <input type="text" className="form-control" placeholder="0000 0000 0000 0000" minLength="19" maxLength="19" />
                          </div>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label>CARD EXPIRY</label>
                              <input type="text" className="form-control" placeholder="MM/YY" minLength="5" maxLength="5" />
                            </div>
                            <div className="form-group col-md-6">
                              <label>CVV</label>
                              <input type="password" className="form-control" placeholder="•••" minLength="3" maxLength="3" />
                            </div>
                          </div>
                          <button type="submit" className="btn btn-success btn-block">Pay ₹ {totalAmount.toFixed(2)}</button>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* QR Code */}
                  {activeTab === 'menu3' && (
                    <div className="tab-pane active text-center">
                      <h3>Scan the QR code to pay ₹ {totalAmount.toFixed(2)}</h3>
                      <img src="https://i.imgur.com/DD4Npfw.jpg" width="200px" height="200px" alt="QR Code" />
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
