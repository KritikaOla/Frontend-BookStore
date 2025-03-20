import React, { useState } from 'react';
import './signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRepeat: '',
    zipCode: '',
    state: '',
    area: '',
    city: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordRepeat) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const username = `${formData.firstName} ${formData.lastName}`.trim();

      const userPayload = {
        username,
        email: formData.email,
        password: formData.password,
      };

      console.log('Sending payload:', userPayload);

      const response = await axios.post(
        'http://localhost:5197/api/Auth/register',
        userPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Registration successful:', response.data);

      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response || error.message);
      alert(
        error.response?.data?.message ||
          error.response?.data ||
          'Registration failed. Try again.'
      );
    }
  };

  return (
    <div className="register-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">
            <strong>Create</strong> an account.
          </h2>

          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="password"
                name="passwordRepeat"
                placeholder="Repeat Password"
                value={formData.passwordRepeat}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Optional fields not sent to backend */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="text"
                name="area"
                placeholder="Area"
                value={formData.area}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <input
                className="form-control"
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-check">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  required
                />
                I agree to the license terms.
              </label>
            </div>
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Sign Up
            </button>
          </div>

          <Link to="/login" className="already">
            You already have an account? Login here.
          </Link>
        </form>
      </div>
    </div>
  );
}
