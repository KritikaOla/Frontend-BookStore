import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-section">
      <div className="contact-container">
        <form className="contact-form" id="contact-form">
          <div className="contact-form-container">
            <div className="contact-cell ">
              <p className="contact-input-title">Full Name</p>
              <input
                className="contact-input"
                id="contact-name"
                name="FirstName"
                placeholder="First Name"
              />
            </div>
            <div className="contact-cell">
              <p className="contact-input-title">Email Address</p>
              <input
                className="contact-input"
                id="contact-email"
                name="Email"
                placeholder="Email"
              />
            </div>
            <div className="contact-cell contact-message">
              <p className="contact-input-title">Message</p>
              <textarea
                className="contact-textarea"
                id="contact-message"
                placeholder="Write a message..."
              ></textarea>
            </div>
            <div className="contact-cell">
              <button className="contact-submit-btn" type="submit">
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
