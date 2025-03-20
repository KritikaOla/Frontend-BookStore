import React, { useState } from 'react';
import './Login.css'; // Importing the CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill in all fields.');
      return;
    }

    const payload = {
      email: formData.email, // ✅ Fixed: backend expects "email"
      password: formData.password,
    };

    console.log('Login payload:', payload);

    try {
      const response = await axios.post(
        'http://localhost:5197/api/Auth/login',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response from server:', response.data);

      const { token } = response.data || {};

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ email: formData.email }));

        alert('Login successful!');
        navigate('/Cart');
      } else {
        alert('Invalid login response from server.');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(
        error.response?.data?.message || 'Login failed. Check your credentials.'
      );
    }
  };

  return (
    <div className="register-photo">
      <div className="form-container">
        <div className="image-holder"></div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">Login to your account.</h2>

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

          <div className="form-group">
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

          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Log in
            </button>
          </div>

          <Link to="/signup" className="already">
            You don't have an account? Sign up here.
          </Link>
        </form>
      </div>
    </div>
  );
}
