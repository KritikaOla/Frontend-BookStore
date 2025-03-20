import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    FirstName: '',
    Email: '',
    Message: '',
  });

  // Status message state
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.FirstName || !formData.Email || !formData.Message) {
      setStatusMessage('Please fill out all fields.');
      setStatusType('error');
      return;
    }

    try {
      const response = await fetch('http://localhost:5197/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.FirstName,
          email: formData.Email,
          subject: 'Contact Form Submission', // default subject since there's no subject field
          message: formData.Message,
        }),
      });

      if (response.ok) {
        setStatusMessage('Message sent successfully. Our Team will contact you soon!');
        setStatusType('success');
        setFormData({ FirstName: '', Email: '', Message: '' }); // Clear form
      } else {
        setStatusMessage('Failed to send message. Please try again.');
        setStatusType('error');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatusMessage('An error occurred. Please try again later.');
      setStatusType('error');
    }
  };

  return (
    <div className="contact-section">
      <div className="contact-container">
        <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-container">
            <div className="contact-cell">
              <p className="contact-input-title">Full Name</p>
              <input
                className="contact-input"
                id="contact-name"
                name="FirstName"
                placeholder="First Name"
                value={formData.FirstName}
                onChange={handleChange}
              />
            </div>
            <div className="contact-cell">
              <p className="contact-input-title">Email Address</p>
              <input
                className="contact-input"
                id="contact-email"
                name="Email"
                placeholder="Email"
                value={formData.Email}
                onChange={handleChange}
              />
            </div>
            <div className="contact-cell contact-message">
              <p className="contact-input-title">Message</p>
              <textarea
                className="contact-textarea"
                id="contact-message"
                name="Message"
                placeholder="Write a message..."
                value={formData.Message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="contact-cell">
              <button className="contact-submit-btn" type="submit">
                Send Message
              </button>
            </div>

            {statusMessage && (
              <div className={`status-message ${statusType}`}>
                {statusMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
